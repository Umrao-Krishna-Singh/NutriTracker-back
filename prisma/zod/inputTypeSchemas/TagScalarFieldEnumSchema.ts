import { z } from 'zod';

export const TagScalarFieldEnumSchema = z.enum(['id','tag_name','created_at','updated_at']);

export default TagScalarFieldEnumSchema;
