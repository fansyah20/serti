import { useNavigate, useParams } from "react-router-dom";
import QRCode from "react-qr-code";
import { getPesertaById } from "../../data/peserta.js";

export default function QrSertifikat() {
  const { id } = useParams();
  const navigate = useNavigate();
  const user = getPesertaById(id);

  if (!user) return null;

  // QR value = URL publik — ID tidak berubah → QR tidak pernah berubah
  const qrValue = `https://project-b3hek.vercel.app/sertifikat/${id}`;

  const handleDownload = () => {
    const svg = document.getElementById("qr-svg-el");
    if (!svg) return;
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    canvas.width = 300; canvas.height = 300;
    const ctx = canvas.getContext("2d");
    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = "#f8fafc";
      ctx.fillRect(0, 0, 300, 300);
      ctx.drawImage(img, 0, 0, 300, 300);
      const link = document.createElement("a");
      link.download = `QR-Sertifikat-${user.username.replace(/\s/g, "-")}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
    };
    img.src = "data:image/svg+xml;base64," + btoa(unescape(encodeURIComponent(svgData)));
  };

  return (
    <div className="login-wrapper position-relative">
      <div style={{ width: "100%", maxWidth: 420, position: "relative", zIndex: 1 }}>

        {/* Top bar */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
          <button onClick={() => navigate(`/sertifikat/${user.id}`)} style={styles.topBtn}>
            <i className="bi bi-arrow-left"></i> Kembali
          </button>
          <div style={styles.topIcon}><i className="bi bi-patch-check-fill" style={{ fontSize: 22, color: "#fff" }}></i></div>
          <button onClick={handleDownload} style={{ ...styles.topBtn, background: "rgba(37,99,235,0.25)", borderColor: "rgba(37,99,235,0.45)" }}>
            <i className="bi bi-download"></i> Unduh
          </button>
        </div>

        {/* Subtitle */}
        <div style={{ textAlign: "center", marginBottom: 20 }}>
          <h4 style={{ color: "#fff", fontWeight: 700, fontSize: 16, marginBottom: 4 }}>QR Sertifikat Peserta</h4>
          <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0 }}>
            QR ini bersifat <strong style={{ color: "#34d399" }}>permanen</strong> dan unik untuk setiap peserta
          </p>
        </div>

        {/* Card */}
        <div style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 20px 60px rgba(0,0,0,0.35)" }}>
          {/* Banner */}
          <div style={{ background: "linear-gradient(135deg,#0f172a,#1e3a5f)", padding: "20px 24px 18px", textAlign: "center" }}>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 10, letterSpacing: "0.12em", textTransform: "uppercase", margin: "0 0 6px" }}>
              REMBUG B1 · SERTIFIKAT PESERTA
            </p>
            <h3 style={{ color: "#fff", fontSize: 18, fontWeight: 800, margin: "0 0 4px" }}>{user.username}</h3>
            <p style={{ color: "rgba(255,255,255,0.5)", fontSize: 12, margin: 0 }}>{user.nama_jurusan}</p>
          </div>

          {/* QR */}
          <div style={{ padding: 24, textAlign: "center" }}>
            <div style={{ display: "inline-flex", padding: 16, background: "#f8fafc", borderRadius: 16, border: "1.5px solid #e2e8f0", boxShadow: "0 4px 16px rgba(0,0,0,0.06)", marginBottom: 16 }}>
              <QRCode
                id="qr-svg-el"
                value={qrValue}
                size={180}
                style={{ height: "auto", maxWidth: "100%", width: "100%" }}
                viewBox="0 0 256 256"
                fgColor="#0f172a"
                bgColor="#f8fafc"
              />
            </div>

            {/* Chips */}
            <div style={{ display: "flex", gap: 8, justifyContent: "center", flexWrap: "wrap", marginBottom: 14 }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#15803d", fontWeight: 600 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#16a34a", display: "inline-block" }} />
                Permanen · Tidak berubah
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 5, background: "#eff6ff", border: "1px solid #bfdbfe", borderRadius: 20, padding: "4px 12px", fontSize: 11, color: "#1d4ed8", fontWeight: 600 }}>
                <i className="bi bi-hash"></i> ID: {user.id}
              </span>
            </div>

            <p style={{ fontSize: 12, color: "#64748b", margin: "0 0 12px" }}>
              Scan QR ini untuk melihat data &amp; sertifikat peserta
            </p>

            {/* URL */}
            <div style={{ padding: "8px 12px", background: "#f8fafc", border: "1px solid #e2e8f0", borderRadius: 8 }}>
              <p style={{ fontSize: 10, color: "#94a3b8", margin: 0, wordBreak: "break-all", fontFamily: "monospace" }}>{qrValue}</p>
            </div>
          </div>

          {/* Footer */}
          <div style={{ borderTop: "1px solid #f1f5f9", padding: "12px 24px", display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontSize: 10, color: "#94a3b8" }}><i className="bi bi-shield-check" style={{ color: "#16a34a" }}></i> Terverifikasi</span>
            <span style={{ fontSize: 10, color: "#94a3b8" }}>PT. GEO MANDIRI KREASI</span>
          </div>
        </div>

        <p style={{ textAlign: "center", fontSize: 11, color: "rgba(255,255,255,0.3)", marginTop: 14 }}>
          QR ini membawa ke halaman data resmi peserta
        </p>
      </div>
    </div>
  );
}

const styles = {
  topBtn: {
    background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)",
    borderRadius: 10, padding: "8px 14px", color: "rgba(255,255,255,0.85)",
    fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex",
    alignItems: "center", gap: 6, fontFamily: "inherit",
  },
  topIcon: {
    width: 50, height: 50, background: "rgba(255,255,255,0.12)",
    border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 14,
    display: "flex", alignItems: "center", justifyContent: "center",
  },
};
