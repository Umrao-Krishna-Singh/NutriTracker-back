import { z } from 'zod';

/////////////////////////////////////////
// FOOD SCHEMA
/////////////////////////////////////////

export const FoodSchema = z.object({
  id: z.number().int(),
  fdc_id: z.number().int().nullable(),
  description: z.string().max(500),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Food = z.infer<typeof FoodSchema>

/////////////////////////////////////////
// FOOD OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FoodOptionalDefaultsSchema = FoodSchema.merge(z.object({
  id: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type FoodOptionalDefaults = z.infer<typeof FoodOptionalDefaultsSchema>

export default FoodSchema;
