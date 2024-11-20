import { Injectable, Logger } from '@nestjs/common'
type DataItem<T extends object> = T & { total_count: number }

@Injectable()
export class ResHelperService {
    private logger: Logger = new Logger(ResHelperService.name)

    success<T>(data: T) {
        return { status: true, code: 200, data }
    }

    paginate<T extends object>(data: DataItem<T>[] | null, page: number, limit: number) {
        if (!data || !data.length)
            return { status: true, code: 200, data: null, page, pageCount: 1 }

        const pages = Math.ceil(data[0].total_count / limit)
        const pageCount = pages ? pages : 1

        const parsedData: Omit<T, 'total_count'>[] = data.map(
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            ({ total_count, ...rest }) => rest,
        )

        return { status: true, code: 200, data: parsedData, page, pageCount }
    }
}
