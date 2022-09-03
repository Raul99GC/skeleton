const Users = require('./user.model')
const Posts = require('./posts.model')

const initModel = () => {
    // ? Users 1 : n Posts
    Users.hasMany(Posts)
    Posts.belongsTo(Users)
}

module.exports = initModel