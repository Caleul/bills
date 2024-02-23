export function dateDifferenceInDays(startDate: string, endDate: string): number {

    const start = new Date(startDate)
    const end = new Date(endDate)

    if (start.toString() === 'Invalid Date' || end.toString() === 'Invalid Date') {
        return 0
    }

    let diffInMs = end.getTime() - start.getTime()

    if (diffInMs < 0) {
        return 0
    }

    return Math.floor(diffInMs / (1000 * 60 * 60 * 24))
}
  