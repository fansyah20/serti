import { Routes, Route, Navigate } from "react-router-dom";

import PilihPeserta from "./pages/PilihPeserta.jsx";
import HalamanUser from "./pages/User/HalamanUser.jsx";
import QrSertifikat from "./pages/User/QrSertifikat.jsx";
import PublikSertifikat from "./pages/PublikSertifikat.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/"                     element={<PilihPeserta />} />
      <Route path="/user/:id"             element={<HalamanUser />} />
      <Route path="/user/:id/sertifikat"  element={<QrSertifikat />} />
      <Route path="/sertifikat/:id"       element={<PublikSertifikat />} />
      <Route path="*"                     element={<Navigate to="/" replace />} />
    </Routes>
  );
}
