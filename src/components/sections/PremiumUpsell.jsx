export default function PremiumUpsell({ title, perks, cta }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a0a00, #3d1a00)",
        border: "1px solid #f59e0b44",
        borderRadius: "14px",
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "1.5px",
          color: "#f59e0b",
          marginBottom: "6px",
        }}
      >
        ✨ LIMITED OFFER
      </div>
      <div
        style={{
          fontSize: "15px",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "12px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          gap: "8px",
          flexWrap: "wrap",
          marginBottom: "14px",
        }}
      >
        {perks.map((p, i) => (
          <div
            key={i}
            style={{
              background: "rgba(245,158,11,0.12)",
              borderRadius: "20px",
              padding: "4px 12px",
              fontSize: "11px",
              color: "#fcd34d",
            }}
          >
            ✓ {p}
          </div>
        ))}
      </div>
      <button
        style={{
          background: "linear-gradient(90deg, #f59e0b, #fbbf24)",
          border: "none",
          borderRadius: "10px",
          padding: "12px 20px",
          color: "#000",
          fontWeight: 800,
          fontSize: "13px",
          cursor: "pointer",
          width: "100%",
        }}
      >
        {cta} →
      </button>
    </div>
  );
}
