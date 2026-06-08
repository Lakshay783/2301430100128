import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Container, CssBaseline, Box } from "@mui/material";
import { useEffect } from "react";
import { Log } from "./utils/logger";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import Notifications from "./pages/Notifications";
import PriorityNotifications from "./pages/PriorityNotifications";

function App() {
  useEffect(() => {
    // App startup log
    Log('frontend', 'info', 'component', 'Application started');
  }, []);

  return (
    <Router>
      <CssBaseline />
      <Box sx={{ minHeight: '100vh', bgcolor: '#f8f9fa' }}>
        <Navbar />
        <Box component="main" sx={{ pb: 8 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/priority" element={<PriorityNotifications />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;