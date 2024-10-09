import { z } from 'zod';

/////////////////////////////////////////
// DUPLICATE FOOD SCHEMA
/////////////////////////////////////////

export const DuplicateFoodSchema = z.object({
  id: z.number().int(),
  description: z.string(),
  fdc_id: z.number().int(),
  type: z.number().int(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type DuplicateFood = z.infer<typeof DuplicateFoodSchema>

/////////////////////////////////////////
// DUPLICATE FOOD OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const DuplicateFoodOptionalDefaultsSchema = DuplicateFoodSchema.merge(z.object({
  id: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type DuplicateFoodOptionalDefaults = z.infer<typeof DuplicateFoodOptionalDefaultsSchema>

export default DuplicateFoodSchema;
