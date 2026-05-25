import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DUMMY_PESERTA } from "../data/peserta.js";

const JURUSAN_COLORS = {
  "Pengembangan web dengan node JS dan react JS": { bg: "#eff6ff", color: "#2563eb", border: "#bfdbfe" },
  "Pengelolaan Logistik Melalui Teknologi Informasi": { bg: "#f0fdf4", color: "#2563eb", border: "#e9d5ff" },
  "Pemasangan Sistem Integrasi Bangunan Cerdas": { bg: "#fdf4ff", color: "#9333ea", border: "#e9d5ff" },
};

function getColor(jurusan) {
  return JURUSAN_COLORS[jurusan] || { bg: "#f8fafc", color: "#475569", border: "#e2e8f0" };
}

function getInitial(nama) {
  return nama.split(" ").slice(0, 2).map((w) => w[0]).join("").toUpperCase();
}

const AVATAR_GRADIENTS = [
  "linear-gradient(135deg,#2563eb,#7c3aed)",
  "linear-gradient(135deg,#0891b2,#0e7490)",
  "linear-gradient(135deg,#d97706,#b45309)",
  "linear-gradient(135deg,#16a34a,#15803d)",
  "linear-gradient(135deg,#dc2626,#b91c1c)",
  "linear-gradient(135deg,#9333ea,#7e22ce)",
  "linear-gradient(135deg,#0284c7,#0369a1)",
  "linear-gradient(135deg,#059669,#047857)",
];

export default function PilihPeserta() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [filterJurusan, setFilterJurusan] = useState("semua");

  const jurusanList = [...new Set(DUMMY_PESERTA.map((p) => p.nama_jurusan))];

  const filtered = DUMMY_PESERTA.filter((p) => {
    const matchSearch = p.username.toLowerCase().includes(search.toLowerCase());
    const matchJurusan = filterJurusan === "semua" || p.nama_jurusan === filterJurusan;
    return matchSearch && matchJurusan;
  });

  return (
    <div style={styles.wrapper}>
      <div style={styles.orbTop} />
      <div style={styles.orbBottom} />

      <div style={{ width: "100%", maxWidth: 640, position: "relative", zIndex: 1 }}>

        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 28 }}>
          <div style={styles.logoBox}>
            <i className="bi bi-patch-check-fill" style={{ fontSize: 28, color: "#fff" }}></i>
          </div>
          <h1 style={{ color: "#fff", fontSize: 22, fontWeight: 800, marginBottom: 4, letterSpacing: "-0.02em" }}>
            Sertifikat QR — Rembug B1
          </h1>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 13, margin: 0 }}>
            PT. GEO MANDIRI KREASI · BBPVP Bekasi
          </p>
        </div>

        {/* Search & Filter card */}
        <div style={styles.filterCard}>
          {/* Search */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 14px", background: "#f8fafc", borderRadius: 10, border: "1.5px solid #e2e8f0", marginBottom: 12 }}>
            <i className="bi bi-search" style={{ color: "#94a3b8", fontSize: 14 }}></i>
            <input
              type="text"
              placeholder="Cari nama peserta..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{ border: "none", outline: "none", background: "transparent", fontSize: 14, color: "#1e293b", flex: 1, fontFamily: "inherit" }}
            />
            {search && (
              <button onClick={() => setSearch("")} style={{ border: "none", background: "none", cursor: "pointer", color: "#94a3b8", fontSize: 18, padding: 0, lineHeight: 1 }}>×</button>
            )}
          </div>

          {/* Filter chips */}
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {jurusanList.map((j) => {
              const c = getColor(j);

              const count = DUMMY_PESERTA.filter((p) => p.nama_jurusan === j).length;
              return (
                <button key={j} onClick={() => setFilterJurusan(j)} style={chipStyle(filterJurusan === j, c.color, c.bg, c.border)}>
                  {j.split(" ").slice(0, 2).join(" ")}... ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Count */}
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, marginBottom: 12, paddingLeft: 4 }}>
          Menampilkan {filtered.length} peserta
        </p>

        {/* Peserta list */}
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {filtered.map((p, i) => {
            const c = getColor(p.nama_jurusan);
            return (
              <div
                key={p.id}
                onClick={() => navigate(`/sertifikat/${p.id}`)}
                style={styles.pesertaCard}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow = "0 8px 32px rgba(0,0,0,0.3)";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
                }}
              >
                <div style={{ width: 44, height: 44, borderRadius: 12, flexShrink: 0, background: AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length], display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15, fontWeight: 800, color: "#fff" }}>
                  {getInitial(p.username)}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, color: "#fff", fontSize: 14, marginBottom: 4, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                    {p.username}
                  </div>
                  <span style={{ display: "inline-block", padding: "2px 10px", background: c.bg, color: c.color, border: `1px solid ${c.border}`, borderRadius: 20, fontSize: 10, fontWeight: 600 }}>
                    {p.nama_jurusan.split(" ").slice(0, 3).join(" ")}...
                  </span>
                </div>
                <div style={{ textAlign: "right", flexShrink: 0 }}>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,0.35)", marginBottom: 4 }}>ID #{p.id}</div>
                  <div style={{ width: 28, height: 28, borderRadius: 8, background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <i className="bi bi-chevron-right" style={{ color: "rgba(255,255,255,0.4)", fontSize: 12 }}></i>
                  </div>
                </div>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div style={{ textAlign: "center", padding: "48px 0", color: "rgba(255,255,255,0.3)" }}>
              <i className="bi bi-search" style={{ fontSize: 36, display: "block", marginBottom: 12 }}></i>
              <p style={{ margin: 0 }}>Tidak ada peserta ditemukan</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function chipStyle(active, color, bg, border) {
  return {
    padding: "5px 12px", borderRadius: 20, fontSize: 11, fontWeight: 600,
    cursor: "pointer", fontFamily: "inherit", transition: "all 0.15s",
    background: active ? bg : "rgba(255,255,255,0.06)",
    color: active ? color : "rgba(255,255,255,0.5)",
    border: active ? `1.5px solid ${border}` : "1.5px solid rgba(255,255,255,0.1)",
  };
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
    display: "flex", flexDirection: "column", alignItems: "center",
    padding: "32px 16px 48px", position: "relative", overflow: "hidden",
  },
  orbTop: { position: "absolute", width: 500, height: 500, borderRadius: "50%", background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)", top: -150, right: -150, pointerEvents: "none" },
  orbBottom: { position: "absolute", width: 350, height: 350, borderRadius: "50%", background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)", bottom: -100, left: -100, pointerEvents: "none" },
  logoBox: { width: 60, height: 60, background: "linear-gradient(135deg,#2563eb,#7c3aed)", borderRadius: 18, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", boxShadow: "0 8px 24px rgba(37,99,235,0.35)" },
  filterCard: { background: "#fff", borderRadius: 16, padding: "16px", marginBottom: 16, boxShadow: "0 4px 20px rgba(0,0,0,0.2)" },
  pesertaCard: { display: "flex", alignItems: "center", gap: 12, padding: "12px 16px", background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 14, cursor: "pointer", transition: "all 0.2s" },
};
