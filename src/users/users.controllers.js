const uuid = require("uuid");
const { hashPassword } = require("../utils/crypt");

const Users = require('../models/user.model');
const { where } = require("sequelize/types");

const userDB = [{ 
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
},
{
  "id": "9cc4a692-9cfa-4408-ae4b-74e2df27d643",
  "first_name": "Raul",
  "last_name": "Kick",
  "email": "raul@academlo.com",
  "password": "$2b$10$TNGcRFonQH98rVqFaBVfpOEEv2Xcu5ej14tWqKim3z3L6Tr.ZIaqC",
  "phone": "1234567890",
  "birthday_date": "22/10/2000",
  "rol": "normal",
  "profile_image": "",
  "country": "mexico",
  "is_active": true,
  "verified": false
}];

const getAllUsers = async () => {

  const data= await Users.findAll({
    attributes: {
      exclude: ['password']
    }
  })
  return data;
  //? select * from users;
};

const getUserById = async(id) => {
  
  const data = await Users.findOne({
    where: {
      id
    },
    attributes: {
      exclude: ['password']
    }
  })
  return data
  //? select * from users where id = ${id};
};


const createUser = async (data) => {
  
  /* const newUser = await Users.create(
    {
      id: uuid.v4(), 
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashPassword(data.password), 
      phone: data.phone ? data.phone : "", 
      birthday_date: data.birthday_date, 
      role: "normal", 
      profile_image: data.profile_image,
      country: data.country, 
      is_active: true, 
      verified: false,
    }) */

    const newUser = await Users.create({
      ...data,
      id: uuid.v4(),
      password: hashPassword(data.password), 
      role: "normal",
      is_active: true,
      verified: false,
    })

    return newUser
};

const editUser = async (userId, data, userRol) => {
  
  if(userRol === 'admin') {
    const {id, password, verified, ...newData} = data
    const response = await Users.update({
      ...newData,
      id,
    }, {
      where: {
        id: userId
      }
    })
    return response
  } else {
    const {id, password, verified, role, ...newData} = data
    const response = await Users.update({
      ...newData,
      id,
    }, {
      where: {
        id: userId
      }
    })
    return response
  }


  /*
  if (index !== -1) {
    userDB[index] = {
      id: id,
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: userDB[index].password,
      phone: data.phone, //unico
      birthday_date: data.birthday_date,
      role: data.rol,
      profile_image: data.profile_image,
      country: data.country,
      is_active: data.is_active,
      verified: false,
    };
    return userDB[index];
  } else {
    return createUser(data);
  } */
};

const deleteUser = async (id) => {
  const data = await Users.destroy({
    where: {
      id
    }
  })
  return data
} 

const getUserByEmail = async (email) => {
  const data = await Users.findOne({
    where: {
      email
    },
    attributes: {
      exclude: ['password']
    }
  })
  return data
}

const editProfileImg = async (userID, imgUrl) => {
  const response = await Users.update({
    image_url: imgUrl
  }, {
    where: {
      id: userID
    }
  })
  return response
}


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
  getUserByEmail,
  editProfileImg
}

