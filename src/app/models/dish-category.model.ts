import { Dish } from "./dish.model";

export interface DishCategory {
    id: number;
    name: string;
    isEnabled: boolean;
    position: number;
    dish: Dish[];
}