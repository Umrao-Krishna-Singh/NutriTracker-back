import { z } from 'zod';

export const UserEmailScalarFieldEnumSchema = z.enum(['id','user_id','is_created','email','status']);

export default UserEmailScalarFieldEnumSchema;
