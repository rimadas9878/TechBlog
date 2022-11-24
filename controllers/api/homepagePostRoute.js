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
      logged_in: req.session.logged_in
    })
  }
  catch(err){
    res.status(500).json(err);
  }
});

module.exports = router