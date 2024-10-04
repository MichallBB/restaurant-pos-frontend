import { Dish } from "./dish.model";

export interface DishInOrder {
    id: number;
    served: boolean;    
    cooked: boolean;
    dish: Dish;
}