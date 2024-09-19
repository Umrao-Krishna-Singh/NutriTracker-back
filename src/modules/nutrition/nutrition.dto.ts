import { z } from 'zod'

export const getPostSchema = z.object({ search: z.string() }).required()
export type FoodSearchDto = z.infer<typeof getPostSchema>

export type FoodSearchResponseDto = {
    id: number
    description: string
}
