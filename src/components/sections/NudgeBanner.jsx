export default function NudgeBanner({ msg, icon }) {
  return (
    <div
      style={{
        background: "rgba(234,179,8,0.08)",
        border: "1px solid rgba(234,179,8,0.25)",
        borderRadius: "12px",
        padding: "12px 16px",
        display: "flex",
        gap: "10px",
        alignItems: "center",
      }}
    >
      <span style={{ fontSize: "20px" }}>{icon}</span>
      <span style={{ fontSize: "12px", color: "#fde68a", lineHeight: 1.4 }}>
        {msg}
      </span>
    </div>
  );
}
