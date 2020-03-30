const uuid = require('uuid');
const fs = require('fs');
const path = require('path');

const uuidv4 = uuid.v4;
const coursesDataPath = path.join(__dirname, '..', 'data', 'courses.json');

class Course {
  constructor(title, price, img) {
    this.title = title;
    this.price = price;
    this.img = img;
    this.id = uuidv4();
  }


  toJSON() {
    return {
      title: this.title,
      price: this.price,
      img: this.img,
      id: this.id,
    };
  }

  static async update(course) {
    const courses = await Course.getAll();

    const idx = courses.findIndex((el) => el.id === course.id);
    courses[idx] = course;

    fs.writeFile(
      coursesDataPath,
      JSON.stringify(courses),
      (err) => {
        if (err) throw err;
      },
    );


    // return new Promise((resolve, reject) => {
    //   fs.writeFile(
    //     coursesDataPath,
    //     JSON.stringify(courses),
    //     (err) => {
    //       if (err) {
    //         reject(err);
    //       } else {
    //         resolve();
    //       }
    //     },
    //   );
    // });
  }

  async save() {
    const courses = await Course.getAll();
    courses.push(this.toJSON());

    return new Promise((resolve, reject) => {
      fs.writeFile(
        coursesDataPath,
        JSON.stringify(courses),
        'utf-8',
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve();
          }
        },

      );
    });
  }

  static getAll() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        coursesDataPath,
        'utf-8',
        (err, content) => {
          if (err) {
            reject(err);
          } else {
            resolve(JSON.parse(content));
          }
        },
      );
    });
  }

  static async getById(id) {
    const courses = await Course.getAll();
    return courses.find((el) => el.id === id);
  }
}


module.exports = Course;
