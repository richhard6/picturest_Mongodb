const persimon = require('../../utils/persimon');
const db = persimon('/assets/users.json'); // Relative to the project root
const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { email, password } = req.body;
    const user = db.all().find(u => { return u.email === email && u.password === password} )
    if (user)
    {
      const token = jwt.sign({email: email, role: 'admin'}, process.env.TOKEN_SECRET);
      res.json(token);
    } 
    else {
      res.status(401).send("Username or password incorrect");
    }
};

module.exports = {
  login
};
