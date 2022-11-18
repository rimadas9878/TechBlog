const router = require('express').Router();
const userRouter = require('./userRoute');
const dashboardRoute = require('./dashboardRoute');
const postRoute = require('./postRoute');

router.use('/dashboard', dashboardRoute);
router.use('/users', userRouter);
router.use('/post', postRoute)

module.exports = router;

