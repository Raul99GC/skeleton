//* Dependencias
const express = require('express')
const passport = require('passport')
const { verbMiddleware } = require('./middleware/ejemplos/verb')
require('./middleware/auth.middleware')(passport)

//*Archivos de rutas
const userRouter = require('./users/users.router').router
const authRouter = require('./auth/auth.router').router

//* Configuraciones iniciales
const app = express()

//? Esta configuracion es para habilitar el req.body
app.use(express.json())

app.get('/', verbMiddleware, (req, res) => {
    res.status(200).json({message: 'All ok!'})
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

app.get('/ejemplo', 
    passport.authenticate('jwt', {session: false}),
    (req, res ) => {
    res.status(200).json({message: 'felicidades, tienes credenciales para entrar aqui', email: req.user.email})
})

app.listen(8000, () => {
    console.log('Server started at port 8000')
})



exports.default = app
module.exports = app
exports.app = app