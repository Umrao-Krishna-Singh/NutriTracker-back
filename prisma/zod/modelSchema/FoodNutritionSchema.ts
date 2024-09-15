import { z } from 'zod'
import { Prisma } from '@prisma/client'

/////////////////////////////////////////
// FOOD NUTRITION SCHEMA
/////////////////////////////////////////

export const FoodNutritionSchema = z.object({
    id: z.number().int(),
    food_id: z.number().int(),
    created_at: z.coerce.date(),
    updated_at: z.coerce.date(),
    energy: z.instanceof(Prisma.Decimal, {
        message:
            "Field 'energy' must be a Decimal. Location: ['Models', 'FoodNutrition']",
    }),
    protein: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'protein' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    carbohydrate: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'carbohydrate' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    sugars_total: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'sugars_total' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fiber_total_dietary: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fiber_total_dietary' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    total_fat: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'total_fat' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fatty_acids_total_saturated: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fatty_acids_total_saturated' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fatty_acids_total_monounsaturated: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fatty_acids_total_monounsaturated' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fatty_acids_total_polyunsaturated: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fatty_acids_total_polyunsaturated' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    cholesterol: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'cholesterol' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    retinol: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'retinol' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    vitamin_A_RAE: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'vitamin_A_RAE' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    carotene_alpha: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'carotene_alpha' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    carotene_beta: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'carotene_beta' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    cryptoxanthin_beta: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'cryptoxanthin_beta' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    lycopene: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'lycopene' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    lutein_zeaxanthin: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'lutein_zeaxanthin' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    thiamin: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'thiamin' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    riboflavin: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'riboflavin' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    niacin: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'niacin' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    vitamin_B_6: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'vitamin_B_6' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    folic_acid: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'folic_acid' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    folate_food: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'folate_food' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    folate_DFE: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'folate_DFE' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    folate_total: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'folate_total' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    choline_total: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'choline_total' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    vitamin_B_12: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'vitamin_B_12' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    vitamin_B_12added: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'vitamin_B_12added' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    vitamin_C: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'vitamin_C' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    vitamin_D_D2_D3: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'vitamin_D_D2_D3' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    vitamin_E_alpha_tocopherol: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'vitamin_E_alpha_tocopherol' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    vitamin_Eadded: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'vitamin_Eadded' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    vitamin_K_phylloquinone: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'vitamin_K_phylloquinone' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    calcium: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'calcium' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    phosphorus: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'phosphorus' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    magnesium: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'magnesium' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    iron: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'iron' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    zinc: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'zinc' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    copper: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'copper' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    selenium: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'selenium' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    potassium: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'potassium' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    sodium: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'sodium' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    caffeine: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'caffeine' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    theobromine: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'theobromine' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    alcohol: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'alcohol' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_4_0: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_4_0' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_6_0: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_6_0' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_8_0: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_8_0' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_10_0: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_10_0' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_12_0: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_12_0' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_14_0: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_14_0' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_16_0: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_16_0' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_18_0: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_18_0' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_16_1: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_16_1' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_18_1: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_18_1' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_20_1: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_20_1' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_22_1: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_22_1' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_18_2: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_18_2' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_18_3: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_18_3' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_18_4: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_18_4' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_20_4: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_20_4' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_20_5_n_3: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_20_5_n_3' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_22_5_n_3: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_22_5_n_3' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    fa_22_6_n_3: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'fa_22_6_n_3' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
    water: z
        .instanceof(Prisma.Decimal, {
            message:
                "Field 'water' must be a Decimal. Location: ['Models', 'FoodNutrition']",
        })
        .nullable(),
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
