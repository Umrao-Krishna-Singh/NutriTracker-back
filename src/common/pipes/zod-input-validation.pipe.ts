import { PipeTransform, Logger } from '@nestjs/common'
import { ZodValidationException } from '@src/common/exceptions/zod-validation.exception'
import { ZodSchema } from 'zod'

export class ZodValidationPipe implements PipeTransform {
    public logger: Logger = new Logger(ZodValidationPipe.name)

    constructor(private schema: ZodSchema<any>) {}
    transform(value: unknown) {
        const { success, data, error: zodError } = this.schema.safeParse(value)

        if (!success) throw new ZodValidationException(zodError)
        return data
    }
}
