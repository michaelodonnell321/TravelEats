
const express = require('express');
require('dotenv').config();

const app = express();
const bodyParser = require('body-parser');
const sessionMiddleware = require('./modules/session-middleware');

const passport = require('./strategies/user.strategy');

// Route includes
const userRouter = require('./routes/user.router');
const restaurantRouter = require('./routes/restaurant.router');
const commentRouter = require('./routes/comment.router');
const groupRouter = require('./routes/group.router');
const profileRouter = require('./routes/profile.router');
const adminRouter = require('./routes/admin.router');

// Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use('/api/user', userRouter);
app.use('/api/restaurant', restaurantRouter);
app.use('/api/comment', commentRouter);
app.use('/api/group', groupRouter);
app.use('/api/profile', profileRouter);
app.use('/api/admin', adminRouter);

// Serve static files
app.use(express.static('build'));

// App Set //
const PORT = process.env.PORT || 5000;

/** Listen * */
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});

module.exports = app;