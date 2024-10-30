import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','username','hash_password','fullname','email','is_verified','status']);

export default UserScalarFieldEnumSchema;
