import { DishInOrder } from './dish-in-order.model';
import { DishWithCategoryName } from './dish-with-category-name.model';

export interface Order {
  id: number;
  tableNumber: string;
  waiterId: number;
  dishes: DishInOrder[];
  price: number;
  quantity: number;
  specialRequest: string;
  orderStartTime: Date;
  orderEndTime: Date;
  served: boolean;
  paid: boolean;
}
