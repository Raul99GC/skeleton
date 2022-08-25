const userControllers = require("./users.controllers");

const getAll = (req, res) => {
  const data = userControllers.getAllUsers();
  return res.status(200).json({
    items: data.length,
    users: data
  });
};

const getById = (req, res) => {
  const id = req.params.id;
  const data = userControllers.getUserById(id);

  if (data) {
    return res.status(200).json(data);
  } else {
    return res.status(404).json({
      message: `El usuario con el id ${id} no existe`
    });
  }
};
/*
{
    id: 2,
    first_name: 'Sahid',
    last_name: 'Kick',
    email: 'sahid.kick@academlo.com,
    password: 'root',
    phone: '1234567890'
    birthday_date: '22/10/2000',
    rol: "normal", 
    profile_image: "",
    country: 'mexico'
    is_active: true,
    verified: false, 
  }*/
/*
{
    id: 2,
    firstName: 'Sahid',
    lastName: 'Kick',
    email: 'sahid.kick@academlo.com,
    password: 'root',
    phone: '1234567890'
    birthdayDate: '22/10/2000',
    rol: "normal", 
    profileImage: "",
    country: 'mexico'
    is_active: true,
    verified: false, 
  }*/

const register = (req, res) => {
  const data = req.body;
  if (!data) {
    return res.status(400).json({
      message: "Missing Data"
    });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.password ||
    !data.birthday_date ||
    !data.country
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        password: "string",
        birthday_date: "DD/MM/YYYY",
        country: "string",
      },
    });
  } else {
    const response = userControllers.createUser(data);
    return res
      .status(201)
      .json({
        message: `User created succesfully with id: ${response.id}`,
        user: response,
      });
  }
};

const remove = (req, res) => {
  const id = req.params.id;
  const data = userControllers.deleteUser(id);
  console.log(id)

  if (data) {
    return res.status(204).json();
  } else {
    return res.status(400).json({
      message: "Invalid ID"
    });
  }
};

// * es para el admin
const edit = (req, res) => {
  const id = req.params.id;
  const data = req.body;
  if (!Object.keys(data).length) {
    return res.status(400).json({
      message: "Missing Data"
    });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.phone ||
    !data.rol ||
    !data.profile_image ||
    !data.birthday_date ||
    !data.country ||
    !data.is_active
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        password: "string",
        phone: "+521231231230",
        rol: "normal",
        profile_image: "example.com/img/example.png",
        birthday_date: "DD/MM/YYYY",
        country: "string",
        is_active: true
      },
    });
  } else {
    const response = userControllers.editUser(id, data)
    return res.status(200).json({
      message: 'User edited succesfully',
      user: response
    })
  }
};

const getMyUser = (req, res) => {
  const id = req.user.id;
  const data = userControllers.getUserById(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.status(404).json({
      message: `El usuario con el id ${id} no existe`
    });
  }
}


const editMyUser = (req, res) => {
  const id = req.user.id
  const data = req.body

  if (!Object.keys(data).length) {
    return res.status(400).json({
      message: "Missing Data"
    });
  } else if (
    !data.first_name ||
    !data.last_name ||
    !data.email ||
    !data.phone ||
    !data.profile_image ||
    !data.birthday_date ||
    !data.country ||
    !data.is_active
  ) {
    return res.status(400).json({
      message: "All fields must be completed",
      fields: {
        first_name: "string",
        last_name: "string",
        email: "examle@examle.com",
        password: "string",
        phone: "+521231231230",
        rol: "normal",
        profile_image: "example.com/img/example.png",
        birthday_date: "DD/MM/YYYY",
        country: "string",
        is_active: true
      },
    });
  } else {
    const response = userControllers.editUser(id, data)
    return res.status(200).json({
      message: 'User edited succesfully',
      user: response
    })
  }

}

const removeMyUser = (req, res) => {
  const id = req.user.id
  const data = userControllers.deleteUser(id);

  if(data) {
    return res.status(204)
  } else {
    return res.status(400).json({message: 'Invalid ID 1'}) 
  }

}




module.exports = {
  getAll,
  getById,
  register,
  remove,
  edit,
  getMyUser,
  editMyUser,
  removeMyUser
};