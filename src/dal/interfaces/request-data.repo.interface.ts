import { RequestDataDto } from "../../shared/dtos";
import { NameValuePair, RequestIdAndName } from "../types/utility-types";

export interface RequestDataRepoInterface {
    findMany(requestId: string, names?: string[]): Promise<RequestDataDto[]>;

    findOneByRequestIdAndName(requestIdAndName: RequestIdAndName): Promise<RequestDataDto | null>;

    create(requestId: string, nameValuePair: NameValuePair): Promise<RequestDataDto>;

    createMany(requestId: string, nameValuePairs: NameValuePair[]): Promise<RequestDataDto[]>;

    update(requestIdAndName: RequestIdAndName, value: string): Promise<RequestDataDto | null>;

    upsert(requestId: string, nameValuePair: NameValuePair | NameValuePair[]): Promise<RequestDataDto[]>;

    deleteManyByRequestId(requestId: string): Promise<number>;

    deleteOneByRequestIdAndName(requestIdAndName: RequestIdAndName): Promise<boolean>;
}