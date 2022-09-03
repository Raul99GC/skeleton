//* Dependencias
const express = require('express')
const passport = require('passport')
const { verbMiddleware } = require('./middleware/ejemplos/verb')
require('./middleware/auth.middleware')(passport)
const path = require('path')

const {db} = require('./utils/database')

//*Archivos de rutas
const userRouter = require('./users/users.router').router
const authRouter = require('./auth/auth.router').router

//* Configuraciones iniciales
const app = express()

db.authenticate()
    .then(() => console.log('database authenticate'))
    .catch((err) => console.log(err))

db.sync()
    .then(() => console.log('Database synced'))
    .catch((err) => console.log(err))

//? Esta configuracion es para habilitar el req.body
app.use(express.json())

app.get('/', verbMiddleware, (req, res) => {
    console.log(req)
    res.status(200).json({message: 'All ok!'})
})

app.use('/api/v1/users', userRouter)
app.use('/api/v1/auth', authRouter)

app.get('/api/v1/uploads/:imgName', (req, res) => {
    const imgName = req.params.imgName
    res.status(200).sendFile(path.resolve('uploads/') + '/' +imgName)
})


app.get('/ejemplo', passport.authenticate('jwt', {session: false}),
    (req, res ) => {
    res.status(200).json({message: 'felicidades, tienes credenciales para entrar aqui', email: req.user.email})
})

app.listen(8000, () => {
    console.log('Server started at port 8000')
})



exports.default = app
module.exports = app
exports.app = app