import { z } from 'zod';

export const NutritionScalarFieldEnumSchema = z.enum(['id','fdc_nutrient_id','name','unit_name','nutrient_nbr','rank','created_at','updated_at']);

export default NutritionScalarFieldEnumSchema;
