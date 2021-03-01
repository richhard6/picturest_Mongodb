const mongoose = require('mongoose');

const bcrypt = require('bcrypt');

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

// userModelSchema.pre('save', async function (next) {
//   //antes de cada save, se ejecuta esto, ,por esto el pre.
//   const salt = await bcrypt.genSalt();
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

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

const login = async (email, password) => {
  //buscador de correos y comparador de password normal con la encryptada.
  const user = await User.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error('incorrect password');
  }
  throw Error('incorrect email');
};

module.exports = {
  create,
  update,
  remove,
  get,
  all,
  getByEmail,
  login,
};
