const express = require('express');
const exphbs = require('express-handlebars');
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');

const mongoDB = 'mongodb+srv://rom:alex@cluster0-0k0hb.mongodb.net/tutor';

const pathPublic = path.join(__dirname, 'public');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
});

// connect express-handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(logger('dev'));

app.use(express.static(pathPublic));
app.use(express.urlencoded({ extended: true }));

app.use('/', homeRoutes);
app.use('/add', addRoutes);
app.use('/courses', coursesRoutes);
app.use('/cart', cartRoutes);

const PORT = process.env.PORT || 3000;

//

const start = async () => {
  try {
    await mongoose.connect(mongoDB, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useFindAndModify: true,
    });
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}...`);
    });
  } catch (error) {
    console.log(`!!! Attention: Server isn't started. \n ${error}`);
  }
};


start();
