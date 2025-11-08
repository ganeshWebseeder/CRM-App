

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";

import MainLayout from "./components/layouts/MainLayout";
import Projects from "./Pages/Projects";
import LeadManagementPage from "./Pages/Leads";
import ExpenseManagement from "./Pages/ExpenseManagement";
import ProjectDetails from "./Pages/ProjectDetails";

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
        <Route
          path="/projects"
          element={
            <MainLayout>
              <Projects />
              
            </MainLayout>
          }
        />
        <Route
          path="/leads"
          element={
            <MainLayout>
              <LeadManagementPage />
              
            </MainLayout>
          }
        />
        <Route
          path="/expenses"
          element={
            <MainLayout>
              <ExpenseManagement/>
              
            </MainLayout>
          }
        />
         <Route
          path="/projects/:id"
          element={
            <MainLayout>
              <ProjectDetails />
            </MainLayout>
          }
        />
        
      </Routes>
   

  );
}

export default App;
