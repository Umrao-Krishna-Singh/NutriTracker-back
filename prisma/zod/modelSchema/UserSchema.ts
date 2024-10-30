import { z } from 'zod';

/////////////////////////////////////////
// USER SCHEMA
/////////////////////////////////////////

export const UserSchema = z.object({
  id: z.number().int(),
  username: z.string().max(80),
  hash_password: z.string().max(100),
  fullname: z.string().max(126),
  email: z.string().max(256),
  is_verified: z.boolean(),
  status: z.boolean(),
})

export type User = z.infer<typeof UserSchema>

/////////////////////////////////////////
// USER OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserOptionalDefaultsSchema = UserSchema.merge(z.object({
  id: z.number().int().optional(),
  is_verified: z.boolean().optional(),
  status: z.boolean().optional(),
}))

export type UserOptionalDefaults = z.infer<typeof UserOptionalDefaultsSchema>

export default UserSchema;
