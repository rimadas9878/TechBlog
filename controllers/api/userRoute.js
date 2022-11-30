const router = require('express').Router();
const { User,Post } = require('../../models');

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
console.log("user", user)
    if (!validPassword) {
      console.log("validPassword")
      res.status(400).json({ message: 'No user account found!' });
      return;
    }

    req.session.save(() => {
      req.session.userId = user.id;
      req.session.username = user.username;
      req.session.logged_in = true;

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
        req.session.logged_in = true;
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
    if (req.session.logged_in) {
      req.session.destroy(() => {
        res.status(204).end();
      });
    } else {
      res.status(404).end();
    }
  });

  router.get('/dashboard', async (req, res) => {
    try{
      const home_Content = await Post.findAll({
        attributes: ["id", "title", "createdDate"],
        where: {userId:req.session.userId},
        include:{
          model: User,
          attributes:["username"]
        }
      }
      )
      const posts = home_Content.map(post => post.get({plain: true}));
       console.log("dashboard",posts)
      res.render("dashboard", {
        posts,
        logged_in: req.session.logged_in
      })
    }
    catch(err){
      console.log("err",err)
      res.status(500).json(err);
    }
  })
  
  module.exports = router;
  