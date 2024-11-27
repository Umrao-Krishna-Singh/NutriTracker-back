import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','pass_hash','first_name','last_name','is_verified','weight','goal_weight','height','status']);

export default UserScalarFieldEnumSchema;
