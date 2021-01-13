const mongoose = require('mongoose');

// Define model schema
const pinsModelSchema = mongoose.Schema({
  board: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'BoardModel',
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserModel',
  },
  source: String,
  urlImage: String,
  name: String,
  description: String,
});

// Compile model from schema
const Pin = mongoose.model('PinModel', pinsModelSchema);

const create = (pin) => {
  Pin.create(pin, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created Docs : ', docs);
    }
  });
};

const get = async (id) => {
  let query = { _id: id };
  return await Pin.findOne(query);
};

const all = async () => {
  return await Pin.find().populate('author', 'board');
};

const remove = (id) => {
  let query = { _id: id };
  Pin.deleteOne(query, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted Doc : ', docs);
    }
  });
};

const update = (id, updatepin) => {
  let query = { _id: id };
  Pin.updateOne(query, updatepin, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Updated Docs : ', docs);
    }
  });
};

const getByAuthor = async (author) => {
  let query = { author: author };
  return await Pin.find(query);
};

const getByBoard = async (board) => {
  let query = { board: board };
  return await Pin.find(query);
};

module.exports = {
  create,
  update,
  remove,
  get,
  all,
  getByAuthor,
  getByBoard,
};
