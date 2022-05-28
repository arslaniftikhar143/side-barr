import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Dashboard from "./pages/Dashboard";
import Analytics from "./pages/Analytics";
import Settings from "./pages/Settings";
import Messages from "./pages/Messages";

function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/anlytics" element={<Analytics />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/messages" element={<Messages />} />
          <Route
            path="*"
            element={
              <>
                <h1>404 Page not Found</h1>
              </>
            }
          />
        </Routes>
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
