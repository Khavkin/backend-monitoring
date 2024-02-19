const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const { User } = require("../models/user-model");
const { ctrlWrapper, HttpError } = require("../helpers");

// Add new user
async function addUser(req, res) {
  //console.log(req.body);
  const { login, password, fullname, phone, isAdmin, email, isBlocked, isMustChangePassword } =
    req.body;

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

  console.log(user);
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
async function login(req, res) {}

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
