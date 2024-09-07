import { HttpException, HttpStatus } from '@nestjs/common'
import { ZodError } from 'zod'

export class ZodValidationException extends HttpException {
    constructor(message: ZodError) {
        super(message, HttpStatus.BAD_REQUEST)
    }
}
