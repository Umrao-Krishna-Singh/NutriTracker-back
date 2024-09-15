import { z } from 'zod';

/////////////////////////////////////////
// FOOD TAGS SCHEMA
/////////////////////////////////////////

export const FoodTagsSchema = z.object({
  id: z.number().int(),
  food_id: z.number().int(),
  tag_id: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type FoodTags = z.infer<typeof FoodTagsSchema>

/////////////////////////////////////////
// FOOD TAGS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FoodTagsOptionalDefaultsSchema = FoodTagsSchema.merge(z.object({
  id: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type FoodTagsOptionalDefaults = z.infer<typeof FoodTagsOptionalDefaultsSchema>

export default FoodTagsSchema;
