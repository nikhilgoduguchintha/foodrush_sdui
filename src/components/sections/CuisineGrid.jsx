import { useState } from "react";

export default function CuisineGrid({ title, items }) {
  const [hovered, setHovered] = useState(null);
  return (
    <div>
      <div
        style={{
          fontSize: "16px",
          fontWeight: 700,
          color: "#fff",
          marginBottom: "12px",
        }}
      >
        {title}
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3,1fr)",
          gap: "8px",
        }}
      >
        {items.map((item, i) => (
          <div
            key={i}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              background:
                hovered === i
                  ? "rgba(255,255,255,0.12)"
                  : "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "12px",
              padding: "14px 8px",
              textAlign: "center",
              cursor: "pointer",
              fontSize: "12px",
              color: "rgba(255,255,255,0.7)",
              fontWeight: 600,
              transition: "background 0.2s",
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
}
