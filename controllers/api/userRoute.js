const router = require('express').Router();
const { User } = require('../../models');

 // Login
 router.post('/login', async (req, res) => {
  console.log("login route")
  try {
    const user = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    if (!user) {
      console.log("user")
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    const validPassword = user.checkPassword(req.body.password);

    if (!validPassword) {
      console.log("validPassword")
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.loggedIn = true;

      res.json({ user, message: 'You are now logged in!' });
  
    });
  } catch (err) {
    console.log(err)
    res.status(400).json({ message: 'No user account found!' });
  }
});

//Signup
router.post('/', async (req, res) => {
    console.log("POST user",req.body)
    try {
      const newUser = await User.create({
        name: req.body.name,
        username: req.body.username,
        password: req.body.password
      });
  
      req.session.save(() => {
        req.session.userId = newUser.id;
        req.session.name = newUser.name
        req.session.username = newUser.username;
        req.session.loggedIn = true;
        console.log("Post user",newUser)
        //looks for the new user and add to the page
        res.json(newUser);
      });
    } catch (err) {
      console.log(err)
      res.status(500).json(err);
    }
  });

 
  // Logout
  router.post('/logout', (req, res) => {
    if (req.session.loggedIn) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });
  
  module.exports = router;
  