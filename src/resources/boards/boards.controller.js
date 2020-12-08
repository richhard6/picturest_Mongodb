const persimon = require('../../utils/persimon');
const db = persimon('/assets/boards.json'); // Relative to the project root
// 💯 Boards with pin counter: Add the pins DB also here
const pinsDb = persimon('/assets/pins.json'); // Relative to the project root

// 💯 Boards with pin counter: We need to define the logic that adds the referenced
// pins to each board and counts them.
// 💯 Boards with first 3 images: We need to define the logic that adds the first
// 3 referenced pins to each board.
const addReferencedPins = (boards) => {
  const pins = pinsDb.all();
  // 💯 Boards with pin counter: We iterate all the boards
  const boardsWithPinsReferences = boards.map((board) => {
    // 💯 Boards with pin counter: For each we search the pins with the board id
    const pinsOfTheBoard = pins.filter((pin) => pin.board === board.id);
    return {
      ...board,
      // 💯 Boards with pin counter:
      numberOfPins: pinsOfTheBoard.length,
      // 💯 Boards with first 3 images:
      firstPins: pinsOfTheBoard.slice(0, 3),
    };
  });
  return boardsWithPinsReferences;
};

const getAll = (req, res) => {
  const boards = db.all();
  const boardsWithPinsReferences = addReferencedPins(boards);
  return res.status(200).json(boardsWithPinsReferences);
};

// 💯 Boards of a single user: we need to add a new controller method
// and bind it to a user route -> UserRouter.js --> board controller method
// this method is called under /users/{userId}/boards
const getAllOfUser = (req, res) => {
  const boards = db.all();
  // 💯 Boards of a single user: the param userId is passed as a String and we need an integer:
  const userId = parseInt(req.params.userId);
  const filteredBoards = boards.filter((board) => board.author === userId);
  return res.status(200).json(filteredBoards);
};

const getOne = (req, res) => {
  const board = db.get(req.params.id);
  if (board) {
    return res.status(200).json(board);
  }
  return res.status(404).end();
};

const create = (req, res) => {
  const newBoard = req.body;
  const boardsUpdated = db.create(newBoard);
  return res.status(201).json(boardsUpdated);
};

const update = (req, res) => {
  const updatedBoard = req.body;
  const boardsUpdated = db.update(req.params.id, updatedBoard);
  return res.status(200).json(boardsUpdated);
};

const remove = (req, res) => {
  const boardsWithoutTheDeleted = db.delete(req.params.id);
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
