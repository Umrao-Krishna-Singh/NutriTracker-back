import { z } from 'zod';

/////////////////////////////////////////
// USER EMAIL OTP SCHEMA
/////////////////////////////////////////

export const UserEmailOtpSchema = z.object({
  id: z.bigint(),
  email_id: z.bigint(),
  otp: z.number().int(),
  expire_at: z.coerce.date(),
  resend_expire_at: z.coerce.date(),
  created_at: z.coerce.date(),
  updated_at: z.coerce.date(),
})

export type UserEmailOtp = z.infer<typeof UserEmailOtpSchema>

/////////////////////////////////////////
// USER EMAIL OTP OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserEmailOtpOptionalDefaultsSchema = UserEmailOtpSchema.merge(z.object({
  id: z.bigint().optional(),
  created_at: z.coerce.date().optional(),
  updated_at: z.coerce.date().optional(),
}))

export type UserEmailOtpOptionalDefaults = z.infer<typeof UserEmailOtpOptionalDefaultsSchema>

export default UserEmailOtpSchema;
