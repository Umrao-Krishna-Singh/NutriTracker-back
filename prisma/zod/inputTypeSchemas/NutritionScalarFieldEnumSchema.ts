import { z } from 'zod';

export const NutritionScalarFieldEnumSchema = z.enum(['id','name','fdc_nutrient_id','created_at','updated_at']);

export default NutritionScalarFieldEnumSchema;
