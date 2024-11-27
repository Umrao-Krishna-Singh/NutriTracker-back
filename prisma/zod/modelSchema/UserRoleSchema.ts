import { z } from 'zod';
import { RolesSchema } from '../inputTypeSchemas/RolesSchema'

/////////////////////////////////////////
// USER ROLE SCHEMA
/////////////////////////////////////////

export const UserRoleSchema = z.object({
  role: RolesSchema,
  id: z.bigint(),
  user_id: z.bigint(),
  status: z.boolean(),
})

export type UserRole = z.infer<typeof UserRoleSchema>

/////////////////////////////////////////
// USER ROLE OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const UserRoleOptionalDefaultsSchema = UserRoleSchema.merge(z.object({
  id: z.bigint().optional(),
  status: z.boolean().optional(),
}))

export type UserRoleOptionalDefaults = z.infer<typeof UserRoleOptionalDefaultsSchema>

export default UserRoleSchema;
