const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const jwt = require("jsonwebtoken");

const { User } = require("../models/user-model");
const { ctrlWrapper, HttpError } = require("../helpers");
const { SECRET_KEY } = process.env;

// Add new user
async function addUser(req, res) {
  //console.log(req.body);
  const { login, password, fullname, phone, isAdmin, email, isBlocked, isMustChangePassword } =
    req.body;
  const { isAdmin: authUserIsAdmin } = req.user;

  if (!authUserIsAdmin) {
    throw HttpError(401, "You don't have permissions to add users!");
  }

  // Check for existing login, phone or email
  const existingUser = await User.findOne({
    where: { [Op.or]: [{ login: login }, { email: email }, { phone: phone }] },
  });
  if (existingUser) {
    throw HttpError(409, "Login, email or phone allready in use");
  }

  const hashPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    login,
    password: hashPassword,
    fullname,
    phone,
    isAdmin,
    email,
    isBlocked,
    isMustChangePassword,
  });

  //console.log(user);
  res.status(201).json({ message: "User added succesfully" });
}

//Update user info.
//Run if user have admin rights or current user
async function updateUser(req, res) {}

//Delete user
async function deleteUser(req, res) {}

//Get user
async function getUser(req, res) {}

//Change password
async function changeUserPassword(req, res) {}

//Set user rights
async function setUserRights(req, res) {}

//Login
async function login(req, res) {
  const { login, password } = req.body;

  const user = await User.findOne({
    where: { [Op.or]: [{ login: login }, { email: login }, { phone: login }] },
  });

  console.log(user);

  if (!user) {
    throw HttpError(401, "Authorization error");
  }

  if (user.isBlocked) throw HttpError(401, "User blocked by Admin");

  const passwordCompare = await bcrypt.compare(password, user.password);
  if (!passwordCompare) {
    throw HttpError(401, "Authorization error");
  }

  const payload = { id: user.id };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "23h" });

  await User.update(
    { token },
    {
      where: {
        id: user.id,
      },
    }
  );

  res.json({
    token,
    user: {
      id: user.id,
      fullname: user.fullname,
      email: user.email,
      phone: user.phone,
      isAdmin: user.isAdmin,
      isBlocked: user.isBlocked,
      isMustChangePassword: user.isMustChangePassword,
    },
  });
}

//Logout
async function logout(req, res) {}

module.exports = {
  addUser: ctrlWrapper(addUser),
  updateUser: ctrlWrapper(updateUser),
  getUser: ctrlWrapper(getUser),
  deleteUser: ctrlWrapper(deleteUser),
  setUserRights: ctrlWrapper(setUserRights),
  changeUserPassword: ctrlWrapper(changeUserPassword),
  login: ctrlWrapper(login),
  logout: ctrlWrapper(logout),
};
