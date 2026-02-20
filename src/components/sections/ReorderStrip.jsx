export default function ReorderStrip({ title, items }) {
  return (
    <div>
      <div
        style={{
          fontSize: "16px",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "10px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "flex",
          gap: "10px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              borderRadius: "14px",
              padding: "14px",
              minWidth: "140px",
              flexShrink: 0,
              cursor: "pointer",
            }}
          >
            <div style={{ fontSize: "30px", marginBottom: "8px" }}>
              {item.img}
            </div>
            <div
              style={{
                fontSize: "12px",
                fontWeight: 700,
                color: "#fff",
                marginBottom: "2px",
              }}
            >
              {item.name}
            </div>
            <div
              style={{
                fontSize: "11px",
                color: "rgba(255,255,255,0.35)",
                marginBottom: "10px",
              }}
            >
              {item.item}
            </div>
            <div
              style={{
                background: "#ef4444",
                color: "#fff",
                borderRadius: "8px",
                padding: "5px 0",
                fontSize: "11px",
                fontWeight: 700,
                textAlign: "center",
              }}
            >
              ₹{item.price} · Reorder
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
