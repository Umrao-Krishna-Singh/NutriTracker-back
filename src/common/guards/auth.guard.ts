import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Roles } from '@prism/keysley/enums'
import { ENV } from '@src/app.config'
import { ROLES_KEY } from '@src/constants/decorator-keys.constant'
import { tokenData } from '@src/utils/jwt-payload.util'
import { FastifyRequest } from 'fastify'

function isJWT(token: string): boolean {
    const parts = token.split('.')
    return (
        parts.length === 3 &&
        /^[a-zA-Z0-9_-]+$/.test(parts[0]) &&
        /^[a-zA-Z0-9_-]+$/.test(parts[1]) &&
        /^[a-zA-Z0-9_-]+$/.test(parts[2])
    )
}

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context
            .switchToHttp()
            .getRequest<FastifyRequest & { user?: tokenData }>()

        const headers = request.headers
        const authorization = headers.authorization || headers.Authorization

        if (!authorization || Array.isArray(authorization)) {
            throw new UnauthorizedException('Invalid User')
        }

        const jwt = authorization.replace(/[Bb]earer /, '')
        if (!isJWT(jwt)) throw new UnauthorizedException('Invalid User')

        try {
            await this.jwtService.verifyAsync(jwt, {
                secret: ENV.JWT_SECRET,
            })
        } catch {
            throw new UnauthorizedException('Invalid User')
        }

        const payload = (await this.jwtService.decode(jwt)) as tokenData
        request.user = payload

        const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        const access = requiredRoles?.some((role) => request.user!.role?.includes(role))
        if (!access) throw new ForbiddenException('Unauthorized Access')

        return true
    }
}
