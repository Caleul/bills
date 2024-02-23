import { calculateInterest } from './interest'


test('Calc total fine', () => {
    expect(
        calculateInterest(1000, 1)
    ).toBeCloseTo(0.33)

    expect(
        calculateInterest(1000, 30)
    ).toBeCloseTo(9.95)

    expect(
        calculateInterest(100, -5)
    ).toEqual(0)
})