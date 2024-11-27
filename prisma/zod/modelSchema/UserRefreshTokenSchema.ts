import { z } from 'zod';

/////////////////////////////////////////
// USER REFRESH TOKEN SCHEMA
/////////////////////////////////////////

export const UserRefreshTokenSchema = z.object({
  id: z.bigint(),
  user_id: z.bigint(),
  token: z.string().max(500),
  issued_at: z.coerce.date(),
  expire_at: z.coerce.date(),
  created_at: z.coerce.date(),
})

export type UserRefreshToken = z.infer<typeof UserRefreshTokenSchema>

/////////////////////////////////////////
// USER REFRESH TOKEN OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserRefreshTokenOptionalDefaultsSchema = UserRefreshTokenSchema.merge(z.object({
  id: z.bigint().optional(),
  created_at: z.coerce.date().optional(),
}))

export type UserRefreshTokenOptionalDefaults = z.infer<typeof UserRefreshTokenOptionalDefaultsSchema>

export default UserRefreshTokenSchema;
