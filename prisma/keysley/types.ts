import type { ColumnType } from 'kysely'
export type Generated<T> =
    T extends ColumnType<infer S, infer I, infer U>
        ? ColumnType<S, I | undefined, U>
        : ColumnType<T, T | undefined, T>
export type Timestamp = ColumnType<Date, Date | string, Date | string>

export type Food = {
    id: Generated<number>
    /**
     * @zod.string.max(250)
     */
    description: string
    created_at: Generated<Timestamp>
    updated_at: Generated<Timestamp>
}
export type FoodNutrition = {
    id: Generated<number>
    food_id: number
    created_at: Generated<Timestamp>
    updated_at: Generated<Timestamp>
    energy: string
    protein: string | null
    carbohydrate: string | null
    sugars_total: string | null
    fiber_total_dietary: string | null
    total_fat: string | null
    fatty_acids_total_saturated: string | null
    fatty_acids_total_monounsaturated: string | null
    fatty_acids_total_polyunsaturated: string | null
    cholesterol: string | null
    retinol: string | null
    vitamin_A_RAE: string | null
    carotene_alpha: string | null
    carotene_beta: string | null
    cryptoxanthin_beta: string | null
    lycopene: string | null
    lutein_zeaxanthin: string | null
    thiamin: string | null
    riboflavin: string | null
    niacin: string | null
    vitamin_B_6: string | null
    folic_acid: string | null
    folate_food: string | null
    folate_DFE: string | null
    folate_total: string | null
    choline_total: string | null
    vitamin_B_12: string | null
    vitamin_B_12added: string | null
    vitamin_C: string | null
    vitamin_D_D2_D3: string | null
    vitamin_E_alpha_tocopherol: string | null
    vitamin_Eadded: string | null
    vitamin_K_phylloquinone: string | null
    calcium: string | null
    phosphorus: string | null
    magnesium: string | null
    iron: string | null
    zinc: string | null
    copper: string | null
    selenium: string | null
    potassium: string | null
    sodium: string | null
    caffeine: string | null
    theobromine: string | null
    alcohol: string | null
    fa_4_0: string | null
    fa_6_0: string | null
    fa_8_0: string | null
    fa_10_0: string | null
    fa_12_0: string | null
    fa_14_0: string | null
    fa_16_0: string | null
    fa_18_0: string | null
    fa_16_1: string | null
    fa_18_1: string | null
    fa_20_1: string | null
    fa_22_1: string | null
    fa_18_2: string | null
    fa_18_3: string | null
    fa_18_4: string | null
    fa_20_4: string | null
    fa_20_5_n_3: string | null
    fa_22_5_n_3: string | null
    fa_22_6_n_3: string | null
    water: string | null
}
export type FoodTags = {
    id: Generated<number>
    food_id: number
    tag_id: number
    created_at: Generated<Timestamp>
    updated_at: Generated<Timestamp>
}
export type Tag = {
    id: Generated<number>
    tag_name: string
    created_at: Generated<Timestamp>
    updated_at: Generated<Timestamp>
}
export type User = {
    id: Generated<number>
    /**
     * @zod.string.max(80)
     */
    username: string
    /**
     * @zod.string.max(126)
     */
    fullname: string
    /**
     * @zod.string.max(256)
     */
    email: string | null
}
export type DB = {
    Food: Food
    FoodNutrition: FoodNutrition
    FoodTags: FoodTags
    Tag: Tag
    User: User
}
