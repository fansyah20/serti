import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { loginDummy, DUMMY_PESERTA } from "../data/peserta.js";

export default function LoginPage({ onLogin }) {
  const navigate = useNavigate();
  const MySwal = withReactContent(Swal);
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({ username: "", pin: "" });
  const [showHint, setShowHint] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulasi delay seperti real API
    setTimeout(() => {
      const result = loginDummy(form.username, form.pin);
      setIsLoading(false);

      if (!result.success) {
        MySwal.fire({
          title: "Login Gagal!",
          text: result.message,
          icon: "error",
          width: "320px",
          confirmButtonColor: "#ef4444",
          customClass: { icon: "swal2-small-icon", title: "swal2-small-title" },
        });
        return;
      }

      MySwal.fire({
        title: "Berhasil!",
        text: "Selamat datang, " + result.user.username + "!",
        icon: "success",
        width: "320px",
        confirmButtonColor: "#10b981",
        timer: 1500,
        showConfirmButton: false,
        customClass: { icon: "swal2-small-icon", title: "swal2-small-title" },
      }).then(() => {
        onLogin(result.token, result.role_id, result.user);
        navigate(result.role_id === 1 ? "/admin" : "/user");
      });
    }, 600);
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">
            <i className="bi bi-patch-check-fill"></i>
          </div>
          <h1 className="login-title">SERTIFIKAT PESERTA</h1>
          <p className="login-subtitle">Rembug B1 · PT. GEO MANDIRI KREASI</p>
        </div>

        {/* Banner mode dummy */}
        <div
          style={{
            margin: "0 0 20px",
            padding: "10px 16px",
            background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
            border: "1px solid #bbf7d0",
            borderRadius: 12,
            textAlign: "center",
          }}
        >
          <p style={{ fontSize: 12, color: "#15803d", margin: 0, fontWeight: 600 }}>
            🔧 Mode Preview — Data Dummy (Tanpa Backend)
          </p>
          <button
            type="button"
            onClick={() => setShowHint(!showHint)}
            style={{
              background: "none", border: "none", color: "#16a34a",
              fontSize: 11, cursor: "pointer", marginTop: 4, textDecoration: "underline",
            }}
          >
            {showHint ? "Sembunyikan akun demo" : "Lihat akun demo →"}
          </button>
          {showHint && (
            <div style={{ marginTop: 10, textAlign: "left" }}>
              <p style={{ fontSize: 11, color: "#166534", margin: "0 0 6px", fontWeight: 700 }}>
                Semua peserta pakai PIN: <code style={{ background: "#bbf7d0", padding: "1px 6px", borderRadius: 4 }}>12345</code>
              </p>
              <div style={{ maxHeight: 120, overflowY: "auto" }}>
                {DUMMY_PESERTA.slice(0, 8).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() => setForm({ username: p.username, pin: "12345" })}
                    style={{
                      display: "block", width: "100%", textAlign: "left",
                      background: "rgba(255,255,255,0.6)", border: "1px solid #bbf7d0",
                      borderRadius: 6, padding: "5px 8px", marginBottom: 4,
                      fontSize: 11, color: "#14532d", cursor: "pointer", fontFamily: "inherit",
                    }}
                  >
                    👤 {p.username}
                  </button>
                ))}
                <p style={{ fontSize: 10, color: "#6b7280", margin: "4px 0 0", textAlign: "center" }}>
                  +{DUMMY_PESERTA.length - 8} peserta lainnya tersedia
                </p>
              </div>
            </div>
          )}
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="mb-4">
            <label className="form-label fw-semibold">Nama</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-person-fill"></i>
              </span>
              <input
                type="text"
                name="username"
                className="form-control text-on-small"
                placeholder="Masukkan nama lengkap"
                value={form.username}
                onChange={handleChange}
                required
                autoComplete="off"
                list="username-list"
              />
              <datalist id="username-list">
                {DUMMY_PESERTA.map((p) => (
                  <option key={p.id} value={p.username} />
                ))}
              </datalist>
            </div>
          </div>

          <div className="mb-4">
            <label className="form-label fw-semibold">PIN</label>
            <div className="input-group">
              <span className="input-group-text">
                <i className="bi bi-key-fill"></i>
              </span>
              <input
                type="password"
                name="pin"
                className="form-control text-on-small"
                placeholder="Masukkan PIN (default: 12345)"
                value={form.pin}
                onChange={handleChange}
                required
                maxLength={10}
                inputMode="numeric"
              />
            </div>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 btn-login"
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Masuk...
              </>
            ) : (
              <>
                <i className="bi bi-box-arrow-in-right me-2"></i>
                Masuk
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
}
