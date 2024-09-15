import { z } from 'zod';

/////////////////////////////////////////
// TAG SCHEMA
/////////////////////////////////////////

export const TagSchema = z.object({
  id: z.number().int(),
  tag_name: z.string(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type Tag = z.infer<typeof TagSchema>

/////////////////////////////////////////
// TAG OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const TagOptionalDefaultsSchema = TagSchema.merge(z.object({
  id: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type TagOptionalDefaults = z.infer<typeof TagOptionalDefaultsSchema>

export default TagSchema;
