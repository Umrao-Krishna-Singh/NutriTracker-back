import { applyDecorators } from '@nestjs/common'
import {
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
} from '@nestjs/swagger'

export function ApiUnsuccessfulResponse() {
    return applyDecorators(
        ApiUnauthorizedResponse(),
        ApiBadRequestResponse(),
        ApiForbiddenResponse(),
        ApiInternalServerErrorResponse(),
    )
}
