const persimon = require('../../utils/persimon');
const db = persimon('/assets/users.json'); // Relative to the project root
const userModel = require('./users.model')

const getAll = (req, res) => {
  const users = db.all();
  return res.status(200).json(users);
};

const getOne = async (req, res) => {
  //const user = db.get(req.params.id);
  const user = await userModel.get(req.params.id);
  if (user) {
    console.log('USER', user);
    return res.status(200).json(user);
  }
  return res.status(404).end();
};

const create = (req, res) => {
  const newuser = req.body;
  //const usersUpdated = db.create(newuser);
  const usersUpdated = userModel.create(newuser);
  return res.status(201).json(usersUpdated);
};

const update = (req, res) => {
  const updateduser = req.body;
  const usersUpdated = db.update(req.params.id, updateduser);
  return res.status(200).json(usersUpdated);
};

const remove = (req, res) => {
  const usersWithoutTheDeleted = db.delete(req.params.id);
  return res.status(200).json(usersWithoutTheDeleted);
};

module.exports = {
  create,
  update,
  getAll,
  getOne,
  remove,
};
