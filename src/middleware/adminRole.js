
const roleAdminMiddleWare = (req, res, next ) => {
    const rol = req.user.rol 

    if (rol === 'admin' ) {
        next()
    } else {
        res.status(401).json({status: 'error', message: 'User not autorized to make this request'})
    }
}

module.exports.roleAdminMiddleWare= roleAdminMiddleWare