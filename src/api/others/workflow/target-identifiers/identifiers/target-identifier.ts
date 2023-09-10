import { inject, injectable } from "inversify";
import { TargetIdentifierInterface } from "../interfaces/target-identifier.interface";
import { TargetIdentifierInput } from "../types";
import { Target } from "../../types/targets";
import { STORED_REQUEST_DATA_KEYS } from "../../constants/request-data-keys";
import { INJECTION_TOKENS } from "../../../../../core/constants/injection-tokens";
import { GroupRepoInterface } from "../../../../../dal/interfaces";
import { GroupsQueryRequest } from "../../../../../contracts/requests";
import { StringFilter } from "../../../../../lib/query";
import { makeArray } from "../../../../../utils/array-helpers";
import { WorkflowRequestDataProcessorInterface } from "../../request-data-processor";

@injectable()
export class TargetIdentifier implements TargetIdentifierInterface {
    constructor(
        @inject(INJECTION_TOKENS.GroupRepo) private groupRepo: GroupRepoInterface,
        @inject(INJECTION_TOKENS.WorkflowRequestDataProcessor) private requestDataProcessor: WorkflowRequestDataProcessorInterface) {

    }
    
    async identifyTarget(actionerId: string, targetIdentifierInput: TargetIdentifierInput): Promise<Target | undefined> {
        // Simple case
        if (actionerId === targetIdentifierInput.creatorId) {
            return Target.Requester;
        }

        let associatedKey: string | undefined = undefined;
        // Traverse the request data and make a record while also check for associated key
        const dataRecord: Record<string, string> = {};
        for(const { name, value } of targetIdentifierInput.requestData) {
            const orgValue = this.requestDataProcessor.retrieveOriginalValue(value);
            if (typeof orgValue !== 'string') {
                continue;
            }
            else if (orgValue === actionerId) {
                associatedKey = name;
                break;
            }

            dataRecord[name] = orgValue;
        }

        if (associatedKey) {
            return this.getTargetFromAssociatedKey(associatedKey);
        }
        else if (!(STORED_REQUEST_DATA_KEYS.AdminGroup in dataRecord)) {
            return undefined;
        }

        const idFilter = new StringFilter();
        idFilter.value = dataRecord[STORED_REQUEST_DATA_KEYS.AdminGroup];
        idFilter.operator = 'equals';
        const memberIdFilter = new StringFilter();
        memberIdFilter.value = actionerId;
        memberIdFilter.operator = 'equals';

        const queryRequest = new GroupsQueryRequest();
        queryRequest.idFilter = makeArray(idFilter);
        queryRequest.memberIdFilter = makeArray(memberIdFilter);

        const queryResponse = await this.groupRepo.query(queryRequest);
        if (queryResponse.count > 0) {
            return Target.AdminGroup;
        }

        return undefined;
    }

    private getTargetFromAssociatedKey(associatedKey: string) {
        switch(associatedKey) {
            case STORED_REQUEST_DATA_KEYS.Supervisor1: return Target.Supervisor1;
            case STORED_REQUEST_DATA_KEYS.Supervisor2: return Target.Supervisor2;
            default: return undefined;
        }
    }
}