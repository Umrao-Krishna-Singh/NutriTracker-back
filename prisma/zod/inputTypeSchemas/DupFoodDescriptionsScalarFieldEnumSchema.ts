import { z } from 'zod';

export const DupFoodDescriptionsScalarFieldEnumSchema = z.enum(['id','description','fdc_id','created_at','updated_at']);

export default DupFoodDescriptionsScalarFieldEnumSchema;
