import { ImageResponse } from "next/og";

export const alt = "Axiom Forge Systems project brief";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "62px 72px", background: "#11181d", color: "#f4f5f6", fontFamily: "Arial" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 22, letterSpacing: 4, color: "#ff5a1f" }}><span>AXIOM</span><span style={{ color: "#929ba6", fontSize: 16, letterSpacing: 3 }}>FORGE SYSTEMS / PROJECT INTAKE</span></div>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}><div style={{ color: "#ff5a1f", fontSize: 18, letterSpacing: 4 }}>PREPARE A BRIEF</div><div style={{ fontSize: 68, fontWeight: 700, letterSpacing: -3, lineHeight: 1.02 }}>Start with the operating reality.</div><div style={{ color: "#aeb8bf", fontSize: 24 }}>A structured, local-only project brief for an engineering conversation</div></div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", borderTop: "1px solid #38464f", paddingTop: 18, color: "#79858d", fontSize: 15 }}><span>Five-step intake flow</span><span>Demo behavior · no backend transmission</span></div>
    </div>,
    { ...size },
  );
}
