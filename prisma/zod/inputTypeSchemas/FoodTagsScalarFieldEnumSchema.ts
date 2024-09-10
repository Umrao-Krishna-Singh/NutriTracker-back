import { z } from 'zod';

export const FoodTagsScalarFieldEnumSchema = z.enum(['id','food_id','tag_id','created_at','updated_at']);

export default FoodTagsScalarFieldEnumSchema;
