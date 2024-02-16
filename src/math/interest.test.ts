import { calculateInterest } from './interest'


test('Calc total fine', () => {
    expect(
        calculateInterest(100, 1)
    ).toEqual(0.00033 * 100)

    expect(
        calculateInterest(100, 5000)
    ).toEqual(0.00033 * 100 * 5000)

    expect(
        calculateInterest(100, -5)
    ).toEqual(0)
})