const router = require("express").Router();
const { Post, Comment, User } = require("../../models");
const withAuth = require("../../utils/auth");

router.get("/", async (req, res) => {
  try{
    const homepage_Content = await Post.findAll({
      attributes: ["id", "title", "createdDate"],
      include:{
        model: User,
        attributes:["username"]
      }
    }
    )
    const posts = homepage_Content.map(post => post.get({plain: true}));

    res.render("homepage", {
      posts,
      loggedIn: req.session.loggedIn
    })
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router