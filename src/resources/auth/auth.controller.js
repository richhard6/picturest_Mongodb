const persimon = require('../../utils/persimon');
const db = persimon('/assets/users.json'); // Relative to the project root
const jwt = require('jsonwebtoken');

const userModel = require('../users/users.model');

const login = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body); //me devueleve perfectamente lo que le mando como request, pero nunca encuentra
  const user = await userModel.getByEmail(email);
  if (user.password === password) {
    const token = jwt.sign(
      { email: email, role: 'admin' },
      process.env.TOKEN_SECRET
    );
    res.json({ token: token, user: user });
  } else {
    res.status(401).send('Username or password incorrect');
  }
};

const login2 = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.login(email, password);

    if (user) {
      const token = jwt.sign(
        { email: email, role: 'admin' },
        process.env.TOKEN_SECRET
      );
      res.json({ token: token, user: user });
    }
  } catch (err) {
    res.status(400).json({});
  }
};

module.exports = {
  login,
  login2,
};
