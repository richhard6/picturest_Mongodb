const persimon = require('../../utils/persimon');
const db = persimon('/assets/pins.json'); // Relative to the project root

const pinModel = require('./pins.model');

/////////////////////////////////////////////////////////

const getAll = async (req, res) => {
  const pins = await pinModel.all();
  return res.status(200).json(pins);
};

const getOne = async (req, res) => {
  const pin = await pinModel.get(req.params.id);
  if (pin) {
    console.log('PIN', pin);
    return res.status(200).json(pin);
  }
  return res.status(404).end();
};

// 💯 Pins of a single user: we need to add a new controller method
// and bind it to a user route -> UserRouter.js --> pins controller method
// this method is called under /users/{userId}/pins
const getAllOfUser = async (req, res) => {
  const userId = req.params.userId;

  const filteredPins = await pinModel.getByAuthor(userId);
  // 💯 Pins of a single user: the param userId is passed as a String and we need an integer:
  // console.log(userId);
  // const filteredPins = pins.filter((pin) => {
  //   pin.author === userId; //REVISAR REVISAR REvISAR
  // });

  return res.status(200).json(filteredPins);
};

const create = (req, res) => {
  const newPin = req.body;
  const pinsUpdated = pinModel.create(newPin);
  return res.status(201).json(pinsUpdated);
};

const update = (req, res) => {
  const updatedpin = req.body;
  const pinsUpdated = pinModel.update(req.params.id, updatedpin);
  return res.status(200).json(pinsUpdated);
};

const remove = (req, res) => {
  const pinsWithoutTheDeleted = pinModel.remove(req.params.id);
  return res.status(200).json(pinsWithoutTheDeleted);
};

const getPinsOfBoard = async (req, res) => {
  const boardId = req.params.boardId;
  const filteredPins = await pinModel.getByBoard(boardId);
  return res.status(200).json(filteredPins);
};

module.exports = {
  create,
  update,
  getAll,
  getAllOfUser,
  getOne,
  remove,
  getPinsOfBoard,
};
