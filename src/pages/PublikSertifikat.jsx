import { useParams, useNavigate } from "react-router-dom";
import { getPesertaById } from "../data/peserta.js";
import SertifikatCard from "./components/SertifikatCard.jsx";

// Halaman PUBLIK — tidak perlu login
// Muncul saat QR di-scan → menampilkan data peserta
// Data diambil dari dummy data berdasarkan ID di URL
export default function PublikSertifikat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const peserta = getPesertaById(id);

  if (!peserta) {
    return (
      <div style={styles.wrapper}>
        <div style={styles.orbTop} />
        <div style={styles.orbBottom} />
        <div style={{ ...styles.card, padding: 40, textAlign: "center", position: "relative", zIndex: 1 }}>
          <div style={{ fontSize: 52, marginBottom: 16 }}>🔍</div>
          <h3 style={{ color: "#0f172a", fontWeight: 800, marginBottom: 8 }}>Peserta Tidak Ditemukan</h3>
          <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6, marginBottom: 20 }}>
            ID <code style={{ background: "#f1f5f9", padding: "2px 8px", borderRadius: 6, color: "#3b82f6" }}>{id}</code> tidak terdapat dalam data.
          </p>
          <button
            onClick={() => navigate("/")}
            style={{
              padding: "10px 24px", background: "#2563eb", color: "#fff",
              border: "none", borderRadius: 10, cursor: "pointer",
              fontWeight: 600, fontSize: 14, fontFamily: "inherit",
            }}
          >
            Kembali ke Login
          </button>
        </div>
        <style>{spinStyle}</style>
      </div>
    );
  }

  return (
    <div style={styles.wrapper}>
      <div style={styles.orbTop} />
      <div style={styles.orbBottom} />

      <div style={{ width: "100%", maxWidth: 460, position: "relative", zIndex: 1 }}>
        {/* Verified badge */}
        <div style={{ textAlign: "center", marginBottom: 16 }}>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            background: "rgba(16,185,129,0.15)", border: "1px solid rgba(16,185,129,0.3)",
            borderRadius: 20, padding: "6px 16px", fontSize: 12, color: "#34d399", fontWeight: 600,
          }}>
            <i className="bi bi-check-circle-fill"></i> Sertifikat Terverifikasi
          </span>
        </div>

        {/* Main card */}
        <div style={styles.card}>
          {/* Header */}
          <div style={styles.cardHeader}>
            <div style={styles.headerIcon}>
              <i className="bi bi-patch-check-fill" style={{ fontSize: 26, color: "#fff" }}></i>
            </div>
            <small style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", display: "block", marginBottom: 8 }}>
              REMBUG B1 · BBPVP BEKASI
            </small>
            <h2 style={{ color: "#fff", fontSize: 20, fontWeight: 800, margin: "0 0 4px", letterSpacing: "-0.02em" }}>
              {peserta.username}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.55)", fontSize: 13, margin: 0 }}>
              {peserta.nama_jurusan}
            </p>
          </div>

          {/* Data peserta */}
          <div style={{ padding: "24px 24px 0" }}>
            <p style={styles.sectionLabel}>Data Peserta</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>

              <div style={styles.infoItem}>
                <div style={{ ...styles.infoIcon, background: "#eff6ff" }}>
                  <i className="bi bi-person-fill" style={{ color: "#2563eb", fontSize: 16 }}></i>
                </div>
                <div>
                  <div style={styles.infoLabel}>Nama Lengkap</div>
                  <div style={styles.infoValue}>{peserta.username}</div>
                </div>
              </div>

              <div style={styles.infoItem}>
                <div style={{ ...styles.infoIcon, background: "#f0fdf4" }}>
                  <i className="bi bi-telephone-fill" style={{ color: "#16a34a", fontSize: 16 }}></i>
                </div>
                <div>
                  <div style={styles.infoLabel}>Nomor HP</div>
                  <div style={styles.infoValue}>{peserta.no_hp}</div>
                </div>
              </div>

              {/* <div style={styles.infoItem}>
                <div style={{ ...styles.infoIcon, background: "#fdf4ff" }}>
                  <i className="bi bi-envelope-fill" style={{ color: "#9333ea", fontSize: 16 }}></i>
                </div>
                <div>
                  <div style={styles.infoLabel}>Email</div>
                  <div style={styles.infoValue}>{peserta.email}</div>
                </div>
              </div> */}

              <div style={styles.infoItem}>
                <div style={{ ...styles.infoIcon, background: "#fff7ed" }}>
                  <i className="bi bi-mortarboard-fill" style={{ color: "#ea580c", fontSize: 16 }}></i>
                </div>
                <div>
                  <div style={styles.infoLabel}>Jurusan / Program</div>
                  <div style={styles.infoValue}>{peserta.nama_jurusan}</div>
                </div>
              </div>

            </div>
          </div>

          {/* Foto Sertifikat */}
          <div style={{ padding: "0 24px 24px" }}>
            <p style={styles.sectionLabel}>Sertifikat</p>
            <SertifikatCard peserta={peserta} />

            {/* Tombol Lihat QR Sertifikat */}
            <button
              className="btn btn-success w-100 mb-2"
              onClick={() => navigate(`/user/${peserta.id}/sertifikat`)}
              style={{ fontWeight: 700, marginTop: 16 }}
            >
              <i className="bi bi-patch-check-fill me-2"></i>
              Lihat QR Sertifikat Saya
            </button>

            {/* Tombol Kembali */}
            <button
              className="btn btn-outline-secondary w-100 mt-1"
              onClick={() => navigate(`/`)}
            >
              <i className="bi bi-arrow-left me-2"></i>
              Kembali ke Halaman Utama
            </button>
          </div>

          {/* Card footer */}
          <div style={{
            borderTop: "1px solid #f1f5f9", padding: "12px 24px",
            display: "flex", justifyContent: "space-between", alignItems: "center",
          }}>
            
            {/* <span style={{ fontSize: 10, color: "#94a3b8" }}>
              ID Peserta: <strong style={{ color: "#64748b" }}>{peserta.id}</strong>
            </span> */}
            <span style={{ fontSize: 10, color: "#94a3b8" }}>PT. GEO MANDIRI KREASI</span>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.25)", marginTop: 16 }}>
          Halaman ini resmi dan dapat diakses publik
        </p>
      </div>
      <style>{spinStyle}</style>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f172a 100%)",
    display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    padding: "24px 16px", position: "relative", overflow: "hidden",
  },
  orbTop: {
    position: "absolute", width: 500, height: 500, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(37,99,235,0.15) 0%, transparent 70%)",
    top: -150, right: -150, pointerEvents: "none",
  },
  orbBottom: {
    position: "absolute", width: 350, height: 350, borderRadius: "50%",
    background: "radial-gradient(circle, rgba(245,158,11,0.08) 0%, transparent 70%)",
    bottom: -100, left: -100, pointerEvents: "none",
  },
  card: {
    background: "#fff", borderRadius: 20, overflow: "hidden",
    boxShadow: "0 24px 64px rgba(0,0,0,0.35)",
  },
  cardHeader: {
    background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 100%)",
    padding: "24px 24px 20px", textAlign: "center",
  },
  headerIcon: {
    width: 56, height: 56, background: "rgba(255,255,255,0.12)",
    border: "1.5px solid rgba(255,255,255,0.2)", borderRadius: 16,
    display: "flex", alignItems: "center", justifyContent: "center",
    margin: "0 auto 12px",
  },
  sectionLabel: {
    fontSize: 10, fontWeight: 700, color: "#94a3b8",
    textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 12,
  },
  infoItem: {
    display: "flex", alignItems: "center", gap: 12,
    padding: "12px 14px", background: "#f8fafc",
    borderRadius: 12, border: "1px solid #f1f5f9",
  },
  infoIcon: {
    width: 36, height: 36, borderRadius: 10,
    display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
  },
  infoLabel: {
    fontSize: 10, color: "#94a3b8", fontWeight: 700,
    textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: 2,
  },
  infoValue: { fontSize: 14, color: "#1e293b", fontWeight: 600 },
};

const spinStyle = `@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`;
