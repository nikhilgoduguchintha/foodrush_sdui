import { ComponentRegistry } from "../../registry/ComponentRegistry";

/**
 * The "dumb client" — knows nothing about business logic.
 * Just maps type → Component and renders.
 * This is the entire SDUI client contract.
 */
export default function SDUIRenderer({ sections }) {
  if (!sections.length) {
    return (
      <div
        style={{
          textAlign: "center",
          padding: "60px 20px",
          color: "rgba(255,255,255,0.2)",
          fontSize: "14px",
        }}
      >
        No sections for this user context.
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
      {sections.map((section, index) => {
        const Component = ComponentRegistry[section.type];
        console.log(section);
        if (!Component) {
          console.warn(`No component registered for type: "${section.type}"`);
          return null;
        }
        return (
          <div
            key={section.id}
            style={{
              animation: "fadeUp 0.35s ease both",
              animationDelay: `${index * 0.055}s`,
            }}
          >
            <Component {...section.props} />
          </div>
        );
      })}
    </div>
  );
}
