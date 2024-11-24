import { z } from 'zod';

export const RolesSchema = z.enum(['USER','ADMIN']);

export type RolesType = `${z.infer<typeof RolesSchema>}`

export default RolesSchema;
