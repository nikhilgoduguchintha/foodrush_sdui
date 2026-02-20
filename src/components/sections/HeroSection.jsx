export default function HeroSection({ title, sub, badge, from, to }) {
  return (
    <div
      style={{
        background: `linear-gradient(135deg, ${from}, ${to})`,
        borderRadius: "16px",
        padding: "28px 24px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: -40,
          right: -40,
          width: 180,
          height: 180,
          borderRadius: "50%",
          background: "rgba(255,255,255,0.04)",
        }}
      />
      <div
        style={{
          display: "inline-block",
          background: "rgba(255,255,255,0.15)",
          borderRadius: "20px",
          padding: "3px 12px",
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        {badge}
      </div>
      <div
        style={{
          fontSize: "22px",
          fontWeight: 800,
          color: "#fff",
          lineHeight: 1.2,
          marginBottom: "6px",
        }}
      >
        {title}
      </div>
      <div style={{ fontSize: "13px", color: "rgba(255,255,255,0.65)" }}>
        {sub}
      </div>
    </div>
  );
}
