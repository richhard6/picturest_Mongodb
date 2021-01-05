// 💯 Boards with pin counter: Add the pins DB also here

//Hay que hacer un metodo que te devuelva solo las tres primeras imagenes de pines de cada board, quiza se podria
//slicear desde el front end con el metodo de getAll.  ⭐️⭐️⭐️⭐️⭐️⭐️ slice 0,2 y filtrar solo las urls img de lo devuelto.
//Hay que contar tambien cuantos pines hay x board. ⭐️⭐️⭐️⭐️⭐️⭐️

//El Board de todos los pines facilmente se podria hacer desde el front con un Fetch a api/users/userid/pins. ❗️❗️❗️❗️

const boardModel = require('./boards.model');

const e = require('cors');

// 💯 Boards with pin counter: We need to define the logic that adds the referenced
// pins to each board and counts them.
// 💯 Boards with first 3 images: We need to define the logic that adds the first
// 3 referenced pins to each board.

const getAll = async (req, res) => {
  const boards = await boardModel.all();

  return res.status(200).json(boards);
};

// 💯 Boards of a single user: we need to add a new controller method
// and bind it to a user route -> UserRouter.js --> board controller method
// this method is called under /users/{userId}/boards
const getAllOfUser = async (req, res) => {
  const userId = req.params.userId;

  const filteredBoards = await boardModel.getByAuthor(userId);
  // 💯 Pins of a single user: the param userId is passed as a String and we need an integer:
  // console.log(userId);
  // const filteredPins = pins.filter((pin) => {
  //   pin.author === userId; //REVISAR REVISAR REvISAR
  // });

  return res.status(200).json(filteredBoards);
};

const getOne = async (req, res) => {
  const board = await boardModel.get(req.params.id);
  if (board) {
    return res.status(200).json(board);
  }
  return res.status(404).end();
};

const create = (req, res) => {
  const newBoard = req.body;
  const boardsUpdated = boardModel.create(newBoard);

  return res.status(201).json(boardsUpdated);
};

const update = (req, res) => {
  const updatedBoard = req.body;

  const boardsUpdated = boardModel.update(req.params.id, updatedBoard);

  return res.status(200).json(boardsUpdated);
};

const remove = (req, res) => {
  const boardsWithoutTheDeleted = boardModel.remove(req.params.id);

  return res.status(200).json(boardsWithoutTheDeleted);
};

module.exports = {
  create,
  update,
  getAll,
  getAllOfUser,
  getOne,
  remove,
};
