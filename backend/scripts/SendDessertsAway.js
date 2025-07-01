const mongoose = require('mongoose');
const Order = require('../models/Order');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

const run = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');

    // Find the specific sample order
    const order = await Order.findOne({ orderNumber: "#007" });

    if (!order) {
      console.error("Order not found");
      return;
    }

    // Update the desserts course to 'away'
    let updated = false;
    order.courses = order.courses.map(course => {
      if (course.type === "Desserts" && course.status === "on hold") {
        updated = true;
        return { ...course.toObject(), status: "away" };
      }
      return course;
    });

    if (updated) {
      order.status = "away";
      order.calledAwayAt = new Date();
      await order.save();
      console.log("Desserts course sent away successfully!");
    } else {
      console.log("No 'Desserts' course in 'on hold' status to update.");
    }

  } catch (error) {
    console.error("Error updating order:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

run();
