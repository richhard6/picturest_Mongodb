const persimon = require('../../utils/persimon');
const db = persimon('/assets/users.json'); // Relative to the project root

const userModel = require('./users.model');

const getAll = async (req, res) => {
  const users = await userModel.all();
  return res.status(200).json(users);
};

const getOne = async (req, res) => {
  const user = await userModel.get(req.params.id);
  if (user) {
    console.log('USER', user);
    return res.status(200).json(user);
  }
  return res.status(404).end();
};

const create = (req, res) => {
  const newuser = req.body;
  const usersUpdated = userModel.create(newuser);
  return res.status(201).json(usersUpdated);
};

const update = (req, res) => {
  const updateduser = req.body;
  const usersUpdated = userModel.update(req.params.id, updateduser);
  return res.status(200).json(usersUpdated);
};

const remove = (req, res) => {
  const usersWithoutTheDeleted = userModel.remove(req.params.id);
  return res.status(200).json(usersWithoutTheDeleted);
};

module.exports = {
  create,
  update,
  getAll,
  getOne,
  remove,
};
