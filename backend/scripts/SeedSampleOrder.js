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

    const sampleOrder = new Order({
      orderNumber: "#031",
      tableNumber: "9",
      waiter: "peter",
      status: "away",
      
      calledAwayAt: new Date(),
      courses: [
        {
          type: "Starters",
          status: "away",
          items: [
            { name: "Crab", quantity: 1 },
            { name: "Scotch Egg", quantity: 1 }
          ]
        }
      ]
    });

    await sampleOrder.save();
    
    console.log("Sample order inserted!");

  } catch (error) {
    console.error("Error inserting sample order:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
  }
};

run();
