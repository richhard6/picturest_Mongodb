const mongoose = require('mongoose');

// Define model schema
const userModelSchema = mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  password: String,
  username: String,
  following: Array,
});

// Compile model from schema
const User = mongoose.model('UserModel', userModelSchema);

const create = (user) => {
  User.create(user, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Created Docs : ', docs);
    }
  });
};

const get = async (id) => {
  let query = { _id: id };
  return await User.findOne(query);
};

const all = async () => {
  return await User.find();
};

const remove = (id) => {
  let query = { _id: id };
  User.deleteOne(query, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Deleted Doc : ', docs);
    }
  });
};

const update = (id, updateduser) => {
  let query = { _id: id };
  User.updateOne(query, updateduser, function (err, docs) {
    if (err) {
      console.log(err);
    } else {
      console.log('Updated Docs : ', docs);
    }
  });
};

const getByEmail = async (email) => {
  let query = { email: email };
  return await User.findOne(query);
};

module.exports = {
  create,
  update,
  remove,
  get,
  all,
  getByEmail,
};
