import { PipeTransform, Logger } from '@nestjs/common'
import { ZodValidationException } from '@src/common/exceptions/zod-validation.exception'
import { getFoodListSchema } from './nutrition.dto'

export class GetFoodListValidationPipe implements PipeTransform {
    private readonly getFoodListSchema = getFoodListSchema
    public logger: Logger = new Logger(GetFoodListValidationPipe.name)

    transform(value: unknown) {
        const { success, data, error: zodError } = this.getFoodListSchema.safeParse(value)

        this.logger.debug('identifier', value)

        if (!success) throw new ZodValidationException(zodError)
        const parsedValue: Record<'search', string> = data
        return parsedValue
    }
}
