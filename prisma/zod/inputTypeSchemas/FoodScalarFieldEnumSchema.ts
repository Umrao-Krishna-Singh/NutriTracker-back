import { z } from 'zod';

export const FoodScalarFieldEnumSchema = z.enum(['id','description','created_at','updated_at']);

export default FoodScalarFieldEnumSchema;
