import { useState } from "react";

export default function JSONInspector({ sections }) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ marginTop: "10px" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          width: "100%",
          background: "rgba(99,102,241,0.12)",
          border: "1px solid rgba(99,102,241,0.35)",
          borderRadius: "10px",
          padding: "10px 14px",
          color: "#818cf8",
          fontSize: "11px",
          fontWeight: 700,
          cursor: "pointer",
          letterSpacing: "0.5px",
          textAlign: "left",
        }}
      >
        {open ? "▲" : "▼"} SERVER RESPONSE · {sections.length} sections rendered
      </button>

      {open && (
        <div
          style={{
            background: "#05050f",
            border: "1px solid rgba(99,102,241,0.2)",
            borderRadius: "10px",
            padding: "14px",
            marginTop: "6px",
            maxHeight: "280px",
            overflowY: "auto",
          }}
        >
          <pre
            style={{
              margin: 0,
              fontFamily: "monospace",
              fontSize: "10px",
              color: "#a5b4fc",
              lineHeight: 1.7,
              whiteSpace: "pre-wrap",
            }}
          >
            {JSON.stringify(sections, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
