const express = require('express');
const productRouter = require('./product');
const categoryRouter = require('./category');
const userRouter = require('./user');
const authRouter = require('./auth');
const feedbackRouter = require('./feedback');
const verifyToken = require('../../app/middlewares/verifyToken')

const apiRouter = express.Router();


apiRouter.use('/products', verifyToken, productRouter);
apiRouter.use('/categories', verifyToken, categoryRouter);
apiRouter.use('/users', verifyToken, userRouter);
apiRouter.use('/auth', authRouter);
apiRouter.use('/feedbacks', verifyToken, feedbackRouter);

module.exports = apiRouter;