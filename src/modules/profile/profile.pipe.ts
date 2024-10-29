import { PipeTransform, Logger, HttpException, HttpStatus, Inject } from '@nestjs/common'
import { ZodValidationException } from '@src/common/exceptions/zod-validation.exception'
import { UserOptionalDefaultsSchema } from '@prism/zod'
import { DatabaseService, DatabaseType } from '@src/database/db.service'
import { UserResponseDto } from './profile.dto'

export class SignupValPipe implements PipeTransform {
    private readonly signupSchema = UserOptionalDefaultsSchema
    private readonly logger: Logger
    private db: DatabaseType
    constructor(@Inject(DatabaseService) database: DatabaseService) {
        this.db = database.db()
        this.logger = new Logger(SignupValPipe.name)
    }

    async transform(value: unknown): Promise<Omit<UserResponseDto, 'id'>> {
        const { success, data, error: zodError } = this.signupSchema.safeParse(value)
        if (!success) throw new ZodValidationException(zodError)

        const userExists = await this.db
            .selectFrom('User')
            .select('User.id')
            .where((eb) =>
                eb.or([
                    eb('User.username', '=', data.username),
                    eb('User.email', '=', data.email),
                ]),
            )
            .executeTakeFirst()

        if (userExists) throw new HttpException('User Exists', HttpStatus.BAD_REQUEST)

        return data
    }
}
