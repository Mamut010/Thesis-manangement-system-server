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
import { LocationServiceInterface } from "../../interfaces";
import { HTTP_CODES } from "../../../core/constants/http-codes";
import { LocationsQueryResponse } from "../../../contracts/responses";
import { LocationsQueryRequest, LocationCreateRequest, LocationUpdateRequest } from "../../../contracts/requests";
import { LocationDto } from "../../../shared/dtos";
import { ROLES } from "../../../core/constants/roles";

@JsonController('locations')
//@Authorized()
@injectable()
@OpenAPI({
    security: [{ bearerAuth: [] }]
})
export class LocationController {
    constructor(
        @inject(INJECTION_TOKENS.LocationService) private locationService: LocationServiceInterface) {

    }

    @HttpCode(HTTP_CODES.Ok)
    @Get()
    @ResponseSchema(LocationsQueryResponse)
    getLocations(@QueryParams() queryRequest: LocationsQueryRequest) {
        return this.locationService.getLocations(queryRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    @Get('/:id')
    @ResponseSchema(LocationDto)
    getLocation(@Param('id') id: number) {
        return this.locationService.getLocation(id);
    }

    @HttpCode(HTTP_CODES.Created)
    //@Authorized(ROLES.Admin)
    @Post()
    @ResponseSchema(LocationDto)
    createLocation(@Body({ required: true }) createRequest: LocationCreateRequest) {
        return this.locationService.createLocation(createRequest);
    }

    @HttpCode(HTTP_CODES.Ok)
    //@Authorized(ROLES.Admin)
    @Patch('/:id')
    @ResponseSchema(LocationDto)
    updateLocation(@Param('id') id: number, @Body({ required: true }) updateRequest: LocationUpdateRequest) {
        return this.locationService.updateLocation(id, updateRequest);
    }

    //@Authorized(ROLES.Admin)
    @Delete('/:id')
    @OnUndefined(HTTP_CODES.NoContent)
    deleteLocation(@Param('id') id: number) {
        return this.locationService.deleteLocation(id);
    }
}