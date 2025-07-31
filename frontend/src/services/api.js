// Base URL for the backend API
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

// Fetch all orders from the backend
export const fetchOrders = async () => {
  const response = await fetch(`${API_URL}/orders`); // Send GET request to /api/orders
  return await response.json(); // Parse and return JSON response
};

// Create a new order by sending it to the backend
export const createOrder = async (orderData) => {
  const response = await fetch(`${API_URL}/orders`, {
    method: "POST", // HTTP method
    headers: { "Content-Type": "application/json" }, // Send data as JSON
    body: JSON.stringify(orderData), // Convert JS object to JSON string
  });
  return await response.json(); // Parse and return JSON response
};
