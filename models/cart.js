const path = require('path');
const fs = require('fs');

const cartDataPath = path.join(
  path.dirname(process.mainModule.filename),
  'data',
  'cart.json',
);


class Cart {
  static async add(course) {
    const cart = await this.fetch();
    const idx = cart.courses.findIndex((el) => el.id === course.id);
    const isCourseInCart = cart.courses[idx];
    if (isCourseInCart) {
      cart.courses[idx].count++;
      // cart.courses[idx] = candidate;
    } else {
      course.count = 1;
      cart.courses.push(course);
    }
    cart.price += +course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        cartDataPath,
        JSON.stringify(cart),
        'UTF-8',
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

  static async remove(id) {
    const cart = await this.fetch();
    const idx = cart.courses.findIndex((el) => el.id === id);
    const course = cart.courses[idx];
    if (course.count === 1) {
      // delete
      cart.courses = cart.courses.filter((el) => el.id !== id);
    } else {
      // change
      cart.courses[idx].count--;
    }
    cart.price -= course.price;

    return new Promise((resolve, reject) => {
      fs.writeFile(
        cartDataPath,
        JSON.stringify(cart),
        'UTF-8',
        (err) => {
          if (err) {
            reject(err);
          } else {
            resolve(cart);
          }
        },
      );
    });
  }


  static async fetch() {
    return new Promise((resolve, reject) => {
      fs.readFile(
        cartDataPath,
        'UTF-8',
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
}

module.exports = Cart;
