import { z } from 'zod';
import { UnitsSchema } from '../inputTypeSchemas/UnitsSchema'

/////////////////////////////////////////
// NUTRITION SCHEMA
/////////////////////////////////////////

export const NutritionSchema = z.object({
  unit_name: UnitsSchema.nullable(),
  id: z.number().int(),
  fdc_nutrient_id: z.number().int().nullable(),
  name: z.string(),
  nutrient_nbr: z.number().int().nullable(),
  rank: z.number().int().nullable(),
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
