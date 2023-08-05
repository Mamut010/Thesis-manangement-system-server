export interface QueryResponse<TDto> {
    content: TDto[],
    count: number,
}