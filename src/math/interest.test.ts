import { calculateInterest } from './interest'


test('Calc total fine', () => {
    expect(
        calculateInterest(1000, 1)
    ).toBeCloseTo(0.3)

    expect(
        calculateInterest(1000, 30)
    ).toBeCloseTo(10)

    expect(
        calculateInterest(100, -5)
    ).toEqual(0)
})
