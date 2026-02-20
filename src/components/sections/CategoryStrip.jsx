import { useState } from "react";

const CATEGORIES = [
  "All",
  "Biryani",
  "Thali",
  "South Indian",
  "North Indian",
  "Chinese",
  "Desserts",
];

export default function CategoryStrip({ title, accent }) {
  const [active, setActive] = useState("All");
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
          gap: "8px",
          overflowX: "auto",
          paddingBottom: "4px",
        }}
      >
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setActive(c)}
            style={{
              background: active === c ? accent : "rgba(255,255,255,0.07)",
              border: "none",
              borderRadius: "20px",
              padding: "7px 16px",
              color: active === c ? "#000" : "rgba(255,255,255,0.55)",
              fontSize: "12px",
              fontWeight: 600,
              cursor: "pointer",
              whiteSpace: "nowrap",
              transition: "all 0.2s",
            }}
          >
            {c}
          </button>
        ))}
      </div>
    </div>
  );
}
