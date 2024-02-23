import { dateDifferenceInDays } from './dateDifference'

test('Calc date difference in days', () => {
    expect(
        dateDifferenceInDays('2024-01-05', '2024-01-05')
    ).toEqual(0)

    expect(
        dateDifferenceInDays('2024-01-15', '2024-01-05')
    ).toEqual(0)

    expect(
        dateDifferenceInDays('2024-01-05', '2024-01-15')
    ).toEqual(10)

    expect(
        dateDifferenceInDays('2024-41-45', '2024-01-15')
    ).toEqual(0)
})