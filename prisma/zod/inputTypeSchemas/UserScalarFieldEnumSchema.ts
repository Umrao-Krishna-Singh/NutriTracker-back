import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','username','pass_hash','fullname','email','is_verified','weight','goal_weight','height','status']);

export default UserScalarFieldEnumSchema;
