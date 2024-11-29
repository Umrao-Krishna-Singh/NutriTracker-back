import { z } from 'zod';

export const UserScalarFieldEnumSchema = z.enum(['id','pass_hash','first_name','last_name','weight','goal_weight','height','status']);

export default UserScalarFieldEnumSchema;
