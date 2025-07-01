<<<<<<< HEAD
// React and context hooks
import React, { useEffect, useState, useContext } from 'react';
// Socket instance for real-time communication
import socket from '../services/socket';
// Context for filtering by course types (e.g., Starters, Mains)
import { FilterContext } from '../context/FilterContext';
// Context for view-level settings like search query
import { ViewContext } from '../context/ViewContext';

// Utility: Returns colour based on how long ago the course was called away
const getTimeColour = (calledAwayAt) => {
  const now = new Date();
  const called = new Date(calledAwayAt);
  const diffMins = Math.floor((now - called) / 60000);
  if (diffMins < 10) return 'bg-green-600';
  if (diffMins < 15) return 'bg-yellow-600';
  return 'bg-red-700'; // Late
};

// Utility: Determines header colour based on order status
const getHeaderColor = (order) => {
  switch (order.status) {
    case 'completed':
      return 'bg-gray-500';
    case 'cancelled':
      return 'bg-black';
    case 'on hold':
      return 'bg-blue-700';
    case 'away':
      return getTimeColour(order.calledAwayAt || order.createdAt); // Calculate based on away time
    default:
      return 'bg-gray-700';
  }
};

// Utility: Background colour for each course block
const getCourseBackground = (status) => {
  switch (status) {
    case 'completed':
      return 'bg-gray-800';
    case 'cancelled':
      return 'bg-black';
    case 'away':
      return 'bg-gray-600';
    case 'on hold':
      return 'bg-gray-900';
    default:
      return 'bg-gray-800';
  }
};

// Determine the next action (send/away) for a course in the order
const getNextCourseAction = (courses) => {
  const courseOrder = ['Starters', 'Mains', 'Desserts'];
  for (const type of courseOrder) {
    const course = courses.find(c => c.type === type);
    if (!course) continue;
    if (course.status === 'on hold') return { type, action: 'away' };
    if (course.status === 'away') return { type, action: 'send' };
  }
  const pending = courses.find(c => c.status !== 'completed');
  if (pending?.status === 'away') return { type: pending.type, action: 'send' };
  return null;
};

// Renders each individual order card
const OrderCard = ({ order }) => {
  const headerColor = getHeaderColor(order);
  const nextCourseAction = getNextCourseAction(order.courses); // Determine what to do next

  // Handle "Away" or "Send" button click
  const handleCourseAction = () => {
    if (!nextCourseAction) return;
    const { type, action } = nextCourseAction;

    // Update course statuses accordingly
    const updatedCourses = order.courses.map(course =>
      course.type === type
        ? { ...course, status: action === 'away' ? 'away' : 'completed' }
        : course
    );

    const isNowComplete = updatedCourses.every(c => c.status === 'completed');

    const updatedOrder = {
      ...order,
      courses: updatedCourses,
      status: isNowComplete ? 'completed' : action === 'away' ? 'away' : 'on hold',
      calledAwayAt: action === 'away' ? new Date() : order.calledAwayAt,
    };

    // Emit updated order to server
    socket.emit('updateOrder', updatedOrder);
  };

  // Restart a completed order (sets first course to away, others to on hold)
  const handleRestartOrder = () => {
    if (order.status !== 'completed') return;

    const updatedCourses = order.courses.map((course, index) =>
      index === 0
        ? { ...course, status: 'away' }
        : { ...course, status: 'on hold' }
    );

    const updatedOrder = {
      ...order,
      status: 'away',
      calledAwayAt: new Date(),
      courses: updatedCourses,
    };

    socket.emit('updateOrder', updatedOrder);
  };

  return (
    <div className="bg-gray-800 rounded-lg shadow-md p-4 w-64 flex flex-col justify-between">
      <div>
        {/* Order header section */}
        <div className={`text-white text-sm font-semibold p-2 mb-2 rounded ${headerColor}`}>
          #{order.orderNumber} | Table {order.tableNumber} | {order.waiter}
        </div>

        {/* List of all courses in the order */}
        <div className="text-gray-300 text-sm space-y-2">
          {order.courses.map((course, idx) => (
            <div key={idx} className={`p-2 rounded ${getCourseBackground(course.status)}`}>
              <div className="font-semibold text-yellow-300">{course.type}</div>
              {course.items.map((item, index) => (
                <div key={index} className="ml-2">
                  <span className="font-medium">{item.quantity}x {item.name}</span>
                  {item.comment && (
                    <div className="text-xs italic text-gray-400">“{item.comment}”</div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* Action button for away/send depending on status */}
      {nextCourseAction && (
        <button
          onClick={handleCourseAction}
          className={`mt-4 py-1 ${
            nextCourseAction.action === 'away'
              ? 'bg-blue-700 hover:bg-blue-800'
              : 'bg-green-600 hover:bg-green-700'
          } rounded text-white text-sm font-semibold`}
        >
          {nextCourseAction.action === 'away'
            ? `${nextCourseAction.type} Away`
            : `Send ${nextCourseAction.type}`}
        </button>
      )}

      {/* Restart button for completed orders */}
      {order.status === 'completed' && (
        <button
          onClick={handleRestartOrder}
          className="mt-2 py-1 bg-yellow-700 hover:bg-yellow-800 rounded text-white text-sm font-semibold"
        >
          Restart Order
        </button>
      )}
    </div>
  );
};

// Main AllOrders page
const AllOrders = () => {
  const [orders, setOrders] = useState([]); // All orders from backend
  const { filters } = useContext(FilterContext); // Course-type filters
  const { searchQuery } = useContext(ViewContext); // Search string from ViewContext

  // Initial fetch + real-time subscription
  useEffect(() => {
    const fetchInitial = () => socket.emit('requestOrders');
    fetchInitial();
    const interval = setInterval(fetchInitial, 1000); // Polling for fresh data

    const handleInitial = (data) => setOrders(data); // Initial load handler
    const handleUpdate = (data) => setOrders(data);  // Update handler

    socket.on('initialOrders', handleInitial);
    socket.on('orderUpdated', handleUpdate);

    // Cleanup on unmount
    return () => {
      clearInterval(interval);
      socket.off('initialOrders', handleInitial);
      socket.off('orderUpdated', handleUpdate);
    };
  }, []);

  // Filter orders based on search and filters
  const filteredOrders = orders.filter(order => {
    const matchesFilter = order.courses.some(course => filters[course.type]);

    const query = searchQuery.trim().toLowerCase();
    const matchesSearch =
      query === '' ||
      order.orderNumber.toLowerCase().includes(query) ||
      order.tableNumber.toLowerCase().includes(query) ||
      order.waiter.toLowerCase().includes(query) ||
      order.courses.some(course =>
        course.type.toLowerCase().includes(query) ||
        course.items.some(item =>
          item.name.toLowerCase().includes(query) ||
          (item.comment && item.comment.toLowerCase().includes(query))
        )
      );

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="h-full w-full overflow-auto p-2">
      {/* Grid layout for horizontally scrollable order cards */}
      <div className="grid grid-rows-4 auto-cols-max gap-4 grid-flow-col overflow-auto min-w-fit">
        {filteredOrders.map((order) => (
          <OrderCard key={order._id} order={order} />
        ))}
=======
import React from 'react';
import SendDesserts from '../components/ordercards/SendDesserts';
import SendMains from '../components/ordercards/SendMains';
import SendStarters from '../components/ordercards/SendStarters';
import CompletedCard from '../components/ordercards/CompletedCard';
import CancelledCard from '../components/ordercards/CancelledCard';

const AllOrders = () => {
  return (
    <div className="h-full overflow-y-hidden overflow-x-auto p-4">
      <div className="flex gap-4 flex-nowrap h-full">
        <SendDesserts />
        <SendMains />
        <SendStarters />
        <CompletedCard />
        <CancelledCard />
>>>>>>> aa1c45dbaaebb36632473801faa758bfddf8cfbe
      </div>
    </div>
  );
};

export default AllOrders;
