import add from './add.ts'


describe('add', () => {

    it('should add 2 numbers', () => {

        expect(add(1, 2)).toBe(3)
    })
})
