import { useNavigate, useParams } from "react-router-dom";
import { getPesertaById } from "../../data/peserta.js";

export default function HalamanUser() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getPesertaById(id);

  if (!user) {
    return (
      <div className="login-wrapper">
        <div className="login-card" style={{ textAlign: "center", padding: 40 }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🔍</div>
          <h3>Peserta tidak ditemukan</h3>
          <button className="btn btn-primary mt-3" onClick={() => navigate("/")}>Kembali</button>
        </div>
      </div>
    );
  }

  return (
    <div className="login-wrapper position-relative">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <i className="bi bi-person-check-fill"></i>
          </div>
          <h1 className="login-title">DATA SERTIFIKAT PESERTA OJT</h1>
          <p className="login-subtitle">PT. GEO MANDIRI KREASI</p>
        </div>

        <div className="login-form">
          <div className="mb-2">
            <label className="form-label fw-semibold">Nama</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-person-fill"></i></span>
              <input type="text" className="form-control" value={user.username} disabled readOnly />
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">Jurusan</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-mortarboard-fill"></i></span>
              <input type="text" className="form-control" value={user.nama_jurusan} disabled readOnly />
            </div>
          </div>

          <div className="mb-2">
            <label className="form-label fw-semibold">No HP</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-telephone-fill"></i></span>
              <input type="text" className="form-control" value={user.no_hp} disabled readOnly />
            </div>
          </div>

          
          <div className="mb-3">
            <label className="form-label fw-semibold">ID Peserta</label>
            <div className="input-group">
              <span className="input-group-text"><i className="bi bi-hash"></i></span>
              <input type="text" className="form-control" value={user.id} disabled readOnly />
            </div>
          </div>

          <button
            className="btn btn-success w-100 mb-2"
            onClick={() => navigate(`/user/${user.id}/sertifikat`)}
            style={{ fontWeight: 700 }}
          >
            <i className="bi bi-patch-check-fill me-2"></i>
            Lihat QR Sertifikat Saya
          </button>

          <button
            className="btn btn-outline-primary w-100 mb-2"
            onClick={() => navigate(`/sertifikat/${user.id}`)}
          >
            <i className="bi bi-eye me-2"></i>
            Preview Halaman Sertifikat (hasil scan QR)
          </button>

          <button className="btn btn-outline-secondary w-100 mt-1" onClick={() => navigate("/")}>
            <i className="bi bi-arrow-left me-2"></i>
            Kembali ke Daftar Peserta
          </button>
        </div>
      </div>
    </div>
  );
}
