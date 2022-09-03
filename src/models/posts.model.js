/*
{ 
    "id": "74cd6011-7e76-4d6d-b25b-1d6e4182ec2f",
    "first_name": "Sahid",
    "last_name": "Kick",
    "email": "sahid.kick@academlo.com",
    "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
    "phone": "1234567890",
    "birthday_date": "22/10/2000",
    "rol": "admin",
    "profile_image": "",
    "country": "mexico",
    "is_active": true,
    "verified": false
}
*/

const { DataTypes } = require("sequelize");

const { db } = require("../utils/database");

const Posts = db.define("posts", {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  content: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
  },
  status: {
    type: DataTypes.STRING,
    defaultValue: "active",
  },
});

module.exports = Posts;
