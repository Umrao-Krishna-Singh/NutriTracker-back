import { z } from 'zod';

/////////////////////////////////////////
// FOOD TAG SCHEMA
/////////////////////////////////////////

export const FoodTagSchema = z.object({
  id: z.bigint(),
  food_id: z.bigint(),
  tag_id: z.bigint(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type FoodTag = z.infer<typeof FoodTagSchema>

/////////////////////////////////////////
// FOOD TAG OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FoodTagOptionalDefaultsSchema = FoodTagSchema.merge(z.object({
  id: z.bigint().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type FoodTagOptionalDefaults = z.infer<typeof FoodTagOptionalDefaultsSchema>

export default FoodTagSchema;
