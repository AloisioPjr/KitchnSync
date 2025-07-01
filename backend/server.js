// Load environment variables from .env file
require('dotenv').config();

// Required libraries
const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const mongoose = require('mongoose');
const Order = require('./models/Order'); // Mongoose model for orders

// Define constants
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

// Initialize Express app and HTTP server
const app = express();
const server = http.createServer(app);

// Middleware
app.use(cors({ origin: 'http://localhost:5173' })); // Allow frontend to connect
app.use(express.json()); // Parse incoming JSON request bodies

// Connect to MongoDB
mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => console.log('MongoDB connected'));

// Setup Socket.IO server
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

// Handle socket connections
io.on('connection', async (socket) => {
  console.log(` New client connected: ${socket.id}`);

  // Send all current orders when a client connects
  try {
    const orders = await Order.find();
    socket.emit('initialOrders', orders);
  } catch (err) {
    console.error('Error sending initial orders:', err);
  }

  // Custom event to fetch fresh orders on demand
  socket.on('requestOrders', async () => {
    try {
      const orders = await Order.find();
      socket.emit('initialOrders', orders);
    } catch (err) {
      console.error('Failed to send requested orders', err);
    }
  });

  // Receive and save a new order from client
  socket.on('newOrder', async (orderData) => {
    try {
      console.log(' New order received via socket:', orderData);
      const order = new Order(orderData);
      await order.save();

      // Notify all clients of updated order list
      const allOrders = await Order.find();
      io.emit('orderUpdated', allOrders);
      console.log(' Emitted updated orders after new order');
    } catch (err) {
      console.error('Error saving order:', err);
    }
  });

  // Receive an update to an existing order
  socket.on('updateOrder', async (updatedOrder) => {
    try {
      const existing = await Order.findById(updatedOrder._id);
      if (!existing) return;

      // Update relevant fields
      existing.courses = updatedOrder.courses;
      existing.status = updatedOrder.status;
      existing.calledAwayAt = updatedOrder.calledAwayAt || existing.calledAwayAt;

      await existing.save();

      const allOrders = await Order.find();
      io.emit('orderUpdated', allOrders);
      console.log('Emitted updated orders after edit');
    } catch (err) {
      console.error('Error updating order:', err);
    }
  });

  // Delete an order
  socket.on('deleteOrder', async (orderId) => {
    try {
      await Order.findByIdAndDelete(orderId);
      const allOrders = await Order.find();
      io.emit('orderUpdated', allOrders);
      console.log(' Emitted updated orders after deletion');
    } catch (err) {
      console.error('Error deleting order:', err);
    }
  });

  // Handle client disconnect
  socket.on('disconnect', () => {
    console.log(` Client disconnected: ${socket.id}`);
  });
});

// REST API routes

// Root test endpoint
app.get('/', (req, res) => res.send('KDS Backend API Running'));

// Get all orders
app.get('/api/orders', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
});

// Create a new order
app.post('/api/orders', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();

    const allOrders = await Order.find();
    io.emit('orderUpdated', allOrders);

    res.status(201).json(savedOrder);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

// Update an existing order
app.put('/api/orders/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(req.params.id, req.body, { new: true });

    const allOrders = await Order.find();
    io.emit('orderUpdated', allOrders);

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update order' });
  }
});

// Delete an order
app.delete('/api/orders/:id', async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);

    const allOrders = await Order.find();
    io.emit('orderUpdated', allOrders);

    res.status(204).send(); // No content
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to delete order' });
  }
});

// Start the HTTP and WebSocket server
server.listen(PORT, () => {
  console.log(` Server running on port ${PORT}`);
});
