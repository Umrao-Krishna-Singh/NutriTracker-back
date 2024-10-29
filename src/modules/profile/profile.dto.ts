import { z } from 'zod'

export const signupSchema = z.object({ search: z.string().min(1) }).required()
// export type FoodSearchDto = z.infer<typeof signupSchema>

export type UserResponseDto = {
    id: number
    fullname: string
    username: string
    email: string | null
}
