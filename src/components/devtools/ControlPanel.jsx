export default function ControlPanel({ ctx, setCtx }) {
  const CITIES = [
    "Mumbai",
    "Bangalore",
    "Hyderabad",
    "Delhi",
    "Pune",
    "Chennai",
    "Ahmedabad",
    "Surat",
    "Jaipur",
    "Kolkata",
  ];

  const set = (key, val) => setCtx((c) => ({ ...c, [key]: val }));
  const toggle = (key) => setCtx((c) => ({ ...c, [key]: !c[key] }));

  const Knob = ({ label, field, min, max }) => (
    <div style={{ marginBottom: "14px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "4px",
        }}
      >
        <span
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.45)",
            fontWeight: 600,
          }}
        >
          {label}
        </span>
        <span style={{ fontSize: "11px", color: "#fff", fontWeight: 700 }}>
          {field === "hour" ? `${ctx[field]}:00` : ctx[field]}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={ctx[field]}
        onChange={(e) => set(field, Number(e.target.value))}
        style={{ width: "100%", accentColor: "#ef4444" }}
      />
    </div>
  );

  const Toggle = ({ field, label }) => (
    <div
      onClick={() => toggle(field)}
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        background: "rgba(255,255,255,0.04)",
        borderRadius: "8px",
        padding: "10px 12px",
        cursor: "pointer",
        marginBottom: "8px",
      }}
    >
      <span style={{ fontSize: "12px", color: "rgba(255,255,255,0.65)" }}>
        {label}
      </span>
      <div
        style={{
          width: "36px",
          height: "20px",
          borderRadius: "10px",
          background: ctx[field] ? "#ef4444" : "rgba(255,255,255,0.12)",
          position: "relative",
          transition: "background 0.2s",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "3px",
            left: ctx[field] ? "18px" : "3px",
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
          }}
        />
      </div>
    </div>
  );

  return (
    <div
      style={{
        background: "#0d0d0d",
        border: "1px solid rgba(255,255,255,0.08)",
        borderRadius: "16px",
        padding: "20px",
      }}
    >
      <div
        style={{
          fontSize: "11px",
          fontWeight: 800,
          color: "#ef4444",
          letterSpacing: "1.5px",
          marginBottom: "18px",
        }}
      >
        ⚙️ USER CONTEXT
      </div>

      <Knob label="Age" field="age" min={16} max={65} />
      <Knob label="Hour of Day" field="hour" min={0} max={23} />
      <Knob label="Order Count" field="orderCount" min={0} max={20} />

      <div style={{ marginBottom: "14px" }}>
        <div
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.45)",
            fontWeight: 600,
            marginBottom: "6px",
          }}
        >
          CITY
        </div>
        <select
          value={ctx.city}
          onChange={(e) => set("city", e.target.value)}
          style={{
            width: "100%",
            background: "rgba(255,255,255,0.07)",
            border: "1px solid rgba(255,255,255,0.12)",
            borderRadius: "8px",
            padding: "8px 12px",
            color: "#fff",
            fontSize: "12px",
          }}
        >
          {CITIES.map((c) => (
            <option key={c} value={c} style={{ background: "#1a1a1a" }}>
              {c}
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginBottom: "14px" }}>
        <div
          style={{
            fontSize: "11px",
            color: "rgba(255,255,255,0.45)",
            fontWeight: 600,
            marginBottom: "6px",
          }}
        >
          DIET
        </div>
        <div style={{ display: "flex", gap: "6px" }}>
          {["nonveg", "veg"].map((d) => (
            <button
              key={d}
              onClick={() => set("dietType", d)}
              style={{
                flex: 1,
                background:
                  ctx.dietType === d ? "#ef4444" : "rgba(255,255,255,0.07)",
                border: "none",
                borderRadius: "8px",
                padding: "8px",
                color: ctx.dietType === d ? "#fff" : "rgba(255,255,255,0.5)",
                fontSize: "12px",
                fontWeight: 600,
                cursor: "pointer",
              }}
            >
              {d === "veg" ? "🥦 Veg" : "🥩 Non-Veg"}
            </button>
          ))}
        </div>
      </div>

      <Toggle field="isPremium" label="⭐ Premium Member" />
      <Toggle field="isNewUser" label="🎉 New User" />
      <Toggle field="hasActiveOrder" label="🛵 Has Active Order" />
    </div>
  );
}
