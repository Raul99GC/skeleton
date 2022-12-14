const router = require('express').Router()
const passport = require('passport')
const { roleAdminMiddleWare } = require('../middleware/adminRole')
const { upload } = require('../utils/multer')
require('../middleware/auth.middleware')(passport)

const userServices = require('./users.http')

router.route('/') //* /api/v1/users/
    .get(userServices.getAll)


router.route('/me')
    .put(passport.authenticate('jwt', {session: false}), userServices.editMyUser)
    .get(passport.authenticate('jwt', {session: false}), userServices.getMyUser)
    .delete(passport.authenticate('jwt', {session: false}), userServices.removeMyUser)


router.route('/me/profile-img')
    .post(passport.authenticate('jwt', {session: false}), upload.single('profile_img'), userServices.postProfileImg)
    // .get()



router.route('/:id')
    .get(passport.authenticate('jwt', {session: false}), userServices.getById)
    .delete(passport.authenticate('jwt', {session: false}), roleAdminMiddleWare, userServices.remove)
    .put(passport.authenticate('jwt', {session: false}), roleAdminMiddleWare, userServices.edit)


exports.router = router