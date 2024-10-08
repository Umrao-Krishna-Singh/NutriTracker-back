import { z } from 'zod';

/////////////////////////////////////////
// DUP FOOD DESCRIPTIONS SCHEMA
/////////////////////////////////////////

export const DupFoodDescriptionsSchema = z.object({
  id: z.number().int(),
  description: z.string().max(300),
  fdc_id: z.number().int(),
})

export type DupFoodDescriptions = z.infer<typeof DupFoodDescriptionsSchema>

/////////////////////////////////////////
// DUP FOOD DESCRIPTIONS OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const DupFoodDescriptionsOptionalDefaultsSchema = DupFoodDescriptionsSchema.merge(z.object({
  id: z.number().int().optional(),
}))

export type DupFoodDescriptionsOptionalDefaults = z.infer<typeof DupFoodDescriptionsOptionalDefaultsSchema>

export default DupFoodDescriptionsSchema;
