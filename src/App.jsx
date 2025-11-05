

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login.jsx";

import Dashboard from "./Pages/Dashboard";
import MainLayout from "./components/layouts/MainLayout";

function App() {
  return (
    
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />
      </Routes>
 
  );
}

export default App;
