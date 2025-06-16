import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";

// Page imports
import LoginScreen from "pages/login-screen";
import Dashboard from "pages/dashboard";
import ServerInventoryManagement from "pages/server-inventory-management";
import AddEditServer from "pages/add-edit-server";
import ExcelImportExport from "pages/excel-import-export";
import UserManagementAdmin from "pages/user-management-admin";

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/login-screen" element={<LoginScreen />} />
          <Route path="/add-edit-server" element={<AddEditServer />} />
          <Route path="/excel-import-export" element={<ExcelImportExport />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/user-management-admin" element={<UserManagementAdmin />} />
          <Route path="/server-inventory-management" element={<ServerInventoryManagement />} />
          <Route path="/" element={<LoginScreen />} />
          <Route path="*" element={<div>Page Not Found</div>} />
        </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;