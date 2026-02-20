import { useState } from "react";
import { useSDUI } from "./hooks/useSDUI";
import SDUIRenderer from "./components/renderer/SDUIRenderer";
import ControlPanel from "./components/devtools/ControlPanel";
import JSONInspector from "./components/devtools/JSONInspector";

const DEFAULT_CONTEXT = {
  age: 25,
  city: "Bangalore",
  isPremium: false,
  isNewUser: true,
  orderCount: 0,
  hour: 14,
  dietType: "nonveg",
  hasActiveOrder: false,
};

export default function App() {
  const [ctx, setCtx] = useState(DEFAULT_CONTEXT);
  const { sections, loading } = useSDUI(ctx);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#080808",
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
      }}
    >
      <style>{`
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes loadingBar {
          from { width: 0%; }
          to   { width: 100%; }
        }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 4px; height: 4px; }
        ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.12); border-radius: 2px; }
        select option { background: #1a1a1a; }
      `}</style>

      {/* Loading bar — fixed at very top */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          height: "2px",
          width: "100%",
          zIndex: 999,
        }}
      >
        {loading && (
          <div
            style={{
              height: "100%",
              background: "linear-gradient(90deg, #ef4444, #f97316)",
              animation: "loadingBar 3s linear forwards",
            }}
          />
        )}
      </div>

      {/* App Header */}
      <div
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "rgba(8,8,8,0.92)",
          backdropFilter: "blur(20px)",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          padding: "14px 24px",
          display: "flex",
          alignItems: "center",
          gap: "12px",
        }}
      >
        <span style={{ fontSize: "22px" }}>🍔</span>
        <div>
          <div style={{ fontSize: "16px", fontWeight: 800, color: "#fff" }}>
            FoodRush
          </div>
          <div
            style={{
              fontSize: "9px",
              color: "#ef4444",
              fontWeight: 700,
              letterSpacing: "1.5px",
            }}
          >
            SDUI DEMO
          </div>
        </div>
        <div
          style={{
            marginLeft: "auto",
            fontSize: "11px",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          {loading ? "⏳ fetching layout..." : `✓ ${sections.length} sections`}
        </div>
      </div>

      {/* Main layout */}
      <div
        style={{
          maxWidth: "1100px",
          margin: "0 auto",
          padding: "24px 16px",
          display: "grid",
          gridTemplateColumns: "1fr 320px",
          gap: "24px",
          alignItems: "start",
        }}
      >
        {/* LEFT — the app screen */}
        <div
          style={{
            background: "#111",
            border: "1px solid rgba(255,255,255,0.07)",
            borderRadius: "20px",
            padding: "16px",
            minHeight: "400px",
            boxShadow: "0 0 80px rgba(239,68,68,0.04)",
            position: "relative",
          }}
        >
          {/* Overlay — dims old sections while new layout loads */}
          {loading && sections.length > 0 && (
            <div
              style={{
                position: "absolute",
                inset: 0,
                background: "rgba(0,0,0,0.4)",
                borderRadius: "20px",
                zIndex: 10,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backdropFilter: "blur(2px)",
              }}
            >
              <div
                style={{
                  fontSize: "12px",
                  color: "rgba(255,255,255,0.5)",
                  fontWeight: 600,
                  letterSpacing: "1px",
                }}
              >
                ⏳ Updating layout...
              </div>
            </div>
          )}

          {/* Initial load — no sections yet */}
          {sections.length === 0 ? (
            <div
              style={{
                padding: "60px 0",
                textAlign: "center",
                color: "rgba(255,255,255,0.2)",
                fontSize: "13px",
              }}
            >
              Loading layout...
            </div>
          ) : (
            <SDUIRenderer sections={sections} />
          )}
        </div>

        {/* RIGHT — devtools */}
        <div style={{ position: "sticky", top: "72px" }}>
          <ControlPanel ctx={ctx} setCtx={setCtx} />
          <JSONInspector sections={sections} />

          {/* Rules legend */}
          <div
            style={{
              marginTop: "10px",
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "12px",
              padding: "14px",
            }}
          >
            <div
              style={{
                fontSize: "9px",
                color: "rgba(255,255,255,0.25)",
                fontWeight: 700,
                letterSpacing: "1.5px",
                marginBottom: "10px",
              }}
            >
              ACTIVE DECISION RULES
            </div>
            {[
              ["Alcohol Banner", "Age ≥ 21 + metro city + 11am–11pm"],
              ["Late Night", "Hour ≥ 23 OR ≤ 4"],
              ["Breakfast", "Hour 6–10"],
              ["Lunch Rush", "Hour 12–14"],
              ["Veg Strip", "Diet = veg OR city in GJ/RJ"],
              ["Premium Upsell", "Not premium + orders ≥ 2"],
              ["Onboarding", "New user + 0 orders"],
              ["Reorder Strip", "Returning + orders > 0"],
              ["City Banner", "City = MUM/BLR/HYD"],
              [
                "Super Saver",
                "Not premium + (new user OR lapsed user at meal time)",
              ],
            ].map(([r, c]) => (
              <div
                key={r}
                style={{ display: "flex", gap: "8px", marginBottom: "5px" }}
              >
                <span
                  style={{
                    fontSize: "10px",
                    color: "#ef4444",
                    fontWeight: 700,
                    minWidth: "100px",
                  }}
                >
                  {r}
                </span>
                <span
                  style={{ fontSize: "10px", color: "rgba(255,255,255,0.28)" }}
                >
                  {c}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
