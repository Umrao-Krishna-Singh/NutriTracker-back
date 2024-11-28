import { z } from 'zod';

/////////////////////////////////////////
// USER AUTH TOKEN SCHEMA
/////////////////////////////////////////

export const UserAuthTokenSchema = z.object({
  id: z.number().int(),
  user_id: z.number().int(),
  token: z.string().max(500),
  issued_at: z.coerce.date(),
  expire_at: z.coerce.date(),
  created_at: z.coerce.date(),
})

export type UserAuthToken = z.infer<typeof UserAuthTokenSchema>

/////////////////////////////////////////
// USER AUTH TOKEN OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserAuthTokenOptionalDefaultsSchema = UserAuthTokenSchema.merge(z.object({
  id: z.number().int().optional(),
  created_at: z.coerce.date().optional(),
}))

export type UserAuthTokenOptionalDefaults = z.infer<typeof UserAuthTokenOptionalDefaultsSchema>

export default UserAuthTokenSchema;
