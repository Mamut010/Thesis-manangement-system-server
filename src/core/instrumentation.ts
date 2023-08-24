import { Resource } from "@opentelemetry/resources";
import { SemanticResourceAttributes } from "@opentelemetry/semantic-conventions";
import { 
    SimpleSpanProcessor, 
    BatchSpanProcessor, 
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

export const intializeTracer = (serviceName: string): Tracer | undefined => {
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
        sdk.shutdown()
            .then(() => console.log('Tracing terminated'))
            .catch((error) => console.log('Error terminating tracing', error))
            .finally(() => process.exit(0));
    };

    process.on('SIGTERM', exit);
    process.on('SIGINT', exit);

    return trace.getTracer(serviceName);
}

function createSpanProcessor(exporter: SpanExporter): SpanProcessor {
    return env.isProduction 
        ? new BatchSpanProcessor(exporter) 
        : new SimpleSpanProcessor(exporter);
}

function createSampler(): Sampler {
    const traceRatio = env.isProduction ? 0.1 : 1.0;
    return new TraceIdRatioBasedSampler(traceRatio);
}