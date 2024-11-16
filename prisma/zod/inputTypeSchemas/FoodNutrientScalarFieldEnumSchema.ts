import { z } from 'zod';

export const FoodNutrientScalarFieldEnumSchema = z.enum(['id','food_id','nutrient_id','quantity','created_at','updated_at']);

export default FoodNutrientScalarFieldEnumSchema;
