import { PipeTransform, Logger, HttpException, HttpStatus, Inject } from '@nestjs/common'
import { ZodValidationException } from '@src/common/exceptions/zod-validation.exception'
import { UserOptionalDefaultsSchema } from '@prism/zod'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import { SignupResponseDto } from './profile.dto'

export class SignupValPipe implements PipeTransform {
    private readonly signupSchema = UserOptionalDefaultsSchema.omit({
        id: true,
        status: true,
        is_verified: true,
    })
    private readonly logger = new Logger(SignupValPipe.name)
    private db: DatabaseType
    constructor(@Inject(DatabaseService) database: DatabaseService) {
        this.db = database.db()
    }

    async transform(value: unknown): Promise<Omit<SignupResponseDto, 'id'>> {
        const { success, data, error: zodError } = this.signupSchema.safeParse(value)
        if (!success) throw new ZodValidationException(zodError)

        const userExists = await this.db
            .selectFrom('User')
            .select(['id', 'username', 'fullname', 'email'])
            .where((eb) =>
                eb.or([
                    eb('User.username', '=', data.username),
                    eb('User.email', '=', data.email),
                ]),
            )
            .executeTakeFirst()

        if (userExists)
            throw new HttpException('User exists! Please Login! ', HttpStatus.BAD_REQUEST)

        return data
    }
}
