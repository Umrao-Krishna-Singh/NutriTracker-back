import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Roles, Units } from "./enums";

export type DuplicateFood = {
    id: Generated<number>;
    /**
     * @zod.string.max(500)
     */
    description: string;
    fdc_id: number | null;
    type: number;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Food = {
    id: Generated<number>;
    fdc_id: number | null;
    /**
     * @zod.string.max(500)
     */
    description: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type FoodNutrient = {
    id: Generated<number>;
    food_id: number;
    nutrient_id: number;
    quantity: number;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type FoodTag = {
    id: Generated<number>;
    food_id: number;
    tag_id: number;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Nutrient = {
    id: Generated<number>;
    fdc_nutrient_id: number;
    name: string;
    unit_name: Units | null;
    nutrient_nbr: number | null;
    rank: number | null;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Tag = {
    id: Generated<number>;
    /**
     * @zod.string.max(100)
     */
    tag_name: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type User = {
    id: Generated<number>;
    /**
     * @zod.string.max(100)
     */
    pass_hash: string;
    /**
     * @zod.string.max(126)
     */
    first_name: string;
    /**
     * @zod.string.max(126)
     */
    last_name: string;
    weight: number | null;
    goal_weight: number | null;
    height: number | null;
    status: Generated<boolean>;
};
export type UserEmail = {
    id: Generated<number>;
    user_id: number | null;
    is_created: Generated<boolean>;
    /**
     * @zod.string.max(256)
     */
    email: string;
    status: Generated<boolean>;
};
export type UserEmailOtp = {
    id: Generated<number>;
    email_id: number;
    otp: number;
    expire_at: Timestamp;
    resend_expire_at: Timestamp;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type UserRefreshToken = {
    id: Generated<number>;
    user_id: number;
    /**
     * @zod.string.max(500)
     */
    token: string;
    issued_at: Timestamp;
    expire_at: Timestamp;
    created_at: Generated<Timestamp>;
};
export type UserRole = {
    id: Generated<number>;
    user_id: number;
    role: Roles;
    status: Generated<boolean>;
};
export type DB = {
    DuplicateFood: DuplicateFood;
    Food: Food;
    FoodNutrient: FoodNutrient;
    FoodTag: FoodTag;
    Nutrient: Nutrient;
    Tag: Tag;
    User: User;
    UserEmail: UserEmail;
    UserEmailOtp: UserEmailOtp;
    UserRefreshToken: UserRefreshToken;
    UserRole: UserRole;
};
