import React, { useContext } from "react";
import socket from "../../services/socket";
import { ThemeContext } from "../../context/ThemeContext";

const getTimeColour = (calledAwayAt, isDark) => {
  const now = new Date();
  const called = new Date(calledAwayAt);
  const diffMins = Math.floor((now - called) / 60000);
  if (diffMins < 10) return isDark ? "bg-green-600" : "bg-green-200";
  if (diffMins < 15) return isDark ? "bg-yellow-600" : "bg-yellow-200";
  return isDark ? "bg-red-700" : "bg-red-200";
};

const getCourseBackground = (status, isDark) => {
  const light = {
    away: "bg-gray-300",
    "on hold": "bg-blue-200",
    completed: "bg-gray-100",
    cancelled: "bg-red-100",
    default: "bg-gray-100",
  };
  const dark = {
    away: "bg-gray-600",
    "on hold": "bg-gray-900",
    completed: "bg-gray-800",
    cancelled: "bg-black",
    default: "bg-gray-800",
  };
  return isDark ? (dark[status] || dark.default) : (light[status] || light.default);
};

const getNextCourseAction = (courses) => {
  const courseOrder = ["Starters", "Mains", "Desserts"];
  for (const type of courseOrder) {
    const course = courses.find((c) => c.type === type);
    if (!course) continue;
    if (course.status === "on hold") return { type, action: "away" };
    if (course.status === "away") return { type, action: "send" };
  }
  const pending = courses.find((c) => c.status !== "completed");
  if (pending?.status === "away") return { type: pending.type, action: "send" };
  return null;
};

const OrderCard = ({ order }) => {
  const { isDark } = useContext(ThemeContext);
  const isCompleted = order.status === "completed";
  const isCancelled = order.status === "cancelled";

  const headerColor =
    isCompleted
      ? isDark ? "bg-gray-500 text-white" : "bg-gray-200 text-black"
      : isCancelled
? isDark ? "bg-black text-white" : "bg-gray-300 text-black"

      : order.status === "on hold"
      ? isDark ? "bg-blue-700 text-white" : "bg-blue-200 text-black"
      : getTimeColour(order.calledAwayAt || order.createdAt, isDark) + (isDark ? " text-white" : " text-black");

  const nextCourseAction = getNextCourseAction(order.courses);

  const handleCourseAction = () => {
    if (!nextCourseAction) return;
    const { type, action } = nextCourseAction;

    const updatedCourses = order.courses.map(course =>
      course.type === type ? {
        ...course,
        status: action === "away" ? "away" : "completed"
      } : course
    );

    const isNowComplete = updatedCourses.every(c => c.status === "completed");

    socket.emit("updateOrder", {
      ...order,
      courses: updatedCourses,
      status: isNowComplete ? "completed" : (action === "away" ? "away" : "on hold"),
      calledAwayAt: action === "away" ? new Date() : order.calledAwayAt,
    });
  };

  const handleRestartOrder = () => {
    const updatedCourses = order.courses.map((course, idx) =>
      idx === 0 ? { ...course, status: "away" } : { ...course, status: "on hold" }
    );

    socket.emit("updateOrder", {
      ...order,
      courses: updatedCourses,
      status: "away",
      calledAwayAt: new Date(),
    });
  };

  return (
    <div className={`rounded-lg shadow-md p-4 w-64 flex flex-col justify-between ${isDark ? "bg-gray-800 text-white" : "bg-gray-100 text-black"}`}>
      <div>
        <div className={`text-sm font-semibold p-2 mb-2 rounded ${headerColor}`}>
          <div>{order.orderNumber} | Table {order.tableNumber} | {order.waiter}</div>
          <div className={`text-xs ${isDark ? "text-gray-200" : "text-gray-600"}`}>
            🕒{new Date(order.createdAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
            {order.calledAwayAt && (
              <>
                {" | 🔄"}{new Date(order.calledAwayAt).toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" })}
                {" | ⏳"} ({Math.floor((Date.now() - new Date(order.calledAwayAt)) / 60000)} min ago)
              </>
            )}
          </div>
        </div>

        <div className="text-sm space-y-2">
          {order.courses.map((course, idx) => (
            <div key={idx} className={`p-2 rounded ${getCourseBackground(course.status, isDark)}`}>
              <div className={`${isDark ? "text-yellow-300" : "text-yellow-700"} font-semibold`}>{course.type}</div>
              {course.items.map((item, index) => (
                <div key={index} className="ml-2">
                  <span className="font-medium">{item.quantity}x {item.name}</span>
                  {item.comment && (
                    <div className={`text-xs italic ${isDark ? "text-gray-400" : "text-gray-500"}`}>
                      “{item.comment}”
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>

      {nextCourseAction && (
        <button
          onClick={handleCourseAction}
          className={`mt-4 py-1 rounded text-sm font-semibold ${
            isDark
              ? nextCourseAction.action === "away"
                ? "bg-blue-700 hover:bg-blue-800 text-white"
                : "bg-green-600 hover:bg-green-700 text-white"
              : nextCourseAction.action === "away"
              ? "bg-blue-300 hover:bg-blue-400 text-black"
              : "bg-green-300 hover:bg-green-400 text-black"
          }`}
        >
          {nextCourseAction.action === "away"
            ? `${nextCourseAction.type} Away`
            : `Send ${nextCourseAction.type}`}
        </button>
      )}

      {isCompleted && (
        <button
          onClick={handleRestartOrder}
          className={`mt-2 py-1 rounded text-sm font-semibold ${
            isDark
              ? "bg-yellow-700 hover:bg-yellow-800 text-white"
              : "bg-yellow-300 hover:bg-yellow-400 text-black"
          }`}
        >
          Restart Order
        </button>
      )}
    </div>
  );
};

export default OrderCard;
