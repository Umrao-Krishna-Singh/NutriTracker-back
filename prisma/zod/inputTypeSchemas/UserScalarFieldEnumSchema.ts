import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','pass_hash','first_name','last_name','email','is_verified','weight','goal_weight','height','status']);

export default UserScalarFieldEnumSchema;
