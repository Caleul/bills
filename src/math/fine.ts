export function calculateFine(originalAmount: number): number {
    if (originalAmount < 0) {
        return 0
    }
    const totalFine = 0.02 * originalAmount
    return Number(totalFine.toFixed(2))
}