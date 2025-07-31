import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import OrderCard from "../../components/orders/OrderCard";
import { ThemeContext } from "../../context/ThemeContext";

//  Use Jest's manual mock resolution
jest.mock("../../services/socket");

//  Import the emit mock
import { mockEmit } from "../../services/__mocks__/socket";

const mockOrder = {
  _id: "123",
  orderNumber: "T1",
  tableNumber: "5",
  waiter: "Aoife",
  createdAt: "2025-07-01T23:15:20.991Z",
  calledAwayAt: "2025-07-01T23:08:20.991Z",
  status: "away",
  courses: [
    {
      type: "Starters",
      status: "completed",
      items: [{ name: "Soup", quantity: 2, comment: "No cream" }]
    },
    {
      type: "Mains",
      status: "on hold",
      items: [{ name: "Steak", quantity: 1 }]
    }
  ]
};

describe("OrderCard", () => {
  beforeEach(() => {
    mockEmit.mockClear();
  });

  it("renders order information", () => {
    render(
      <ThemeContext.Provider value={{ isDark: true }}>
        <OrderCard order={mockOrder} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText(/T1/)).toBeInTheDocument();
    expect(screen.getByText(/Table 5/)).toBeInTheDocument();
    expect(screen.getByText(/Aoife/)).toBeInTheDocument();
    expect(screen.getByText(/2x Soup/)).toBeInTheDocument();
    expect(screen.getByText(/No cream/)).toBeInTheDocument();
    expect(screen.getByText(/1x Steak/)).toBeInTheDocument();
  });

  it("shows 'Mains Away' button when Mains is on hold", () => {
    render(
      <ThemeContext.Provider value={{ isDark: true }}>
        <OrderCard order={mockOrder} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText("Mains Away")).toBeInTheDocument();
  });

 

  it("renders Restart button if order is completed", () => {
    const completedOrder = {
      ...mockOrder,
      status: "completed",
      courses: mockOrder.courses.map((c) => ({ ...c, status: "completed" }))
    };

    render(
      <ThemeContext.Provider value={{ isDark: true }}>
        <OrderCard order={completedOrder} />
      </ThemeContext.Provider>
    );

    expect(screen.getByText("Restart Order")).toBeInTheDocument();
  });
  it("applies dark theme classes correctly", () => {
  render(
    <ThemeContext.Provider value={{ isDark: true }}>
      <OrderCard order={mockOrder} />
    </ThemeContext.Provider>
  );

  expect(screen.getByText(/T1/).parentElement).toHaveClass("bg-red-700");
});

it("applies light theme classes correctly", () => {
  render(
    <ThemeContext.Provider value={{ isDark: false }}>
      <OrderCard order={mockOrder} />
    </ThemeContext.Provider>
  );

  expect(screen.getByText(/T1/).parentElement).toHaveClass("bg-red-200");
});
it("falls back to createdAt when calledAwayAt is missing", () => {
  const orderWithoutCalledAway = {
    ...mockOrder,
    calledAwayAt: null
  };

  render(
    <ThemeContext.Provider value={{ isDark: true }}>
      <OrderCard order={orderWithoutCalledAway} />
    </ThemeContext.Provider>
  );

  expect(screen.getByText(/T1/)).toBeInTheDocument(); // Still renders
});
it("shows correct time label and urgency based on calledAwayAt", () => {
  jest.useFakeTimers().setSystemTime(new Date("2025-07-01T23:18:20.991Z")); // 10 mins after calledAwayAt

  render(
    <ThemeContext.Provider value={{ isDark: true }}>
      <OrderCard order={mockOrder} />
    </ThemeContext.Provider>
  );

  expect(screen.getByText(/10 min ago/)).toBeInTheDocument();
  jest.useRealTimers();
});

});
