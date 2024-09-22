import { PipeTransform, Logger } from '@nestjs/common'
import { ZodValidationException } from '@src/common/exceptions/zod-validation.exception'
import { getFoodDetailsSearchSchema } from './nutrition.dto'

export class GetFoodSearchValidationPipe implements PipeTransform {
    private readonly getFoodDetailsSearchSchema = getFoodDetailsSearchSchema
    public logger: Logger = new Logger(GetFoodSearchValidationPipe.name)

    transform(value: unknown) {
        const {
            success,
            data,
            error: zodError,
        } = this.getFoodDetailsSearchSchema.safeParse(value)

        this.logger.debug('identifier', value)

        if (!success) throw new ZodValidationException(zodError)
        const parsedValue: Record<'search', string> = data
        return parsedValue
    }
}
