import { z } from 'zod';

export const UnitsSchema = z.enum(['G','IU','KCAL','MCG_RE','MG','MG_ATE','MG_GAE','PH','SP_GR','UG','UMOL_TE','kJ']);

export type UnitsType = `${z.infer<typeof UnitsSchema>}`

export default UnitsSchema;
