import { z } from 'zod';

export const UserEmailOtpScalarFieldEnumSchema = z.enum(['id','email_id','otp','expire_at','resend_expire_at','created_at','updated_at']);

export default UserEmailOtpScalarFieldEnumSchema;
