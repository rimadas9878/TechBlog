const router = require('express').Router();
const { Post } = require('../../models');
const withAuth = require('../../utils/auth');
const { route } = require('./commentRoute');

//Adding a post to the dashboard
router.post('/', async (req, res) => {
  console.log("Post",req.body)
  try {
    const newPost = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });
    console.log("Post create",newPost)

    res.status(200).json(newPost);
  } catch (err) {
    res.status(400).json(err);
  }
});

//Deleting the post
router.delete('/:id', async (req, res) => {
  try {
    const postData = await Post.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!postData) {
      res.status(404).json({ message: 'No post found with this id!' });
      return;
    }

    res.status(200).json(postData);
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router
