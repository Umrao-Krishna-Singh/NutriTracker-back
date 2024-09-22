import { z } from 'zod'

export const getFoodDetailsSearchSchema = z
    .object({ search: z.string().min(1) })
    .required()
export type FoodSearchDto = z.infer<typeof getFoodDetailsSearchSchema>

export type FoodSearchResponseDto = {
    id: number
    description: string
}
