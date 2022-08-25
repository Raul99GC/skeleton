const {
    assert
} = require('chai')
const {
    describe,
    it
} = require('mocha')

const usersControllers = require('../users.controllers')

// ? aqui se checan los controllers

describe('test Unitario de mis usuarios', () => {

    it('Should return new user when I sent correct data', (done) => {
        const body = {
            "first_name": "Usuario de test",
            "last_name": "tester",
            "email": "test@academlo.com",
            "password": "1234",
            "phone": "1234567890",
            "country": "mexico",
            "birthday_date": "22/10/2000",
        }
        const data = usersControllers.createUser(body)
        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, '')
        done()
    })

    it('Should return new user when I sent correct data with optional inputs', (done) => {
        const body = {
            "first_name": "Usuario de test",
            "last_name": "tester",
            "email": "test@academlo.com",
            "password": "1234",
            "phone": "1234567890",
            "country": "mexico",
            "birthday_date": "22/10/2000",
            "profile_image": "asd"
        }
        const data = usersControllers.createUser(body)
        assert.equal(data.first_name, body.first_name)
        assert.equal(data.rol, 'normal')
        assert.notEqual(data.password, body.password)
        assert.equal(data.profile_image, 'asd')
        assert.typeOf(data.id, 'string')
        assert.property(data, 'is_active')
        done()
    })

    it('Should return the user with when I sent a correct ID', (done) => {
        const data = usersControllers.getUserByEmail('sahid.kick@academlo.com')
        assert.property(data, 'id')
        assert.property(data, 'email')
        assert.property(data, 'first_name')
        assert.property(data, 'last_name')
        assert.property(data, 'is_active')
        assert.equal(data.rol, 'admin')
        assert.equal(data.email,'sahid.kick@academlo.com')
        assert.equal(data.is_active, true)
        assert.typeOf(data.is_active, 'boolean')

        done()

    })

    it('Should return an error when I sent an invalid ID', (done) => {
        const data = usersControllers.getUserById(1)

        assert.typeOf(data, 'boolean')
        assert.equal(data, false)
        done()
    })

})