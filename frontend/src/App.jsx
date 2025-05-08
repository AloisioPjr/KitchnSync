import './App.css'
import React, { useContext } from "react";
import NavBar from "./components/navbar/navBar";
import { ViewProvider, ViewContext } from "./context/ViewContext";
import AllOrders from "./pages/AllOrders"; 
import Away from "./pages/Away";
import OnHold from "./pages/OnHold";
import Completed from "./pages/Completed";
import Canceled from "./pages/Cancelled";
import AllDayCount from "./components/alldaybar/AllDayCount";
import { SidebarProvider, SidebarContext } from "./context/SidebarContext";
import Settings from "./pages/Settings"; 

const ViewRenderer = () => {
  const { selectedView } = useContext(ViewContext);
  switch (selectedView) {
    case "All Orders":
      return <AllOrders />;
    case "Away":
      return <Away />;
    case "On Hold":
      return <OnHold />;
    case "Completed":
      return <Completed />;
    case "Canceled":
      return <Canceled />;
    case "Settings":                        
      return <Settings />;
    default:
      return <AllOrders />;
  }
};

const MainContent = () => {
  const { isCollapsed } = useContext(SidebarContext);

  return (
    <div className="flex flex-1 overflow-hidden">
      <div
        className={`transition-all duration-500 ${
          isCollapsed ? "w-0 opacity-0" : "w-64 opacity-100"
        } overflow-hidden`}
      >
        <AllDayCount />
      </div>
      <main className="flex-1 overflow-y-auto p-4">
        <ViewRenderer />
      </main>
    </div>
  );
};

const App = () => (
  <ViewProvider>
    <SidebarProvider>
      <div className="flex flex-col h-screen bg-gray-900 text-white">
        <NavBar />
        <MainContent />
      </div>
    </SidebarProvider>
  </ViewProvider>
);

export default App;
