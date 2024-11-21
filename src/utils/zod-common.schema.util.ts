import { z } from 'zod'

export const { coerce: co } = z
export const pgReqSchema = z.object({
    page: co.number().int().min(1).default(1),
    limit: co.number().int().min(1).default(10),
})
