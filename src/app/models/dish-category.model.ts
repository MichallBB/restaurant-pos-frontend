import { Dish } from "./dish.model";

export interface DishCategory {
    id: number;
    name: string;
    position: number;
    dishes: Dish[];
}