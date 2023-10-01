import { inject, injectable } from "inversify";
import { 
    Authorized, 
    Body, 
    Delete, 
    Get, 
    HttpCode, 
    JsonController, 
    OnUndefined, 
    Param, 
    Patch, 
    Post, 
    QueryParams 
} from "routing-controllers";
import { OpenAPI, ResponseSchema } from "routing-controllers-openapi";
import { INJECTION_TOKENS } from "../../../core/constants/injection-tokens";
import { TopicServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { TopicsQueryResponse } from "../../../contracts/responses";
import { TopicsQueryRequest, TopicCreateRequest, TopicUpdateRequest } from "../../../contracts/requests";
import { TopicDto } from "../../../shared/dtos";
import { Role } from "../../../core/constants/roles";

@JsonController('topics')
@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class TopicController {
    constructor(
        @inject(INJECTION_TOKENS.TopicService) private topicService: TopicServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(TopicsQueryResponse)
    getTopics(@QueryParams() queryRequest: TopicsQueryRequest) {
        return this.topicService.getTopics(queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(TopicDto)
    getTopic(@Param('id') id: number) {
        return this.topicService.getTopic(id);
    }

    @HttpCode(HTTP_CODES.Created)
    @Authorized([Role.Admin, Role.Lecturer1_1])
    @Post()
    @ResponseSchema(TopicDto)
    createTopic(@Body({ required: true }) createRequest: TopicCreateRequest) {
        return this.topicService.createTopic(createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Authorized([Role.Admin, Role.Lecturer1_1])
    @Patch('/:id')
    @ResponseSchema(TopicDto)
    updateTopic(@Param('id') id: number, @Body({ required: true }) updateRequest: TopicUpdateRequest) {
        return this.topicService.updateTopic(id, updateRequest);
    }

    @Authorized([Role.Admin, Role.Lecturer1_1])
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteTopic(@Param('id') id: number) {
        return this.topicService.deleteTopic(id);
    }
}