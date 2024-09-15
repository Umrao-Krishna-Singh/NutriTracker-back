import { z } from 'zod'

/////////////////////////////////////////
// FOOD NUTRITION SCHEMA
/////////////////////////////////////////

export const FoodNutritionSchema = z.object({
    id: z.number().int(),
    food_id: z.number().int(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    energy: z.number().int(),
    protein: z.number().int().nullable(),
    carbohydrate: z.number().int().nullable(),
    sugars_total: z.number().int().nullable(),
    fiber_total_dietary: z.number().int().nullable(),
    total_fat: z.number().int().nullable(),
    fatty_acids_total_saturated: z.number().int().nullable(),
    fatty_acids_total_monounsaturated: z.number().int().nullable(),
    fatty_acids_total_polyunsaturated: z.number().int().nullable(),
    cholesterol: z.number().int().nullable(),
    retinol: z.number().int().nullable(),
    vitamin_A_RAE: z.number().int().nullable(),
    carotene_alpha: z.number().int().nullable(),
    carotene_beta: z.number().int().nullable(),
    cryptoxanthin_beta: z.number().int().nullable(),
    lycopene: z.number().int().nullable(),
    lutein_zeaxanthin: z.number().int().nullable(),
    thiamin: z.number().int().nullable(),
    riboflavin: z.number().int().nullable(),
    niacin: z.number().int().nullable(),
    vitamin_B_6: z.number().int().nullable(),
    folic_acid: z.number().int().nullable(),
    folate_food: z.number().int().nullable(),
    folate_DFE: z.number().int().nullable(),
    folate_total: z.number().int().nullable(),
    choline_total: z.number().int().nullable(),
    vitamin_B_12: z.number().int().nullable(),
    vitamin_B_12added: z.number().int().nullable(),
    vitamin_C: z.number().int().nullable(),
    vitamin_D_D2_D3: z.number().int().nullable(),
    vitamin_E_alpha_tocopherol: z.number().int().nullable(),
    vitamin_Eadded: z.number().int().nullable(),
    vitamin_K_phylloquinone: z.number().int().nullable(),
    calcium: z.number().int().nullable(),
    phosphorus: z.number().int().nullable(),
    magnesium: z.number().int().nullable(),
    iron: z.number().int().nullable(),
    zinc: z.number().int().nullable(),
    copper: z.number().int().nullable(),
    selenium: z.number().int().nullable(),
    potassium: z.number().int().nullable(),
    sodium: z.number().int().nullable(),
    caffeine: z.number().int().nullable(),
    theobromine: z.number().int().nullable(),
    alcohol: z.number().int().nullable(),
    fa_4_0: z.number().int().nullable(),
    fa_6_0: z.number().int().nullable(),
    fa_8_0: z.number().int().nullable(),
    fa_10_0: z.number().int().nullable(),
    fa_12_0: z.number().int().nullable(),
    fa_14_0: z.number().int().nullable(),
    fa_16_0: z.number().int().nullable(),
    fa_18_0: z.number().int().nullable(),
    fa_16_1: z.number().int().nullable(),
    fa_18_1: z.number().int().nullable(),
    fa_20_1: z.number().int().nullable(),
    fa_22_1: z.number().int().nullable(),
    fa_18_2: z.number().int().nullable(),
    fa_18_3: z.number().int().nullable(),
    fa_18_4: z.number().int().nullable(),
    fa_20_4: z.number().int().nullable(),
    fa_20_5_n_3: z.number().int().nullable(),
    fa_22_5_n_3: z.number().int().nullable(),
    fa_22_6_n_3: z.number().int().nullable(),
    water: z.number().int().nullable(),
})

export type FoodNutrition = z.infer<typeof FoodNutritionSchema>

/////////////////////////////////////////
// FOOD NUTRITION OPTIONAL DEFAULTS SCHEMA
/////////////////////////////////////////

export const FoodNutritionOptionalDefaultsSchema = FoodNutritionSchema.merge(
    z.object({
        id: z.number().int().optional(),
        created_at: z.coerce.date().optional(),
        updated_at: z.coerce.date().optional(),
    }),
)

export type FoodNutritionOptionalDefaults = z.infer<
    typeof FoodNutritionOptionalDefaultsSchema
>

export default FoodNutritionSchema
