import { useEffect, useRef } from "react";

// SertifikatCard — Menampilkan sertifikat peserta
// Menggunakan Canvas untuk generate gambar sertifikat
export default function SertifikatCard({ peserta }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!canvasRef.current || !peserta) return;
    drawSertifikat(canvasRef.current, peserta);
  }, [peserta]);

  const handleDownload = () => {
    if (!canvasRef.current) return;
    const link = document.createElement("a");
    link.download = `Sertifikat-${peserta.username.replace(/\s/g, "-")}.png`;
    link.href = canvasRef.current.toDataURL("image/png");
    link.click();
  };

  return (
    <div style={{ position: "relative", borderRadius: 14, overflow: "hidden", border: "1.5px solid #e2e8f0" }}>
      <canvas
        ref={canvasRef}
        width={800}
        height={560}
        style={{ width: "100%", display: "block", borderRadius: 12 }}
      />

      {/* Download button */}
      <button
        onClick={handleDownload}
        style={{
          position: "absolute", bottom: 12, right: 12,
          display: "inline-flex", alignItems: "center", gap: 6,
          background: "rgba(15,23,42,0.8)", backdropFilter: "blur(8px)",
          color: "#fff", fontSize: 12, fontWeight: 600,
          padding: "7px 14px", borderRadius: 20,
          border: "1px solid rgba(255,255,255,0.15)",
          cursor: "pointer", fontFamily: "inherit",
        }}
      >
        <i className="bi bi-download"></i> Unduh Sertifikat
      </button>

      {/* Keterangan dummy */}
      <div style={{
        position: "absolute", top: 10, left: 10,
        background: "rgba(245,158,11,0.9)", borderRadius: 8,
        padding: "3px 10px", fontSize: 10, fontWeight: 700, color: "#fff",
      }}>
        DEMO — Ganti dengan foto asli dari backend
      </div>
    </div>
  );
}

// ── Canvas drawing function ──
function drawSertifikat(canvas, peserta) {
  const ctx = canvas.getContext("2d");
  const W = canvas.width;
  const H = canvas.height;

  // Background gradient dark navy
  const bgGrad = ctx.createLinearGradient(0, 0, W, H);
  bgGrad.addColorStop(0, "#0f172a");
  bgGrad.addColorStop(0.5, "#1e3a5f");
  bgGrad.addColorStop(1, "#0f172a");
  ctx.fillStyle = bgGrad;
  ctx.fillRect(0, 0, W, H);

  // Outer gold border
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 5;
  ctx.strokeRect(16, 16, W - 32, H - 32);

  // Inner subtle border
  ctx.strokeStyle = "rgba(245,158,11,0.25)";
  ctx.lineWidth = 1.5;
  ctx.strokeRect(28, 28, W - 56, H - 56);

  // Corner ornaments
  drawCornerOrnament(ctx, 28, 28);
  drawCornerOrnament(ctx, W - 28, 28, true);
  drawCornerOrnament(ctx, 28, H - 28, false, true);
  drawCornerOrnament(ctx, W - 28, H - 28, true, true);

  // Top decorative dots row
  ctx.fillStyle = "rgba(245,158,11,0.3)";
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.arc(W / 2 - 110 + i * 20, 50, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Seal circle top center
  const cx = W / 2;
  const cy = 110;
  const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, 48);
  grad.addColorStop(0, "rgba(245,158,11,0.3)");
  grad.addColorStop(1, "rgba(245,158,11,0.05)");
  ctx.beginPath();
  ctx.arc(cx, cy, 48, 0, Math.PI * 2);
  ctx.fillStyle = grad;
  ctx.fill();
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 2;
  ctx.stroke();

  // Inner ring
  ctx.beginPath();
  ctx.arc(cx, cy, 38, 0, Math.PI * 2);
  ctx.strokeStyle = "rgba(245,158,11,0.4)";
  ctx.lineWidth = 1;
  ctx.stroke();

  // Star in seal
  drawStar(ctx, cx, cy, 5, 24, 10, "#f59e0b");

  // "SERTIFIKAT" word arc above the main title
  ctx.font = "bold 13px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.textAlign = "center";
  ctx.letterSpacing = "6px";
  ctx.fillText("✦  SERTIFIKAT KELULUSAN  ✦", cx, 185);

  // Horizontal divider
  drawGoldLine(ctx, cx, 196, W - 100);

  // Name
  ctx.font = "bold 38px Georgia, serif";
  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  ctx.shadowColor = "rgba(245,158,11,0.4)";
  ctx.shadowBlur = 20;
  ctx.fillText(peserta.username, cx, 252);
  ctx.shadowBlur = 0;

  // Subtitle line
  ctx.font = "14px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.fillText("telah berhasil menyelesaikan program OJT pada", cx, 280);

  // Program/jurusan
  ctx.font = "bold 16px sans-serif";
  ctx.fillStyle = "#fbbf24";
  wrapText(ctx, peserta.nama_jurusan, cx, 310, W - 120, 24);

  // Divider below
  drawGoldLine(ctx, cx, 355, W - 100);

  // Detail info row
  const infoY = 390;
  const col1 = W / 2 - 160;
  const col2 = W / 2 + 160;

  // Left: No HP
  ctx.font = "11px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.textAlign = "center";
  ctx.fillText("NOMOR HP", col1, infoY - 14);
  ctx.font = "bold 14px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText(peserta.no_hp, col1, infoY + 6);

  // Center divider
  ctx.strokeStyle = "rgba(245,158,11,0.3)";
  ctx.lineWidth = 1;
  ctx.beginPath(); ctx.moveTo(W / 2, infoY - 22); ctx.lineTo(W / 2, infoY + 12); ctx.stroke();

  // Right: Email
  ctx.font = "11px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.4)";
  ctx.textAlign = "center";
  ctx.fillText("EMAIL", col2, infoY - 14);
  ctx.font = "bold 13px sans-serif";
  ctx.fillStyle = "rgba(255,255,255,0.8)";
  ctx.fillText(peserta.email, col2, infoY + 6);

  // Bottom divider
  drawGoldLine(ctx, cx, 420, W - 100);

  // Footer
  ctx.font = "bold 11px monospace";
  ctx.fillStyle = "rgba(245,158,11,0.7)";
  ctx.textAlign = "center";
  ctx.letterSpacing = "2px";
  ctx.fillText("PT. GEO MANDIRI KREASI  ·  REMBUG B1  ·  BBPVP BEKASI", cx, 450);

  ctx.font = "10px monospace";
  ctx.fillStyle = "rgba(255,255,255,0.25)";
  ctx.letterSpacing = "1px";
  ctx.fillText(`ID PESERTA: ${peserta.id}  ·  ${new Date().getFullYear()}`, cx, 472);

  // Bottom decorative dots
  ctx.fillStyle = "rgba(245,158,11,0.3)";
  for (let i = 0; i < 12; i++) {
    ctx.beginPath();
    ctx.arc(W / 2 - 110 + i * 20, H - 50, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function drawGoldLine(ctx, cx, y, width) {
  const grad = ctx.createLinearGradient(cx - width / 2, y, cx + width / 2, y);
  grad.addColorStop(0, "transparent");
  grad.addColorStop(0.3, "rgba(245,158,11,0.6)");
  grad.addColorStop(0.7, "rgba(245,158,11,0.6)");
  grad.addColorStop(1, "transparent");
  ctx.strokeStyle = grad;
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(cx - width / 2, y);
  ctx.lineTo(cx + width / 2, y);
  ctx.stroke();
}

function drawCornerOrnament(ctx, x, y, flipX = false, flipY = false) {
  ctx.strokeStyle = "#f59e0b";
  ctx.lineWidth = 2;
  const s = 20;
  const dx = flipX ? -s : s;
  const dy = flipY ? -s : s;
  ctx.beginPath(); ctx.moveTo(x, y + dy); ctx.lineTo(x, y); ctx.lineTo(x + dx, y); ctx.stroke();
  ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2);
  ctx.fillStyle = "#f59e0b"; ctx.fill();
}

function drawStar(ctx, cx, cy, spikes, outerR, innerR, color) {
  let rot = (Math.PI / 2) * 3;
  const step = Math.PI / spikes;
  ctx.beginPath();
  ctx.moveTo(cx, cy - outerR);
  for (let i = 0; i < spikes; i++) {
    ctx.lineTo(cx + Math.cos(rot) * outerR, cy + Math.sin(rot) * outerR);
    rot += step;
    ctx.lineTo(cx + Math.cos(rot) * innerR, cy + Math.sin(rot) * innerR);
    rot += step;
  }
  ctx.lineTo(cx, cy - outerR);
  ctx.closePath();
  ctx.fillStyle = color;
  ctx.fill();
}

function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  let currentY = y;
  words.forEach((word) => {
    const testLine = line + word + " ";
    if (ctx.measureText(testLine).width > maxWidth && line !== "") {
      ctx.fillText(line.trim(), x, currentY);
      line = word + " ";
      currentY += lineHeight;
    } else {
      line = testLine;
    }
  });
  ctx.fillText(line.trim(), x, currentY);
}
