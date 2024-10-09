import { z } from 'zod';

export const DuplicateFoodScalarFieldEnumSchema = z.enum(['id','description','fdc_id','type','created_at','updated_at']);

export default DuplicateFoodScalarFieldEnumSchema;
