export interface RestaurantTable {
    id: number;
    tableNumber: string;
    isOccupied: boolean;
    isReserved: boolean;
    reserrvationTime: Date | null;
}