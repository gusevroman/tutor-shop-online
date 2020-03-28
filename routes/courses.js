const { Router } = require('express');
const Course = require('../models/course');

const router = Router();

router.get('/', async (req, res) => {
  const courses = await Course.find({ price: 288 }).lean(); // added lean() for getting JSON instead of mongoose documents
  console.log(courses);
  res.render('courses', {
    title: 'Courses',
    isCourses: true,
    courses,
  });
});

router.get('/:id/edit', async (req, res) => {
  if (!req.query.allow) {
    return res.redirect('/');
  }
  const { id } = req.params;
  const course = await Course.findById({ id });

  res.render('course-edit', {
    title: `Edit ${course.title}`,
    course,
  });
});

router.post('/edit', async (req, res) => {
  await Course.update(req.body);
  res.redirect('/courses');
});

router.get('/:id', async (req, res) => {
  const course = await Course.findById(req.params.id);
  res.render('course', {
    layout: 'empty',
    title: `Course ${course.title}`,
    course,
  });
});

module.exports = router;
