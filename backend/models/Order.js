const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: Number, default: 1 },
  comment: { type: String, default: '' },
   type: { type: String }
});

const courseSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['Starters', 'Mains', 'Desserts'],
    required: true
  },
  status: {
  type: String,
  enum: ['on hold', 'away', 'completed', 'cancelled'],
  default: 'on hold'
},

  items: [itemSchema]
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  tableNumber: { type: String, required: true },
  waiter: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  calledAwayAt: { type: Date },
  status: {
    type: String,
    enum: ['on hold', 'away', 'completed', 'cancelled'],
    default: 'on hold'
  },
  courses: [courseSchema]
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
