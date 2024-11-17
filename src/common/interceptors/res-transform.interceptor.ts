import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    // Logger,
} from '@nestjs/common'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

interface Response<T> {
    statusCode: number
    message: string
    data?: T
}

@Injectable()
export class TransformInterceptor<T> implements NestInterceptor<T, Response<T>> {
    // private readonly logger = new Logger(TransformInterceptor.name)
    intercept(context: ExecutionContext, next: CallHandler): Observable<Response<T>> {
        return next.handle().pipe(
            map((data) => {
                //data is an array and it is empty array
                if (!data || (Array.isArray(data) && !data.length))
                    return { statusCode: 200, message: 'Success', data: null }
                //paginated results
                else if (Object.keys(data).includes('page'))
                    return { statusCode: 200, message: 'Success', ...data }
                return { statusCode: 200, message: 'Success', data }
            }),
        )
    }
}
