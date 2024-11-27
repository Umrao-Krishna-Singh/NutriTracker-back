import { z } from 'zod';

/////////////////////////////////////////
// USER EMAIL SCHEMA
/////////////////////////////////////////

export const UserEmailSchema = z.object({
  id: z.bigint(),
  user_id: z.bigint().nullable(),
  is_created: z.boolean(),
  email: z.string().max(256),
  status: z.boolean(),
})

export type UserEmail = z.infer<typeof UserEmailSchema>

/////////////////////////////////////////
// USER EMAIL OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserEmailOptionalDefaultsSchema = UserEmailSchema.merge(z.object({
  id: z.bigint().optional(),
  is_created: z.boolean().optional(),
  status: z.boolean().optional(),
}))

export type UserEmailOptionalDefaults = z.infer<typeof UserEmailOptionalDefaultsSchema>

export default UserEmailSchema;
