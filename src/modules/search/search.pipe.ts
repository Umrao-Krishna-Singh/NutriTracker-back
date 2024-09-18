import { PipeTransform, Logger } from '@nestjs/common'
import { ZodValidationException } from '@src/common/exceptions/zod-validation.exception'
import { getPostSchema } from './search.dto'

export class GetFoodSearchValidationPipe implements PipeTransform {
    private readonly getPostSchema = getPostSchema
    public logger: Logger = new Logger(GetFoodSearchValidationPipe.name)

    transform(value: unknown) {
        const { success, data, error: zodError } = this.getPostSchema.safeParse(value)
        if (!success) throw new ZodValidationException(zodError)
        const parsedValue: Record<'search', string> = data
        return parsedValue
    }
}
