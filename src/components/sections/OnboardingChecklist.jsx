export default function OnboardingChecklist({ title, steps }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0c1a3d, #1a2d5a)",
        border: "1px solid #3b82f633",
        borderRadius: "14px",
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          fontSize: "13px",
          fontWeight: 700,
          color: "#60a5fa",
          marginBottom: "14px",
        }}
      >
        🎯 {title}
      </div>
      {steps.map((s, i) => (
        <div
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "12px",
            marginBottom: i < steps.length - 1 ? "10px" : 0,
          }}
        >
          <div
            style={{
              width: "22px",
              height: "22px",
              borderRadius: "50%",
              flexShrink: 0,
              background: s.done ? "#3b82f6" : "rgba(255,255,255,0.08)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "11px",
              color: "#fff",
            }}
          >
            {s.done ? "✓" : i + 1}
          </div>
          <div
            style={{
              fontSize: "13px",
              color: s.done ? "rgba(255,255,255,0.35)" : "#fff",
              textDecoration: s.done ? "line-through" : "none",
            }}
          >
            {s.label}
          </div>
        </div>
      ))}
    </div>
  );
}
