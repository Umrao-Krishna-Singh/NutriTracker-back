import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','username','fullname','email','status']);

export default UserScalarFieldEnumSchema;
