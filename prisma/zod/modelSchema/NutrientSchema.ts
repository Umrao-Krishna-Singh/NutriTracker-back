import { z } from 'zod';
import { UnitsSchema } from '../inputTypeSchemas/UnitsSchema'

/////////////////////////////////////////
// NUTRIENT SCHEMA
/////////////////////////////////////////

export const NutrientSchema = z.object({
  unit_name: UnitsSchema.nullable(),
  id: z.bigint(),
  fdc_nutrient_id: z.bigint(),
  name: z.string(),
  nutrient_nbr: z.number().int().nullable(),
  rank: z.number().int().nullable(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Nutrient = z.infer<typeof NutrientSchema>

/////////////////////////////////////////
// NUTRIENT OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const NutrientOptionalDefaultsSchema = NutrientSchema.merge(z.object({
  id: z.bigint().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type NutrientOptionalDefaults = z.infer<typeof NutrientOptionalDefaultsSchema>

export default NutrientSchema;
