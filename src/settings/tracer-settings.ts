import { BatchSpanProcessor, SimpleSpanProcessor } from "@opentelemetry/sdk-trace-base";

export const TRACER_SETTINGS = {
    Production: {
        TraceRatio: 0.1,
        SpanProcessor: BatchSpanProcessor,
    },
    Development: {
        TraceRatio: 1.0,
        SpanProcessor: SimpleSpanProcessor,
    },
    Test: {
        TraceRatio: 1.0,
        SpanProcessor: SimpleSpanProcessor,
    },
} as const;