import { z } from 'zod';

/////////////////////////////////////////
// NUTRITION SCHEMA
/////////////////////////////////////////

export const NutritionSchema = z.object({
  id: z.number().int(),
  name: z.string(),
  fdc_nutrient_id: z.number().int().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Nutrition = z.infer<typeof NutritionSchema>

/////////////////////////////////////////
// NUTRITION OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const NutritionOptionalDefaultsSchema = NutritionSchema.merge(z.object({
  id: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type NutritionOptionalDefaults = z.infer<typeof NutritionOptionalDefaultsSchema>

export default NutritionSchema;
