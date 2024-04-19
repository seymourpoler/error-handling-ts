describe('Exercise4', () => {
    test('filtering', () => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        const greaterThan5Numbers = numbers.filter(isGreaterThan5)
        const evenNumbers = numbers.filter(isEven)
        const oddNumbers = numbers.filter(isOdd)

        expect(greaterThan5Numbers).toEqual([6, 7, 8, 9, 10])
        expect(evenNumbers).toEqual([2, 4, 6, 8, 10])
        expect(oddNumbers).toEqual([1, 3, 5, 7, 9])
    })
    test('currying', () => {
        const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

        const greaterThan5Numbers = numbers.filter(isGreaterThan(5))
        const divisibleBy3Numbers = numbers.filter(isDivisibleBy(3))

        expect(greaterThan5Numbers).toEqual([6, 7, 8, 9, 10])
        expect(divisibleBy3Numbers).toEqual([3, 6, 9])
    })
})

function isGreaterThan5(value: number) {
    return value > 5
}

function isEven(value: number) {
    return value % 2 === 0
}

function isOdd(value: number) {
    return value % 2 !== 0
}

function isGreaterThan(value: number) {
    return (otherValue: number) => otherValue > value
}

function isDivisibleBy(value: number) {
    return (otherValue: number) => otherValue % value === 0
}
