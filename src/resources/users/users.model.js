const mongoose = require('mongoose');

// Define model schema
const userModelSchema = mongoose.Schema({
  id: Number,
  firstName: String,
  lastName: String,
  email: String,
  avatar: String,
  password: String,
  username: String,
  following: []
});

// Compile model from schema
const User = mongoose.model('UserModel', userModelSchema );

const create = (user) => {
  User.create(user, function (err, docs) {
    if (err){ 
      console.log(err) 
    }
    else{ 
      console.log("Created Docs : ", docs); 
    }
  });
};

const get = async(id) => {
  let query = { 'id': id };
  return await User.findOne(query);
};

const all = async() => {
  return await User.find();
}

const remove = (id) => {
  let query = { 'id': id };
  User.deleteOne(
    query,
    function (err, docs) { 
      if (err){ 
        console.log(err) 
      }
      else{ 
        console.log("Deleted Doc : ", docs);
      }
  }); 
};

const update = (id, updateduser) => {
  let query = { 'id': id };
  User.updateOne(
    query,
    updateduser, 
    function (err, docs) { 
      if (err){ 
        console.log(err) 
      }
      else{ 
        console.log("Updated Docs : ", docs); 
      }
  }); 
};

module.exports = {
    create,
    update,
    remove,
    get,
    all
  };