import { z } from 'zod';

export const FoodNutritionScalarFieldEnumSchema = z.enum(['id','food_id','nutrition_id','created_at','updated_at']);

export default FoodNutritionScalarFieldEnumSchema;
