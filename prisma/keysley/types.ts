import type { ColumnType } from "kysely";
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

import type { Roles, Units } from "./enums";

export type DuplicateFood = {
    id: Generated<string>;
    /**
     * @zod.string.max(500)
     */
    description: string;
    fdc_id: string | null;
    type: number;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Food = {
    id: Generated<string>;
    fdc_id: string | null;
    /**
     * @zod.string.max(500)
     */
    description: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type FoodNutrient = {
    id: Generated<string>;
    food_id: string;
    nutrient_id: string;
    quantity: number;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type FoodTag = {
    id: Generated<string>;
    food_id: string;
    tag_id: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Nutrient = {
    id: Generated<string>;
    fdc_nutrient_id: string;
    name: string;
    unit_name: Units | null;
    nutrient_nbr: string | null;
    rank: string | null;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type Tag = {
    id: Generated<string>;
    /**
     * @zod.string.max(100)
     */
    tag_name: string;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type User = {
    id: Generated<string>;
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
    is_verified: Generated<boolean>;
    weight: number | null;
    goal_weight: number | null;
    height: number | null;
    status: Generated<boolean>;
};
export type UserAuthToken = {
    id: Generated<string>;
    user_id: string;
    /**
     * @zod.string.max(500)
     */
    token: string;
    issued_at: Timestamp;
    expire_at: Timestamp;
    created_at: Generated<Timestamp>;
};
export type UserEmail = {
    id: Generated<string>;
    user_id: string | null;
    is_created: Generated<boolean>;
    /**
     * @zod.string.max(256)
     */
    email: string;
    status: Generated<boolean>;
};
export type UserEmailOtp = {
    id: Generated<string>;
    email_id: string;
    otp: number;
    expire_at: Timestamp;
    resend_expire_at: Timestamp;
    created_at: Generated<Timestamp>;
    updated_at: Generated<Timestamp>;
};
export type UserRefreshToken = {
    id: Generated<string>;
    user_id: string;
    /**
     * @zod.string.max(500)
     */
    token: string;
    issued_at: Timestamp;
    expire_at: Timestamp;
    created_at: Generated<Timestamp>;
};
export type UserRole = {
    id: Generated<string>;
    user_id: string;
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
    UserAuthToken: UserAuthToken;
    UserEmail: UserEmail;
    UserEmailOtp: UserEmailOtp;
    UserRefreshToken: UserRefreshToken;
    UserRole: UserRole;
};
