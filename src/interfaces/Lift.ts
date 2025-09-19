export default interface Lift {
    id: number;
    name: string;
    brand: string;
    categoryId: number;
    fuelId: number;
    dailyPrice: number;
    startFee: number;
    maxHeight: number;
    maxWeight: number;
    platformSize: string;
    description: string;
}