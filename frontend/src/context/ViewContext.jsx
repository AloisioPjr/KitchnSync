import React, { createContext, useState } from "react";

export const ViewContext = createContext();

export const ViewProvider = ({ children }) => {
  const [selectedView, setSelectedView] = useState("All Orders");

  return (
    <ViewContext.Provider value={{ selectedView, setSelectedView }}>
      {children}
    </ViewContext.Provider>
  );
};
