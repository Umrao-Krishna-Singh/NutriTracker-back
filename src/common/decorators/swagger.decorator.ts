import { applyDecorators, HttpCode, HttpStatus, UseGuards } from '@nestjs/common'
import {
    ApiProperty,
    ApiUnauthorizedResponse,
    ApiForbiddenResponse,
    ApiBadRequestResponse,
    ApiInternalServerErrorResponse,
    ApiResponseNoStatusOptions,
    ApiOkResponse,
} from '@nestjs/swagger'
import { Roles } from '@prism/keysley/enums'
import { Role } from './role.decorator'
import { AuthGuard } from '../guards/auth.guard'

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

export function ApiAuthorizedResponse(
    options: ApiResponseNoStatusOptions & { statusCode?: HttpStatus } & {
        roles: [Roles, ...Roles[]]
    },
) {
    if (!options.description) options.description = 'Success'
    const code = options?.statusCode || 200

    return applyDecorators(
        HttpCode(code),
        Role(...options.roles),
        UseGuards(AuthGuard),
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

export function ApiOpenResponse(
    options: ApiResponseNoStatusOptions & { statusCode?: HttpStatus },
) {
    if (!options.description) options.description = 'Success'
    const code = options?.statusCode || 200

    return applyDecorators(
        HttpCode(code),
        ApiOkResponse(options),
        ApiBadRequestResponse({ type: BadReq, description: 'Validation Exception' }),
        ApiInternalServerErrorResponse({
            type: InternalError,
            description: 'Server Exception',
        }),
    )
}

export function ApiAuthenticatedResponse(
    options: ApiResponseNoStatusOptions & { statusCode?: HttpStatus },
) {
    if (!options.description) options.description = 'Success'
    const code = options?.statusCode || 200

    return applyDecorators(
        HttpCode(code),
        UseGuards(AuthGuard),
        ApiOkResponse(options),
        ApiBadRequestResponse({ type: BadReq, description: 'Validation Exception' }),
        ApiUnauthorizedResponse({
            type: Unauth,
            description: 'Authentication Exception',
        }),
        ApiInternalServerErrorResponse({
            type: InternalError,
            description: 'Server Exception',
        }),
    )
}
