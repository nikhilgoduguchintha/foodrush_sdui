export default function CityBanner({ title, sub, icon }) {
  return (
    <div
      style={{
        background: "rgba(255,255,255,0.04)",
        border: "1px solid rgba(255,255,255,0.09)",
        borderRadius: "14px",
        padding: "16px 20px",
        display: "flex",
        alignItems: "center",
        gap: "14px",
      }}
    >
      <div style={{ fontSize: "36px" }}>{icon}</div>
      <div>
        <div style={{ fontSize: "15px", fontWeight: 700, color: "#fff" }}>
          {title}
        </div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
          {sub}
        </div>
      </div>
    </div>
  );
}
