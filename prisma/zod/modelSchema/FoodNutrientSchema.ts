import { z } from 'zod';

/////////////////////////////////////////
// FOOD NUTRIENT SCHEMA
/////////////////////////////////////////

export const FoodNutrientSchema = z.object({
  id: z.bigint(),
  food_id: z.bigint(),
  nutrient_id: z.bigint(),
  quantity: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type FoodNutrient = z.infer<typeof FoodNutrientSchema>

/////////////////////////////////////////
// FOOD NUTRIENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FoodNutrientOptionalDefaultsSchema = FoodNutrientSchema.merge(z.object({
  id: z.bigint().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type FoodNutrientOptionalDefaults = z.infer<typeof FoodNutrientOptionalDefaultsSchema>

export default FoodNutrientSchema;
