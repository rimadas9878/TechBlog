const router = require('express').Router();
const {Comments} = require('../../models');


router.post('/', async (req,res) => {
    try{
        const commentData = await Comment.create({
        
            comment_content: req.body.comment
        });

        res.status(200).json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;
