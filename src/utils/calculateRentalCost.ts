export function calculateRentalCost(
    startDate: string | Date, 
    endDate: string | Date, 
    dailyPrice: number, 
    startFee: number
): number {
    if (!startDate || !endDate) return 0;
    
    const fromDate = new Date(startDate).getTime();
    const toDate = new Date(endDate).getTime();
    const daysOfRental = Math.ceil((toDate - fromDate) / (1000 * 3600 * 24)) + 1;
    
    return (daysOfRental * dailyPrice) + startFee;
}