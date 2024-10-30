import { z } from 'zod';

export const FoodTagScalarFieldEnumSchema = z.enum(['id','food_id','tag_id','created_at','updated_at']);

export default FoodTagScalarFieldEnumSchema;
