import { z } from 'zod';

export const UserRefreshTokenScalarFieldEnumSchema = z.enum(['id','user_id','token','issued_at','expire_at','created_at']);

export default UserRefreshTokenScalarFieldEnumSchema;
