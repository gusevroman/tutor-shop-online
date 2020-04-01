const { Router } = require('express');
const Course = require('../models/course');

const router = Router();

router.get('/', async (req, res) => {
  const courses = await Course.find({})
    .populate('userId', 'name')
    .select('price title img');

  res.render('courses', {
    title: 'Courses',
    isCourses: true,
    courses,
  });
});

router.get('/:id/edit', (req, res) => {
  try {
    const { id } = req.params;
    Course.findById(id)
      .then((course) => {
        res.render('course-edit', {
          title: `Edite Course ${course.title}`,
          course,
        });
      }).catch((error) => {
        console.log(`Don't find and edit courseo. \n ${error}`);
      });
  } catch (error) {
    console.log(`Do not find course. \nError: ${error}`);
  }
});

router.post('/edit', (req, res) => {
  const { id } = req.body;
  delete req.body.id;
  Course.findByIdAndUpdate(id, req.body)
    .then(res.redirect('/courses'));
});

router.post('/delete', (req, res) => {
  try {
    Course.deleteOne({ _id: req.body.id })
      .then(res.redirect('/courses'));
  } catch (error) {
    console.log(error);
  }
});

router.get('/:id', async (req, res) => {
  const { id } = req.params;
  const course = await Course.findById(id);
  res.render('course', {
    layout: 'empty',
    title: `Course ${course.title}`,
    course,
  });
});

module.exports = router;
