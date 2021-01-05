const mongoose = require('mongoose');

// Define model schema
const boardsModelSchema = mongoose.Schema({
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  title: String,
  collaborators: Array,
});

// Compile model from schema
const Board = mongoose.model('BoardModel', boardsModelSchema);

const create = (board) => {
  Board.create(board, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created Docs : ', docs);
    }
  });
};

const get = async (id) => {
  let query = { _id: id };
  return await Board.findOne(query).populate('author'); //['firstName', 'email'] para pedir especifciamete esos datos.
};

const all = async () => {
  return await Board.find().populate('author', 'username');
};

const remove = (id) => {
  let query = { _id: id };
  Board.deleteOne(query, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted Doc : ', docs);
    }
  });
};

const update = (id, updateboard) => {
  let query = { _id: id };
  Board.updateOne(query, updateboard, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Updated Docs : ', docs);
    }
  });
};

const getByAuthor = async (author) => {
  let query = { author: author };
  return await Board.find(query);
};

module.exports = {
  create,
  update,
  remove,
  get,
  all,
  getByAuthor,
};
