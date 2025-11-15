import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Pages/Login";
import Dashboard from "./Pages/Dashboard";
import MainLayout from "./components/layouts/MainLayout";
import Projects from "./Pages/Projects";
import LeadManagementPage from "./Pages/Leads";
import ExpenseManagement from "./Pages/ExpenseManagement";
import ProjectDetails from "./Pages/ProjectDetails";
import InvoiceCreation from "./Pages/InvoiceCreation";
import ReminderManagement from "./Pages/ReminderManagement";
import Reports from "./Pages/Reports";
import { div } from "framer-motion/client";
import { LeadsProvider } from "./context/LeadsContext";

function App() {

 
  return (

    
      <LeadsProvider>
   
      <Routes>
        {/*  Login Page */}
        <Route path="/" element={<Login />} />

        {/* Dashboard */}
        <Route
          path="/dashboard"
          element={
            <MainLayout>
              <Dashboard />
            </MainLayout>
          }
        />

        {/* Projects */}
        <Route
          path="/projects"
          element={
            <MainLayout>
              <Projects />
            </MainLayout>
          }
        />

        {/*  Leads */}
        <Route
          path="/leads"
          element={
            <MainLayout>
              <LeadManagementPage />
            </MainLayout>
          }
        />

        {/*  Expenses */}
        <Route
          path="/expenses"
          element={
            <MainLayout>
              <ExpenseManagement />
            </MainLayout>
          }
        />

        {/*  Project Details (Dynamic ID) */}
        <Route
          path="/projects/:id"
          element={
            <MainLayout>
              <ProjectDetails />
            </MainLayout>
          }
        />

        {/*  Invoice Creation */}
        <Route
          path="/invoices"
          element={
            <MainLayout>
              <InvoiceCreation />
            </MainLayout>
          }
        />

        {/* ⏰Reminder Management */}
        <Route
          path="/reminders"
          element={
            <MainLayout>
              <ReminderManagement />
            </MainLayout>
          }
        />
        <Route
          path="/reports"
          element={
            <MainLayout>
              <Reports />
            </MainLayout>
          }
        />
        
      </Routes>
   </LeadsProvider>
  
  );
}

export default App;
