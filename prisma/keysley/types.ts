import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type DupFoodDescriptions = {
    id: Generated<number>;
    /**
     * @zod.string.max(300)
     */
    description: string;
    fdc_id: number;
};
export type Food = {
    id: Generated<number>;
    /**
     * @zod.string.max(300)
     */
    description: string;
    fdc_id: number | null;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type FoodNutrition = {
    id: Generated<number>;
    food_id: number;
    nutrition_id: number;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type FoodTags = {
    id: Generated<number>;
    food_id: number;
    tag_id: number;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Nutrition = {
    id: Generated<number>;
    name: string;
    fdc_nutrient_id: number | null;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Tag = {
    id: Generated<number>;
    tag_name: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type User = {
    id: Generated<number>;
    /**
     * @zod.string.max(80)
     */
    username: string;
    /**
     * @zod.string.max(126)
     */
    fullname: string;
    /**
     * @zod.string.max(256)
     */
    email: string | null;
};
export type DB = {
    DupFoodDescriptions: DupFoodDescriptions;
    Food: Food;
    FoodNutrition: FoodNutrition;
    FoodTags: FoodTags;
    Nutrition: Nutrition;
    Tag: Tag;
    User: User;
};
