const { assert } = require('chai')
const {describe, it} = require('mocha')


const sum = (a, b) => {
    const newA = Number(a)
    const newB = Number(b)
    if(newA !== a || newB !== b) {
        return 'error'
    } else {
        return a+ b
    }
}

describe('test Unitario de mis usuarios', () => {
    it('Deberia retornar 8', (none) => {
        const miFuncionjEjecutada = sum(6, 2)
        assert.equal(miFuncionjEjecutada, 8, 'Ups no es 8')
        done()
    })
})