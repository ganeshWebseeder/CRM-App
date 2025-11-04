import React, { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import Dashboard from './Pages/Dashboard';

// Lazy load the Login page
const LoginPage = lazy(() => import('./pages/login/Login'));

export default function App() {
  return (
    <>
      <div>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </Suspense>
      </div>
    </>
  );
}
