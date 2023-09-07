import { ProcessesQueryRequest } from "../../contracts/requests";
import { ProcessesQueryResponse } from "../../contracts/responses";
import { ProcessDto } from "../../shared/dtos";

export interface ProcessRepoInterface {
    query(queryRequest: ProcessesQueryRequest): Promise<ProcessesQueryResponse>;

    findOneById(id: string): Promise<ProcessDto | null>;

    findManyByName(name: string): Promise<ProcessDto[]>;
}