import { Navigate, Route, Routes } from "react-router-dom";
import { Login } from "@/pages/account-access/index.tsx";
import { AppLayout } from "@/layouts/AppLayout.tsx";
import Homepage from "@/pages/homepage/index.tsx";
import EmployeeDetails from "@/pages/details/index.tsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<AppLayout />}>
        <Route path="/" element={<Homepage />} />
        <Route path="/detail/employee/:nik" element={<EmployeeDetails />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
