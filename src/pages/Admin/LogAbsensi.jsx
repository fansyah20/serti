import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DUMMY_PESERTA } from "../../data/peserta.js";

export default function LogAbsensi() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const filtered = DUMMY_PESERTA.filter((p) =>
    p.username.toLowerCase().includes(search.toLowerCase()) ||
    p.nama_jurusan.toLowerCase().includes(search.toLowerCase())
  );

  const jurusan = [...new Set(DUMMY_PESERTA.map((p) => p.nama_jurusan))];

  return (
    <div className="dashboard-wrapper">
      <nav className="top-navbar px-3 d-flex align-items-center justify-content-between">
        <div className="d-flex align-items-center gap-2">
          <div style={{ width: 32, height: 32, background: "linear-gradient(135deg,#2563eb,#7c3aed)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <i className="bi bi-patch-check-fill text-white" style={{ fontSize: 14 }}></i>
          </div>
          <span className="brand-text text-white">Sertifikat QR</span>
          <span className="badge bg-primary badge-admin ms-1">ADMIN</span>
        </div>
        <button className="btn btn-sm btn-outline-light" onClick={() => navigate("/")} style={{ fontSize: 12, borderRadius: 8 }}>
          <i className="bi bi-arrow-left me-1"></i> Kembali
        </button>
      </nav>

      <div className="dashboard-content p-4">
        <div className="mb-4">
          <h1 className="page-title">Data Peserta Sertifikat</h1>
          <p className="page-subtitle text-muted mb-0">Rembug B1 · PT. GEO MANDIRI KREASI · BBPVP Bekasi</p>
        </div>

        {/* Stat cards */}
        <div className="row g-3 mb-4">
          {jurusan.map((j, i) => {
            const count = DUMMY_PESERTA.filter((p) => p.nama_jurusan === j).length;
            const colors = ["#2563eb", "#16a34a", "#9333ea", "#ea580c"];
            return (
              <div key={i} className="col-md-4">
                <div style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 14, padding: "16px 20px" }}>
                  <div style={{ fontSize: 28, fontWeight: 800, color: "#fff", lineHeight: 1 }}>{count}</div>
                  <div style={{ fontSize: 11, color: "rgba(255,255,255,0.55)", marginTop: 4, lineHeight: 1.4 }}>{j}</div>
                  <div style={{ height: 3, background: colors[i % colors.length], borderRadius: 2, marginTop: 12, width: `${(count / DUMMY_PESERTA.length) * 100}%` }} />
                </div>
              </div>
            );
          })}
        </div>

        {/* Search */}
        <div className="filter-card mb-4">
          <div className="input-group">
            <span className="input-group-text"><i className="bi bi-search"></i></span>
            <input type="text" className="form-control" placeholder="Cari nama atau jurusan..." value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
        </div>

        {/* Table */}
        <div className="table-card">
          <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(0,0,0,0.05)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <span style={{ fontWeight: 700, color: "#1e293b" }}>Daftar Peserta</span>
            <span style={{ fontSize: 12, color: "#64748b" }}>{filtered.length} dari {DUMMY_PESERTA.length}</span>
          </div>
          <div style={{ overflowX: "auto" }}>
            <table className="table table-hover mb-0">
              <thead>
                <tr><th>No</th><th>ID</th><th>Nama</th><th>No HP</th><th>Email</th><th>Jurusan</th><th>Aksi</th></tr>
              </thead>
              <tbody>
                {filtered.map((p, i) => (
                  <tr key={p.id}>
                    <td style={{ color: "#94a3b8", fontSize: 13 }}>{i + 1}</td>
                    <td><span className="timestamp-badge">{p.id}</span></td>
                    <td style={{ fontWeight: 600 }}>{p.username}</td>
                    <td style={{ fontFamily: "monospace", fontSize: 13 }}>{p.no_hp}</td>
                    <td style={{ fontSize: 13 }}>{p.email}</td>
                    <td>
                      <span style={{ display: "inline-block", padding: "3px 10px", background: "#eff6ff", color: "#2563eb", borderRadius: 20, fontSize: 11, fontWeight: 600 }}>
                        {p.nama_jurusan.split(" ").slice(0, 3).join(" ")}...
                      </span>
                    </td>
                    <td style={{ display: "flex", gap: 6 }}>
                      <button className="btn btn-sm btn-outline-primary" style={{ fontSize: 12, borderRadius: 8 }} onClick={() => navigate(`/user/${p.id}`)}>
                        <i className="bi bi-person me-1"></i> Profil
                      </button>
                      <button className="btn btn-sm btn-outline-success" style={{ fontSize: 12, borderRadius: 8 }} onClick={() => navigate(`/sertifikat/${p.id}`)}>
                        <i className="bi bi-eye me-1"></i> Sertifikat
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <div className="empty-state">
                <i className="bi bi-search" style={{ fontSize: 32, color: "#cbd5e1" }}></i>
                <p className="text-muted mt-2">Tidak ada peserta ditemukan</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
