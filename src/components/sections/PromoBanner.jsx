export default function PromoBanner({ icon, label, title, sub, accent, bg }) {
  return (
    <div
      style={{
        background: bg,
        borderRadius: "14px",
        padding: "18px 20px",
        border: `1px solid ${accent}33`,
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}
    >
      <div
        style={{
          fontSize: "28px",
          width: "54px",
          height: "54px",
          borderRadius: "14px",
          background: `${accent}22`,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <div style={{ flex: 1 }}>
        <div
          style={{
            fontSize: "10px",
            fontWeight: 700,
            letterSpacing: "1.5px",
            color: accent,
            marginBottom: "3px",
          }}
        >
          {label}
        </div>
        <div
          style={{
            fontSize: "15px",
            fontWeight: 700,
            color: "#fff",
            marginBottom: "2px",
          }}
        >
          {title}
        </div>
        <div style={{ fontSize: "12px", color: "rgba(255,255,255,0.45)" }}>
          {sub}
        </div>
      </div>
      <button
        style={{
          background: accent,
          color: "#000",
          borderRadius: "8px",
          padding: "8px 14px",
          fontSize: "12px",
          fontWeight: 700,
          border: "none",
          cursor: "pointer",
          flexShrink: 0,
        }}
      >
        Order →
      </button>
    </div>
  );
}
