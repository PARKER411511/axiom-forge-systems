from pathlib import Path
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.platypus import Image, PageBreak, Paragraph, SimpleDocTemplate, Spacer, Table, TableStyle

ROOT = Path(__file__).parent
OUT = ROOT / "public"
ORANGE = colors.HexColor("#FF5A1F")
INK = colors.HexColor("#0A0C0F")
SLATE = colors.HexColor("#56616B")
LIGHT = colors.HexColor("#EEF1F3")

PRODUCTS = {
    "af-p900-process-pump": ("AF-P900", "PROCESS PUMP", "Industrial Pumps", "/images/pump.webp", [("Flow rate", "1,250 m3/h"), ("Maximum pressure", "40 bar"), ("Operating temperature", "-20 C to 180 C"), ("Materials", "316 SS / Duplex"), ("Drive", "Direct / VFD-ready")]),
    "af-x720-high-pressure-pump": ("AF-X720", "HIGH-PRESSURE PUMP", "Industrial Pumps", "/images/pump-x720.webp", [("Flow rate", "720 m3/h"), ("Maximum pressure", "80 bar"), ("Operating temperature", "-10 C to 160 C"), ("Materials", "316 stainless steel"), ("Efficiency", "Up to 91%")]),
    "vx-400-control-valve": ("VX-400", "CONTROL VALVE", "Flow Control", "/images/valve.webp", [("Size range", "DN25-DN300"), ("Pressure class", "PN16-PN100"), ("Temperature", "-40 C to 400 C"), ("Actuation", "Pneumatic / Electric"), ("Leakage class", "VI")]),
    "vx-850-severe-service-valve": ("VX-850", "SEVERE-SERVICE VALVE", "Flow Control", "/images/valve-vx850.webp", [("Size range", "DN50-DN500"), ("Pressure class", "ASME 150-1500"), ("Temperature", "-50 C to 550 C"), ("Trim", "Tungsten carbide / Ceramic"), ("Body", "Forged alloy steel")]),
    "cx-250-modular-conveyor": ("CX-250", "MODULAR CONVEYOR", "Conveyor Systems", "/images/conveyor.webp", [("Throughput", "Up to 1,200 t/h"), ("Belt width", "400-1,600 mm"), ("Length", "Up to 250 m per drive"), ("Frame", "Painted / Galvanized steel"), ("Controls", "PLC / VFD-ready")]),
    "cx-900-heavy-duty-conveyor": ("CX-900", "HEAVY-DUTY CONVEYOR", "Conveyor Systems", "/images/conveyor-cx900.webp", [("Throughput", "Up to 3,500 t/h"), ("Belt width", "1,200-2,400 mm"), ("Incline", "Up to 18 deg"), ("Frame", "Heavy structural steel"), ("Monitoring", "Condition-ready")]),
    "thermacore-t600": ("T600", "THERMACORE THERMAL SYSTEM", "Thermal Systems", "/images/thermal.webp", [("Temperature", "Up to 600 C"), ("Chamber volume", "2-48 m3"), ("Fuel options", "Gas / Electric"), ("Controls", "PLC + HMI"), ("Recovery", "Optional heat recovery")]),
    "thermacore-t900": ("T900", "THERMACORE THERMAL SYSTEM", "Thermal Systems", "/images/thermal-t900.webp", [("Temperature", "Up to 900 C"), ("Chamber volume", "20-160 m3"), ("Fuel options", "Gas / Electric / Hybrid"), ("Controls", "Redundant PLC"), ("Emissions", "Configured to site requirements")]),
}

GUIDES = {
    "installation-commissioning-guide": ("INSTALLATION & COMMISSIONING", "A field-ready checklist for receiving, installing, testing, and handing over an Axiom system."),
    "pump-selection-guide": ("SELECTING A PUMP FOR CONTINUOUS DUTY", "A practical framework for sizing a process pump around the duty cycle, fluid properties, controls, and maintenance reality."),
    "cavitation-guide": ("UNDERSTANDING CAVITATION", "How to recognize, prevent, and troubleshoot cavitation in industrial pumping systems."),
    "cx-250-layout-pack": ("CX-250 MODULAR CONVEYOR LAYOUT PACK", "Reference dimensions for early-stage conveyor planning and layout coordination."),
    "flow-system-efficiency": ("REDUCING ENERGY IN FLOW SYSTEMS", "Where system modernization can create measurable, sustained operating savings."),
}

GUIDE_SECTIONS = {
    "INSTALLATION & COMMISSIONING": [("01  Receive and inspect", "Confirm the equipment, documentation, preservation, and lifting points against the approved packing list before moving the package into position."), ("02  Install and align", "Verify foundations, piping loads, rotation, isolation, instrumentation, and access to service points before energizing the system."), ("03  Test and hand over", "Record dry checks, wet commissioning, alarms, setpoints, and operator training so the approved operating envelope is clear at handover.")],
    "SELECTING A PUMP FOR CONTINUOUS DUTY": [("01  Establish the duty point", "Record the normal and upset flow range, pressure requirement, fluid temperature, expected operating hours, and suction conditions before comparing curves."), ("02  Check the system curve", "Review minimum flow, transient pressure, pipe losses, materials compatibility, and control strategy. A component cannot compensate for an unbalanced system."), ("03  Confirm the package", "Review pump, motor, baseplate, instrumentation, isolation, commissioning access, and maintenance documentation as one package before release.")],
    "UNDERSTANDING CAVITATION": [("01  Recognize the signal", "Noise, vibration, unstable flow, or a loss of head can indicate cavitation. Check the symptoms against suction pressure, temperature, and operating point."), ("02  Find the cause", "Review available NPSH, suction line losses, valve position, strainer condition, fluid vapor pressure, and changes to upstream equipment."), ("03  Make it durable", "Correct the hydraulic condition, document the new operating limits, and align control logic and maintenance checks so the issue does not return.")],
    "CX-250 MODULAR CONVEYOR LAYOUT PACK": [("01  Set the route", "Confirm transfer points, elevation changes, service clearances, guarding, and the required routing modes before fixing conveyor length."), ("02  Coordinate the interfaces", "Coordinate structural steel, drives, chutes, electrical drops, dust control, and safe inspection access with the surrounding plant layout."), ("03  Release for detail", "Use the reference dimensions for early coordination, then confirm belt width, loading, support spacing, and site conditions in the approved layout.")],
    "REDUCING ENERGY IN FLOW SYSTEMS": [("01  Measure the baseline", "Capture flow, pressure, control positions, run hours, and energy use across the real operating profile rather than relying on a single design point."), ("02  Remove avoidable work", "Review unnecessary restriction, fixed-speed assumptions, pipework losses, and oversizing. Variable speed can help where the duty and controls support it."), ("03  Verify the saving", "Define post-commissioning setpoints and a simple review cadence so the measured improvement stays visible to the operating team.")],
}

styles = getSampleStyleSheet()
title = ParagraphStyle("title", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=27, leading=29, textColor=INK, spaceAfter=8)
subtitle = ParagraphStyle("subtitle", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10, leading=13, textColor=ORANGE, tracking=1.5, spaceAfter=16)
body = ParagraphStyle("body", parent=styles["BodyText"], fontName="Helvetica", fontSize=10, leading=15, textColor=SLATE, spaceAfter=10)
small = ParagraphStyle("small", parent=styles["Normal"], fontName="Helvetica", fontSize=7.5, leading=10, textColor=SLATE)
label = ParagraphStyle("label", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8, leading=10, textColor=SLATE, tracking=0.5)
value = ParagraphStyle("value", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=10, leading=12, textColor=INK)

def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setFillColor(INK)
    canvas.rect(0, A4[1]-22*mm, A4[0], 22*mm, fill=1, stroke=0)
    canvas.setFillColor(ORANGE)
    canvas.setFont("Helvetica-Bold", 12)
    canvas.drawString(18*mm, A4[1]-14*mm, "AXIOM")
    canvas.setFillColor(colors.HexColor("#B9C1C8"))
    canvas.setFont("Helvetica", 7)
    canvas.drawString(18*mm, A4[1]-18*mm, "FORGE SYSTEMS  /  ENGINEERED FOR RELENTLESS INDUSTRY")
    canvas.setStrokeColor(ORANGE)
    canvas.setLineWidth(1)
    canvas.line(18*mm, 17*mm, A4[0]-18*mm, 17*mm)
    canvas.setFillColor(SLATE)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(18*mm, 11*mm, "axiom-forge-systems.vercel.app  ·  Reference document")
    canvas.drawRightString(A4[0]-18*mm, 11*mm, f"{doc.page:02d}")
    canvas.restoreState()

def doc_for(path):
    return SimpleDocTemplate(str(path), pagesize=A4, rightMargin=18*mm, leftMargin=18*mm, topMargin=31*mm, bottomMargin=24*mm)

def product_pdf(path, data):
    model, name, category, image, specs = data
    story = [Paragraph(model, title), Paragraph(f"{name}  /  {category}", subtitle)]
    image_path = ROOT / "public" / image.lstrip("/")
    if image_path.exists():
        story.append(Image(str(image_path), width=174*mm, height=68*mm, kind="proportional"))
    story += [Spacer(1, 8*mm), Paragraph("Designed around the process, environment, and maintenance reality it has to support. This reference sheet outlines the platform's standard configuration envelope.", body), Paragraph("TECHNICAL SPECIFICATION", subtitle)]
    rows = [[Paragraph("PARAMETER", label), Paragraph("REFERENCE VALUE", label)]] + [[Paragraph(k.upper(), label), Paragraph(v, value)] for k, v in specs]
    table = Table(rows, colWidths=[69*mm, 105*mm], rowHeights=[10*mm] + [12*mm]*len(specs))
    table.setStyle(TableStyle([("BACKGROUND", (0,0), (-1,0), LIGHT), ("LINEBELOW", (0,0), (-1,-1), .5, colors.HexColor("#C1C9CE")), ("VALIGN", (0,0), (-1,-1), "MIDDLE"), ("LEFTPADDING", (0,0), (-1,-1), 4), ("RIGHTPADDING", (0,0), (-1,-1), 4)]))
    story += [table, Spacer(1, 10*mm), Paragraph("APPLICATIONS", subtitle), Paragraph("Process infrastructure · Water and utilities · Energy transfer · Continuous-duty production", body), PageBreak(), Paragraph("CONFIGURATION NOTES", subtitle), Paragraph("Axiom systems are reviewed against duty point, materials compatibility, access, controls integration, and applicable site requirements before release for manufacture.", body), Spacer(1, 5*mm), Paragraph("STANDARD SUPPORT", subtitle), Paragraph("Application analysis  ·  System engineering  ·  Factory testing  ·  Commissioning  ·  Lifecycle support", body), Spacer(1, 35*mm), Paragraph("Sample technical document for portfolio demonstration. Confirm final performance, materials, and compliance requirements against the approved project specification.", small)]
    doc_for(path).build(story, onFirstPage=header_footer, onLaterPages=header_footer)

def guide_pdf(path, heading, lede):
    story = [Paragraph(heading, title), Paragraph("AXIOM ENGINEERING RESOURCE", subtitle), Paragraph(lede, body), Spacer(1, 6*mm)]
    for head, text in GUIDE_SECTIONS[heading]:
        story += [Paragraph(head, subtitle), Paragraph(text, body), Spacer(1, 4*mm)]
    story += [Spacer(1, 20*mm), Paragraph("This reference is intended to support early-stage engineering conversations. Final selection and compliance requirements remain project-specific.", small)]
    doc_for(path).build(story, onFirstPage=header_footer, onLaterPages=header_footer)

for slug, data in PRODUCTS.items(): product_pdf(OUT / f"{slug}.pdf", data)
for slug, (heading, lede) in GUIDES.items(): guide_pdf(OUT / f"{slug}.pdf", heading, lede)
