const STEPS = ["Order placed", "Preparing", "Out for delivery", "Delivered"];

export default function OrderTracker({ restaurant, eta, step }) {
  return (
    <div
      style={{
        background: "linear-gradient(135deg, #0a2e0a, #0d3d10)",
        border: "1px solid #22c55e44",
        borderRadius: "14px",
        padding: "18px 20px",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "16px",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "10px",
              color: "#22c55e",
              fontWeight: 700,
              letterSpacing: "1px",
            }}
          >
            🔴 LIVE ORDER
          </div>
          <div style={{ fontSize: "16px", fontWeight: 700, color: "#fff" }}>
            {restaurant}
          </div>
        </div>
        <div
          style={{
            background: "#22c55e",
            color: "#000",
            borderRadius: "10px",
            padding: "6px 14px",
            fontSize: "14px",
            fontWeight: 800,
          }}
        >
          🛵 {eta}
        </div>
      </div>
      <div style={{ display: "flex", gap: "4px" }}>
        {STEPS.map((s, i) => (
          <div
            key={i}
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "4px",
                borderRadius: "2px",
                background: i <= step ? "#22c55e" : "rgba(255,255,255,0.1)",
                transition: "background 0.4s",
              }}
            />
            <div
              style={{
                fontSize: "9px",
                textAlign: "center",
                color: i <= step ? "#22c55e" : "rgba(255,255,255,0.25)",
                fontWeight: i === step ? 700 : 400,
              }}
            >
              {s}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
