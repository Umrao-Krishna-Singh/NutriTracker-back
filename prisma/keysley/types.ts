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
    energy: number
    protein: number | null
    carbohydrate: number | null
    sugars_total: number | null
    fiber_total_dietary: number | null
    total_fat: number | null
    fatty_acids_total_saturated: number | null
    fatty_acids_total_monounsaturated: number | null
    fatty_acids_total_polyunsaturated: number | null
    cholesterol: number | null
    retinol: number | null
    vitamin_A_RAE: number | null
    carotene_alpha: number | null
    carotene_beta: number | null
    cryptoxanthin_beta: number | null
    lycopene: number | null
    lutein_zeaxanthin: number | null
    thiamin: number | null
    riboflavin: number | null
    niacin: number | null
    vitamin_B_6: number | null
    folic_acid: number | null
    folate_food: number | null
    folate_DFE: number | null
    folate_total: number | null
    choline_total: number | null
    vitamin_B_12: number | null
    vitamin_B_12added: number | null
    vitamin_C: number | null
    vitamin_D_D2_D3: number | null
    vitamin_E_alpha_tocopherol: number | null
    vitamin_Eadded: number | null
    vitamin_K_phylloquinone: number | null
    calcium: number | null
    phosphorus: number | null
    magnesium: number | null
    iron: number | null
    zinc: number | null
    copper: number | null
    selenium: number | null
    potassium: number | null
    sodium: number | null
    caffeine: number | null
    theobromine: number | null
    alcohol: number | null
    fa_4_0: number | null
    fa_6_0: number | null
    fa_8_0: number | null
    fa_10_0: number | null
    fa_12_0: number | null
    fa_14_0: number | null
    fa_16_0: number | null
    fa_18_0: number | null
    fa_16_1: number | null
    fa_18_1: number | null
    fa_20_1: number | null
    fa_22_1: number | null
    fa_18_2: number | null
    fa_18_3: number | null
    fa_18_4: number | null
    fa_20_4: number | null
    fa_20_5_n_3: number | null
    fa_22_5_n_3: number | null
    fa_22_6_n_3: number | null
    water: number | null
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
