const User = require("../models/user-model");
const { ctrlWrapper } = require("../helpers");

// Add new user
async function addUser(req, res) {}

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
