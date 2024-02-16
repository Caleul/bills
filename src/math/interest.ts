export function calculateInterest(originalAmount: number, dateDiffInDays: number): number {
    if (dateDiffInDays < 0) {
        return 0
    }
    const totalFees = 0.00033 * dateDiffInDays * originalAmount
    return totalFees
}