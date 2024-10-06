import { z } from 'zod';

/////////////////////////////////////////
// FOOD NUTRITION SCHEMA
/////////////////////////////////////////

export const FoodNutritionSchema = z.object({
  id: z.number().int(),
  food_id: z.number().int(),
  nutrition_id: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type FoodNutrition = z.infer<typeof FoodNutritionSchema>

/////////////////////////////////////////
// FOOD NUTRITION OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FoodNutritionOptionalDefaultsSchema = FoodNutritionSchema.merge(z.object({
  id: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type FoodNutritionOptionalDefaults = z.infer<typeof FoodNutritionOptionalDefaultsSchema>

export default FoodNutritionSchema;
