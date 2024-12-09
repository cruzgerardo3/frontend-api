import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import Companies from './Companies';
import Vouchers from './Vouchers';
import Reports from './Reports';
import UploadVoucher from './UploadVoucher';

function Dashboard({onLogout}) {
  return (
    <div>
      <h1>Panel Principal</h1>
      <nav>
        <Link to="/companies">Empresas</Link>{" "}
        <Link to="/vouchers">Comprobantes</Link>{" "}
        <Link to="/reports">Reportes</Link>{" "}
        <Link to="/UploadVoucher">Vaucher </Link>{ " " }
        <button onClick={onLogout}>Cerrar Sesión</button>
      </nav>
      <Routes>
        <Route path="/companies" element={<Companies />} />
        <Route path="/vouchers" element={<Vouchers />} />
        <Route path="/reports" element={<Reports />} />
      </Routes>
    </div>
  );
}

export default Dashboard;
