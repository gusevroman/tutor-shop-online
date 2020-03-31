const express = require('express');
const exphbs = require('express-handlebars');
const Handlebars = require('handlebars'); // add https://stackoverflow.com/questions/59690923/handlebars-access-has-been-denied-to-resolve-the-property-from-because-it-is
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access'); // add
const logger = require('morgan');
const path = require('path');
const mongoose = require('mongoose');

const homeRoutes = require('./routes/home');
const addRoutes = require('./routes/add');
const coursesRoutes = require('./routes/courses');
const cartRoutes = require('./routes/cart');

// tmp
const User = require('./models/user');

const mongoDB = 'mongodb+srv://rom:alex@cluster0-0k0hb.mongodb.net/tutor';

const pathPublic = path.join(__dirname, 'public');

const app = express();

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars), // add
});

// connect express-handlebars
app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', 'views');

app.use(logger('dev'));

// >>
app.use(async (req, res, next) => {
  try {
    const user = await User.findById('5e8258069a07995f58238743');
    req.user = user;
    next();
  } catch (error) {
    console.log(error);
  }
});
// <<

app.use(express.static(pathPublic));
// app.use(express.json());
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
      useFindAndModify: false,
    });

    // tmp_start
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        name: 'Feodor',
        email: 'feodor@gmail.com',
        cart: { items: [] },
      });

      await user.save();
    }
    // tmp_end

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT} ...`);
    });
  } catch (error) {
    console.log(`!!! Attention: Server isn't started. \n ${error}`);
  }
};


start();
