import {
    Injectable,
    CanActivate,
    ExecutionContext,
    UnauthorizedException,
    ForbiddenException,
    Logger,
    Inject,
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { JwtService } from '@nestjs/jwt'
import { Roles } from '@prism/keysley/enums'
import { ENV } from '@src/app.config'
import { ROLES_KEY } from '@src/constants/decorator-keys.constant'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import { ModFasReq, TokenData } from '@src/utils/auth-payload.util'
import { compare } from 'bcrypt'
import { z } from 'zod'
import { ZodValidationException } from '../exceptions/zod-validation.exception'

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
export class BearerAuthGuard implements CanActivate {
    private logger = new Logger(BearerAuthGuard.name)
    private db: DatabaseType

    constructor(
        private jwtService: JwtService,
        private reflector: Reflector,
        @Inject(DatabaseService) database: DatabaseService,
    ) {
        this.db = database.db()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<ModFasReq>()

        const headers = request.headers
        const authorization = headers.authorization || headers.Authorization

        if (!authorization || Array.isArray(authorization)) {
            throw new UnauthorizedException()
        }

        const jwt = authorization.replace(/[Bb]earer /, '')
        if (!isJWT(jwt)) throw new UnauthorizedException()

        try {
            await this.jwtService.verifyAsync(jwt, {
                secret: ENV.JWT_SECRET,
            })
        } catch {
            throw new UnauthorizedException()
        }

        const payload = (await this.jwtService.decode(jwt)) as TokenData
        if (!payload.status) throw new UnauthorizedException()

        //refresh token can only be used to refresh the jwt tokens. For any other route only allowing auth token.

        if (request.url.split('/').includes('refresh')) {
            if (payload.type !== 'refresh') throw new UnauthorizedException()
            const exists = await this.db
                .selectFrom('UserRefreshToken')
                .select('id')
                .where('UserRefreshToken.token', '=', jwt)
                .executeTakeFirst()

            if (!exists) throw new UnauthorizedException('Please Login Again!')
        } else if (payload.type === 'refresh') throw new UnauthorizedException()

        request.user = payload

        const requiredRoles = this.reflector.getAllAndOverride<Roles[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ])

        const access = requiredRoles?.some((role) => request.user!.role?.includes(role))
        if (requiredRoles && !access) throw new ForbiddenException('Unauthorized Access')

        return true
    }
}

@Injectable()
export class BasicAuthGuard implements CanActivate {
    private logger = new Logger(BasicAuthGuard.name)
    private db: DatabaseType

    constructor(@Inject(DatabaseService) database: DatabaseService) {
        this.db = database.db()
    }

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const request = context.switchToHttp().getRequest<ModFasReq>()
        const authHeader = request.headers.authorization

        if (!authHeader || !authHeader.startsWith('Basic '))
            throw new UnauthorizedException('Missing or invalid Authorization header')

        const base64Credentials = authHeader.split(' ')[1]
        const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8')
        const [email, password] = credentials.split(':')

        if (!email || !password)
            throw new UnauthorizedException('Invalid Basic Auth credentials')

        const schema = z.object({
            email: z.string().trim().email().max(256),
            password: z.string().trim().min(12).max(35),
        })

        const { success, error: zodError } = schema.safeParse({ email, password })
        if (!success) throw new ZodValidationException(zodError)

        const userInfo = await this.db
            .selectFrom('User')
            .innerJoin('UserEmail', 'UserEmail.user_id', 'User.id')
            .innerJoin('UserRole', 'UserRole.user_id', 'User.id')
            .select([
                'User.id',
                'User.pass_hash',
                'first_name',
                'last_name',
                'User.status',
                'UserRole.role',
            ])
            .where('UserEmail.email', '=', email)
            .where('User.status', '=', true)
            .where('UserEmail.status', '=', true)
            .execute()

        if (!userInfo?.length) throw new UnauthorizedException('Invalid Credentials!')

        const isValid = await compare(password, userInfo[0].pass_hash)
        if (!isValid) throw new UnauthorizedException('Invalid Credentials!')

        request.userInfo = userInfo.map((v) => {
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            const { pass_hash, ...rest } = v
            return rest
        })

        return true
    }
}
