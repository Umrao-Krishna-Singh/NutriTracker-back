import { applyDecorators } from '@nestjs/common'
import {
    ApiProperty,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiResponseNoStatusOptions,
    ApiOkResponse,
} from '@nestjs/swagger'

class Unauth {
    @ApiProperty({ example: false })
    status!: boolean
    @ApiProperty({ example: 401 })
    code!: number
    @ApiProperty({ example: 'Invalid User' })
    message!: string
}

class BadReq {
    @ApiProperty({ example: false })
    status!: boolean
    @ApiProperty({ example: 400 })
    code!: number
    @ApiProperty({ example: 'Bad Request' })
    message!: string
}

class Forbidden {
    @ApiProperty({ example: false })
    status!: boolean
    @ApiProperty({ example: 403 })
    code!: number
    @ApiProperty({ example: 'Unauthorized Request' })
    message!: string
}

class InternalError {
    @ApiProperty({ example: false })
    status!: boolean
    @ApiProperty({ example: 500 })
    code!: number
    @ApiProperty({ example: 'Internal server error' })
    message!: string
}

export function ApiUnsuccessfulResponse() {
    return applyDecorators(
        ApiBadRequestResponse({ type: BadReq, description: 'Validation Exception' }),
        ApiUnauthorizedResponse({
            type: Unauth,
            description: 'Authentication Exception',
        }),
        ApiForbiddenResponse({ type: Forbidden, description: 'Authorization Exception' }),
        ApiInternalServerErrorResponse({
            type: InternalError,
            description: 'Server Exception',
        }),
    )
}

export function ApiGeneralResponse(options: ApiResponseNoStatusOptions) {
    if (!options.description) options.description = 'Success'

    return applyDecorators(
        ApiOkResponse(options),
        ApiBadRequestResponse({ type: BadReq, description: 'Validation Exception' }),
        ApiUnauthorizedResponse({
            type: Unauth,
            description: 'Authentication Exception',
        }),
        ApiForbiddenResponse({ type: Forbidden, description: 'Authorization Exception' }),
        ApiInternalServerErrorResponse({
            type: InternalError,
            description: 'Server Exception',
        }),
    )
}

export function ApiOpenResponse(options: ApiResponseNoStatusOptions) {
    if (!options.description) options.description = 'Success'

    return applyDecorators(
        ApiOkResponse(options),
        ApiBadRequestResponse({ type: BadReq, description: 'Validation Exception' }),
        ApiInternalServerErrorResponse({
            type: InternalError,
            description: 'Server Exception',
        }),
    )
}
