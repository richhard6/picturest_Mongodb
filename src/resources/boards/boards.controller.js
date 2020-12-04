const persimon = require('../../utils/persimon');
const db = persimon('/assets/boards.json'); // Relative to the project root

const getAll = (req, res) => {
  const boards = db.all();
  return res.status(200).json(boards);
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
  getOne,
  remove,
};
