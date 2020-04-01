// @ts-check

const { Router } = require('express');
const Course = require('../models/course');

const router = Router();

function mapCartUser(user) {
  return user.cart.items.map((el) => ({
    ...el.courseId._doc,
    id: el.courseId.id,
    count: el.count,
  }));
}

function cartPrice(courses) {
  return courses.reduce((total, course) => total += course.price * course.count, 0);
}


router.post('/add', async (req, res) => {
  const { id } = req.body;
  const course = await Course.findById(id);
  await req.user.addToCart(course);
  res.redirect('/cart');
});

router.delete('/remove/:id', async (req, res) => {
  await req.user.removeFromeCart(req.params.id);
  const user = await req.user
    .populate('cart.items.courseId', '')
    .execPopulate();
  const courses = mapCartUser(user);
  const cart = {
    courses,
    price: cartPrice(courses),
  };
  res.json(cart);
});


router.get('/', async (req, res) => {
  const user = await req.user //
    .populate('cart.items.courseId', '')
    .execPopulate();
  const courses = mapCartUser(user);

  res.render('cart', {
    title: 'Shopping Cart',
    isCart: true,
    courses,
    price: cartPrice(courses),
  });
});

module.exports = router;
