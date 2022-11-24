const router = require('express').Router();
const { User, Post, Comment } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('./commentRoute');

       
 router.get('/', async (req, res) => {
     try{
      if(!req.session.logged_in){
        res.redirect("/login")
      }
      const dashboard_Content = await Post.findAll(
        {
          attributes: ["id", "title","content","createdDate", "userId"],
          where: {
            user_id: req.session.user_id
          }
        }
      )

      const posts = dashboard_Content.map(Post => Post.get({plain : true}));

      res.render("dashboard", {
        posts,
        logged_in: req.session.logged_in
      })
     }
     catch(err){
      res.status(500).json(err)
     }
     
   });

   //get single post
   router.get("/singlePost/:id", async (req,res) => {
    try{
      const post_Content = await Post.findByPk(req.params.id,{
        attribute: ["id", "title","content","createdDate"]
      })

      const singlePost = post_Content.get({plain:true});

      res.render("singlePost", {
        singlePost,
        logged_in: req.session.logged_in
      })
    }
    catch(err){
      res.status(500).json(err)
     }
   })

   //Post into the dashboard
   router.post("/", async (req, res) => {

    const user_id = req.session.user_id;
    const {title, content} = req.body;

    try{
      const newPost = await Post.create({
        title,
        content,
        user_id
      })

      res.status(200).json(newPost)
    }
    catch(err){
      res.status(400).json(err)
    }
   })

   //updating the post
   router.put("/singlePost/:id", async (req,res) => {
    const{title, content} = req.body;

    try{
      const update_Post = await Post.update({
        title,
        content
      },
      {
        where: {
          id: req.params.id
        }
      }
      )
      res.status(200).json(update_Post);
    }
    catch(err){
      res.status(500).json(err)
    }
   })

   //deleting a post
   router.delete("/:id", async (req,res) => {
    try{
      const delete_Post = await Post.destroy({
        where: {
          id: req.params.id
        }
      })
      res.status(200).json(delete_Post);
    }
    catch(err){
      res.status(500).json(err)
    }
   })


   module.exports = router
