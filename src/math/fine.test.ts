import { calculateFine } from './fine'


test('Calc total fine', () => {
    expect(
        calculateFine(100)
    ).toEqual(100*0.02)

    expect(
        calculateFine(-15)
    ).toEqual(0)
})