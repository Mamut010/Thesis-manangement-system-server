export interface RequestAdvanceCommandInput {
    actionerId: string,
    requestId: string,
    data?: Record<string, unknown>,
}