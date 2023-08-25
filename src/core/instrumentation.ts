import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import {
    TraceIdRatioBasedSampler,
    SpanExporter, 
    SpanProcessor,
    Sampler 
} from "@opentelemetry/sdk-trace-base";
import { Tracer, trace } from "@opentelemetry/api";
import { OTLPTraceExporter } from "@opentelemetry/exporter-trace-otlp-http";
import { ExpressInstrumentation } from "@opentelemetry/instrumentation-express";
import { HttpInstrumentation } from "@opentelemetry/instrumentation-http";
import { PrismaInstrumentation } from '@prisma/instrumentation';
import { NodeSDK } from '@opentelemetry/sdk-node';
import { env } from "../env";
import { TRACER_SETTINGS } from "../settings/tracer-settings";

export const initializeTracer = (serviceName: string): Tracer | undefined => {
    if (!env.tracer.enabled) {
        return undefined;
    }

    const traceExporter = new OTLPTraceExporter({
        url: env.tracer.url
    });
    const spanProcessor = createSpanProcessor(traceExporter);
    const sampler = createSampler();

    const sdk = new NodeSDK({
        traceExporter,
        spanProcessor,
        sampler,
        instrumentations: [
            new HttpInstrumentation(),
            new ExpressInstrumentation(),
            new PrismaInstrumentation(),
        ],
        resource: new Resource({
            [SemanticResourceAttributes.SERVICE_NAME]: serviceName,
        }),
    });
    sdk.start();

    // gracefully shut down the SDK on process exit
    const exit = () => {
        void sdk.shutdown()
                .finally(() => process.exit(0));
    };

    process.on('SIGTERM', exit);
    process.on('SIGINT', exit);

    return trace.getTracer(serviceName);
}

function createSpanProcessor(exporter: SpanExporter): SpanProcessor {
    if (env.isProduction) {
        return new TRACER_SETTINGS.Production.SpanProcessor(exporter);
    } 
    else if (env.isTest) {
        return new TRACER_SETTINGS.Test.SpanProcessor(exporter);
    }
    else {
        return new TRACER_SETTINGS.Development.SpanProcessor(exporter);
    }
}

function createSampler(): Sampler {
    let traceRatio: number;
    if (env.isProduction) {
        traceRatio = TRACER_SETTINGS.Production.TraceRatio;
    }
    else if (env.isTest) {
        traceRatio = TRACER_SETTINGS.Test.TraceRatio;
    }
    else {
        traceRatio = TRACER_SETTINGS.Development.TraceRatio;
    }

    return new TraceIdRatioBasedSampler(traceRatio);
}