const router = require('express').Router();
const {Comments} = require('../../models');
const withAuth = require('../../utils/auth');

router.post("/", async (req,res) => {
    try{
        const user_id = req.session.user_id;
        const {post_id, Comment_content} = req.body;

        const newComment = await Comments.create({
            Comment_content,
            user_id,
            post_id
        })
        res.status(200).json(newComment)
    }
    catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router;
