import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import MainLayout from "./components/layouts/MainLayout";
import Projects from "./Pages/Projects";
import LeadManagementPage from "./Pages/Leads";
import ProjectDetails from "./Pages/ProjectDetails";
import ExpenseManagement from "./Pages/ExpenseManagement";
import InvoiceCreation from "./Pages/InvoiceCreation";
import ReminderManagement from "./Pages/ReminderManagement";

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
          path="/expenses"
          element={
            <MainLayout>
              <ExpenseManagement />
              
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
         {/* 📄 Project Details (Dynamic Route) */}
        <Route
          path="/projects/:id"
          element={
            <MainLayout>
              <ProjectDetails />
            </MainLayout>
          }
        />
         <Route
          path="/invoices/"
          element={
            <MainLayout>
              <InvoiceCreation />
            </MainLayout>
          }
        />
        <Route
          path="/reminders"
          element={
            <MainLayout>
              <ReminderManagement />
            </MainLayout>
          }
        />
      </Routes>
   

  );
}

export default App;
