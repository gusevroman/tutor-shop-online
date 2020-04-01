const { Schema, model } = require('mongoose');


const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  cart: {
    items: [
      {
        count: {
          type: Number,
          required: true,
          default: 1,
        },
        courseId: {
          type: Schema.Types.ObjectId,
          ref: 'Course',
          required: true,
        },
      },
    ],
  },
  img: {
    type: String,
    required: false,
  },
});


// ____ Methods

userSchema.methods.addToCart = function (course) {
  const items = [...this.cart.items];
  const idx = items.findIndex((el) => el.courseId.toString() === course._id.toString());

  if (idx !== -1) {
    items[idx].count++; //
  } else {
    items.push({
      courseId: course._id,
      count: 1,
    });
  }

  this.cart = { items };
  return this.save();
};


userSchema.methods.removeFromeCart = function (id) {
  let items = [...this.cart.items];
  const idx = items.findIndex((el) => el.courseId.toString() === id.toString());

  if (items[idx].count === 1) {
    items = items.filter((el) => el.courseId.toString() !== id.toString());
  } else {
    items[idx].count--;
  }

  this.cart = { items };
  return this.save();
};


userSchema.methods.clearCart = function () {
  this.cart = { items: [] };
  return this.save();
};


module.exports = model('User', userSchema);
