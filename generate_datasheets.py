"""Generate the Axiom Forge Systems PDF resource library.

The numbers in this portfolio are deliberately presented as illustrative
reference envelopes. They are useful for an early engineering conversation,
but are not a substitute for an approved project specification.
"""

from pathlib import Path
import sys

from PIL import Image as PILImage
from reportlab.lib import colors
from reportlab.lib.pagesizes import A4
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.units import mm
from reportlab.graphics.shapes import Drawing, Line, PolyLine, Rect, String
from reportlab.platypus import Image, PageBreak, Paragraph, Spacer, Table, TableStyle


ROOT = Path(__file__).parent
OUT = ROOT / "public"

INK = colors.HexColor("#0B0F12")
INK_SOFT = colors.HexColor("#172026")
ORANGE = colors.HexColor("#F45D26")
SLATE = colors.HexColor("#56636C")
MIST = colors.HexColor("#F1F4F5")
LINE = colors.HexColor("#CBD3D7")
PALE_ORANGE = colors.HexColor("#FFF0E9")
TEAL = colors.HexColor("#0C5B66")


PRODUCTS = {
    "af-p900-process-pump": {
        "model": "AF-P900", "title": "PROCESS PUMP", "category": "Industrial Pumps", "image": "/images/pump.webp",
        "role": "Continuous-duty process transfer platform",
        "deck": "A high-flow pump reference for process water, utility transfer, and other continuous-duty services where the duty point, fluid compatibility, and maintenance access must be considered together.",
        "specs": [("Flow rate", "1,250 m3/h"), ("Maximum pressure", "40 bar"), ("Operating temperature", "-20 C to 180 C"), ("Materials", "316 SS / Duplex"), ("Drive", "Direct / VFD-ready")],
        "intent": [("Hydraulic intent", "High-flow transfer with a defined continuous operating point and a documented minimum-flow strategy."), ("Process attention", "Fluid properties, temperature, solids content, seal plan, suction conditions, and pipework losses."), ("Package boundary", "Pump, driver, baseplate, isolation, instrumentation, and commissioning records are reviewed as one package.")],
        "config": [("Hydraulics", "Confirm normal, minimum, and upset duty points against the project system curve before selecting an impeller or control strategy."), ("Materials", "Use the stated material envelope as a starting point; verify chemistry, concentration, erosion, and corrosion allowance for the actual fluid."), ("Controls", "A direct drive or VFD-ready arrangement can be evaluated against the operating profile and the required turndown.")],
        "handoff": ["Duty point and fluid data recorded", "Suction conditions and NPSH basis reviewed", "Seal, bearing, and maintenance access confirmed", "Utilities, instrumentation, and test basis agreed"],
    },
    "af-x720-high-pressure-pump": {
        "model": "AF-X720", "title": "HIGH-PRESSURE PUMP", "category": "Industrial Pumps", "image": "/images/pump-x720.webp",
        "role": "High-pressure process transfer platform",
        "deck": "A high-pressure transfer reference for booster, injection, and process services where pressure stability, materials compatibility, and controlled operation shape the package design.",
        "specs": [("Flow rate", "720 m3/h"), ("Maximum pressure", "80 bar"), ("Operating temperature", "-10 C to 160 C"), ("Materials", "316 stainless steel"), ("Efficiency", "Up to 91%")],
        "intent": [("Hydraulic intent", "Deliver a defined high-pressure duty while keeping operation inside the agreed continuous envelope."), ("Process attention", "Suction stability, pressure transients, relief philosophy, fluid viscosity, temperature, and downstream control response."), ("Package boundary", "Pump, driver, pressure instruments, protective logic, isolation, and commissioning data are coordinated at package level.")],
        "config": [("Pressure path", "Define normal and upset pressure, start-up behavior, minimum flow, and the response to a downstream restriction."), ("Fluid interface", "Confirm viscosity, solids, temperature, seal compatibility, and materials for the actual process fluid."), ("Energy review", "Use the stated efficiency as a reference point only; verify the selected duty and control mode against the project energy baseline.")],
        "handoff": ["Normal and upset pressure cases documented", "Transient and minimum-flow behavior reviewed", "Driver, controls, and instrument ranges aligned", "Pressure test and acceptance basis agreed"],
    },
    "vx-400-control-valve": {
        "model": "VX-400", "title": "CONTROL VALVE", "category": "Flow Control", "image": "/images/valve.webp",
        "role": "Modulating flow control platform",
        "deck": "An installation and application reference for the VX-400 control valve. Use it to frame piping orientation, actuator setup, instrument checks, and the project-specific configuration review.",
        "specs": [("Size range", "DN25-DN300"), ("Pressure class", "PN16-PN100"), ("Temperature", "-40 C to 400 C"), ("Actuation", "Pneumatic / Electric"), ("Leakage class", "VI")],
        "intent": [("Control intent", "Provide repeatable modulation across the defined flow range with an actuator and position feedback strategy suited to the service."), ("Installation attention", "Flow direction, pipe support, access to trim and actuator, upstream conditioning, and instrument air or power quality."), ("Release boundary", "Valve size, trim, actuator, seals, fail position, materials, and leakage basis require project approval before manufacture.")],
        "config": [("Valve station", "Keep the body supported by the piping arrangement and leave a practical path for actuator adjustment, inspection, and removal."), ("Actuator setup", "Verify travel direction, fail position, signal range, position feedback, and any accessories against the approved control narrative."), ("Commissioning", "Check free travel, zero and span, loop response, isolation, and the as-left setpoints before introducing process conditions.")],
        "handoff": ["Line class, flow direction, and process data confirmed", "Trim, actuator, fail action, and signal basis selected", "Piping support and service access checked", "Loop test, setpoints, and as-left record prepared"],
    },
    "vx-850-severe-service-valve": {
        "model": "VX-850", "title": "SEVERE-SERVICE VALVE", "category": "Flow Control", "image": "/images/valve-vx850.webp",
        "role": "High-energy and erosive service valve platform",
        "deck": "A severe-service control reference for high-energy, high-temperature, or erosive duties where trim selection, pressure drop, materials, and inspection access must be resolved early.",
        "specs": [("Size range", "DN50-DN500"), ("Pressure class", "ASME 150-1500"), ("Temperature", "-50 C to 550 C"), ("Trim", "Tungsten carbide / Ceramic"), ("Body", "Forged alloy steel")],
        "intent": [("Control intent", "Manage a high-energy pressure drop while keeping the selected trim and body materials aligned to the service conditions."), ("Process attention", "Pressure drop, flashing or cavitation risk, erosion mechanism, thermal gradients, actuator sizing, and noise review."), ("Release boundary", "Trim geometry and materials are selected from the approved process data; this reference does not certify a service limit.")],
        "config": [("Trim path", "Document the pressure-drop case, phase behavior, particle loading, and expected wear mechanism before final trim selection."), ("Thermal path", "Review body, bonnet, packing, actuator, and instrument temperature exposure together, including warm-up and shutdown states."), ("Maintenance", "Provide inspection access and a replacement strategy for the trim elements that are expected to see the highest energy.")],
        "handoff": ["Pressure-drop and phase cases documented", "Erosion, cavitation, and noise review completed", "Trim, body, packing, and actuator basis agreed", "Inspection and replacement access included in layout"],
    },
    "cx-250-modular-conveyor": {
        "model": "CX-250", "title": "MODULAR CONVEYOR", "category": "Conveyor Systems", "image": "/images/conveyor.webp",
        "role": "Configurable transfer and routing platform",
        "deck": "A modular conveying reference for plants that need flexible routing, accessible interfaces, and a repeatable approach to transfer points, drives, support steel, and controls.",
        "specs": [("Throughput", "Up to 1,200 t/h"), ("Belt width", "400-1,600 mm"), ("Length", "Up to 250 m per drive"), ("Frame", "Painted / Galvanized steel"), ("Controls", "PLC / VFD-ready")],
        "intent": [("Routing intent", "Build a modular material path around transfer points, access, elevation changes, and the actual operating modes of the plant."), ("Layout attention", "Loading profile, belt width, support spacing, guarding interfaces, chutes, dust control, and service access."), ("Release boundary", "Throughput, belt, drive, and support selections require material, route, incline, and site data before release.")],
        "config": [("Route", "Set the route around loading and discharge points first, then resolve elevation, support, take-up, and transfer interfaces."), ("Interfaces", "Coordinate structural steel, electrical drops, chute geometry, dust control, inspection points, and access with the plant layout."), ("Controls", "Define operating modes, permissives, start and stop sequence, speed control, and the signals needed for the approved control narrative.")],
        "handoff": ["Material, bulk density, and loading profile recorded", "Route, transfer points, elevation, and access frozen", "Drive, take-up, support, and chute interfaces coordinated", "Controls narrative and inspection points agreed"],
    },
    "cx-900-heavy-duty-conveyor": {
        "model": "CX-900", "title": "HEAVY-DUTY CONVEYOR", "category": "Conveyor Systems", "image": "/images/conveyor-cx900.webp",
        "role": "High-capacity bulk handling platform",
        "deck": "A heavy-duty conveying reference for high-capacity bulk routes where transfer geometry, structural load paths, inspection access, and condition-ready interfaces are part of the system brief.",
        "specs": [("Throughput", "Up to 3,500 t/h"), ("Belt width", "1,200-2,400 mm"), ("Incline", "Up to 18 deg"), ("Frame", "Heavy structural steel"), ("Monitoring", "Condition-ready")],
        "intent": [("Routing intent", "Move high-volume bulk material through a controlled route with a structural and maintenance strategy sized to the site context."), ("Layout attention", "Transfer energy, chute wear, support loads, incline, belt tension, spillage paths, access, and inspection zones."), ("Release boundary", "Capacity, belt, incline, and frame selections are reference values and must be reconciled with material and civil data.")],
        "config": [("Transfer design", "Resolve loading and discharge trajectories, chute geometry, wear strategy, and clean-out access before finalizing the route."), ("Structural path", "Coordinate support spacing, dynamic loads, foundations, walkways, and service access with the approved plant model."), ("Monitoring", "Define the condition signals, inspection points, alarm thresholds, and data ownership that the operating team can maintain.")],
        "handoff": ["Material, moisture, density, and loading cases documented", "Transfer, incline, support, and access model coordinated", "Wear, clean-out, and inspection strategy agreed", "Monitoring signals and maintenance ownership defined"],
    },
    "thermacore-t600": {
        "model": "T600", "title": "THERMACORE THERMAL SYSTEM", "category": "Thermal Systems", "image": "/images/thermal.webp",
        "role": "Moderate-temperature process heating platform",
        "deck": "A thermal system reference for controlled process heating where chamber volume, heat-up profile, atmosphere, controls, and heat recovery opportunities shape the concept design.",
        "specs": [("Temperature", "Up to 600 C"), ("Chamber volume", "2-48 m3"), ("Fuel options", "Gas / Electric"), ("Controls", "PLC + HMI"), ("Recovery", "Optional heat recovery")],
        "intent": [("Thermal intent", "Deliver a repeatable heating profile around the load, atmosphere, residence time, and heat-loss assumptions of the process."), ("Process attention", "Load geometry, heat-up and cool-down profile, ventilation, fuel or power quality, instrumentation, and operator access."), ("Release boundary", "Temperature and volume values are illustrative envelopes; final thermal performance requires a heat balance and site review.")],
        "config": [("Heat balance", "Define product mass, starting temperature, target profile, cycle time, openings, and heat-loss assumptions before sizing the system."), ("Controls", "Map sensors, permissives, recipes, alarms, and operator handoff to the approved process sequence and utilities."), ("Recovery", "Evaluate heat recovery only after the exhaust profile, duty cycle, cleanliness, and downstream use are understood.")],
        "handoff": ["Load profile and cycle time recorded", "Heat balance and utility basis reviewed", "Sensors, controls, alarms, and recipe needs defined", "Access, ventilation, and maintenance path coordinated"],
    },
    "thermacore-t900": {
        "model": "T900", "title": "THERMACORE THERMAL SYSTEM", "category": "Thermal Systems", "image": "/images/thermal-t900.webp",
        "role": "High-temperature process heating platform",
        "deck": "A high-temperature thermal reference for larger chambers and demanding heat profiles where atmosphere, refractory strategy, controls, utilities, and recovery must be resolved as a system.",
        "specs": [("Temperature", "Up to 900 C"), ("Chamber volume", "20-160 m3"), ("Fuel options", "Gas / Electric / Hybrid"), ("Controls", "Redundant PLC"), ("Emissions", "Configured to site requirements")],
        "intent": [("Thermal intent", "Shape a repeatable high-temperature profile around load geometry, atmosphere, cycle time, and the site's utility strategy."), ("Process attention", "Refractory selection, heat distribution, extraction, thermal expansion, instrumentation, controls, and service access."), ("Release boundary", "The listed temperature and volume are reference envelopes, not a certified operating claim or emissions guarantee.")],
        "config": [("Thermal model", "Build the heat balance around the actual load, openings, cycle, refractory, extraction, and warm-up requirements."), ("Utility path", "Compare gas, electric, or hybrid concepts against available capacity, control response, operating profile, and site requirements."), ("Controls", "Define independent measurements, permissives, alarms, recipes, data capture, and the operator response expected for each state.")],
        "handoff": ["Load geometry, atmosphere, and cycle cases recorded", "Heat balance and utility concept reviewed", "Thermal expansion, refractory, and access interfaces coordinated", "Controls, alarms, and site requirements documented"],
    },
}


GUIDES = {
    "installation-commissioning-guide": {
        "title": "INSTALLATION + COMMISSIONING FIELD GUIDE", "kicker": "FIELD ENGINEERING RESOURCE",
        "lede": "A practical sequence for receiving, installing, checking, energizing, and handing over an Axiom system. Use the approved project documents and site procedures as the governing basis.", "audience": "Project engineers / Site supervisors / Commissioning teams",
        "steps": [("01 / Receive and preserve", "Match the shipment to the approved packing list. Record visible condition, tags, loose items, preservation state, and lifting points before moving equipment. Store sensitive items within the agreed environmental limits."), ("02 / Set the installation basis", "Confirm foundation or support readiness, datum, access, lifting path, service clearances, and the interfaces that must remain available for commissioning and future maintenance."), ("03 / Connect the system", "Check piping or belt interfaces, supports, drains, vents, electrical connections, instrument ranges, utilities, and isolation points against the approved drawings and line or control narrative."), ("04 / Complete dry checks", "Verify fasteners, rotation or travel, guards and access panels, lubrication, sensor identity, signal direction, actuator or drive response, alarms, permissives, and emergency isolation in accordance with site procedure."), ("05 / Commission and hand over", "Introduce the process in a controlled sequence. Record setpoints, readings, alarms, as-left positions, operator training, outstanding actions, and the approved operating envelope at handover.")],
        "deliverables": ["Receiving and preservation record", "Installation and interface check sheet", "Dry-check and loop-test record", "Commissioning readings and as-left settings", "Open-item register and handover pack"],
    },
    "pump-selection-guide": {
        "title": "SELECTING A PUMP FOR CONTINUOUS DUTY", "kicker": "PUMP APPLICATION GUIDE",
        "lede": "A decision framework for turning a real process duty into a pump package that can be specified, commissioned, and maintained. Start with the operating profile, not a catalogue point.", "audience": "Process engineers / Package engineers / Operations teams",
        "steps": [("01 / Define the duty", "Record normal, minimum, maximum, and upset flow; differential pressure; fluid temperature; density and viscosity; operating hours; start and stop frequency; and the consequence of losing flow."), ("02 / Build the system curve", "Account for static head, pipework, fittings, control valves, filters, heat exchangers, elevation, and the expected operating range. Keep design assumptions visible so they can be challenged."), ("03 / Check suction conditions", "Review available NPSH across temperature and flow cases. Include upstream losses, tank level, vapor pressure, strainers, and transient conditions rather than relying on one steady-state estimate."), ("04 / Match materials and sealing", "Confirm compatibility with concentration, solids, temperature, corrosivity, and cleaning regime. Select the seal and bearing approach with the maintenance plan in view."), ("05 / Close the package", "Coordinate driver, controls, minimum-flow protection, instruments, isolation, baseplate, access, test basis, spares, and commissioning data as one package.")],
        "deliverables": ["Duty and upset case table", "System curve assumptions", "NPSH and suction review", "Materials and sealing basis", "Package and commissioning data sheet"],
    },
    "cavitation-guide": {
        "title": "UNDERSTANDING CAVITATION IN PROCESS PUMPS", "kicker": "HYDRAULIC TROUBLESHOOTING GUIDE",
        "lede": "A field-oriented way to separate cavitation symptoms from other hydraulic or mechanical problems, identify the operating condition that triggers them, and verify the correction.", "audience": "Reliability engineers / Operators / Maintenance teams",
        "steps": [("01 / Recognize the pattern", "Listen for a crackling or unstable hydraulic sound and look for vibration, fluctuating flow, loss of head, or a changing motor load. Compare the symptom with the exact flow, temperature, and suction state."), ("02 / Frame the NPSH question", "Compare available suction head with the pump requirement across the real operating envelope. Treat tank level, vapor pressure, upstream losses, temperature, and speed as variables."), ("03 / Check the suction path", "Inspect valve position, strainer condition, line size, air ingress, blocked vents, pipe support, and upstream equipment. A changed process arrangement can remove the original margin."), ("04 / Correct the cause", "Reduce avoidable suction loss, restore liquid level or temperature conditions, change the operating point, or revise the equipment arrangement. Record which variable changed and why."), ("05 / Verify and monitor", "Repeat the measurement at the triggering duty, confirm stable readings, check for damage, and add a practical operating limit or inspection point to the maintenance record.")],
        "deliverables": ["Symptom and operating-state log", "Available versus required NPSH review", "Suction path inspection record", "Corrective action and verification reading", "Updated operating limit or monitoring point"],
    },
    "cx-250-layout-pack": {
        "title": "CX-250 MODULAR CONVEYOR LAYOUT PACK", "kicker": "CAD + DIMENSIONAL REFERENCE",
        "lede": "A concept-level plan and elevation reference for early CX-250 route coordination. Use the controlled dimensions and release checks here to structure the approved project layout.", "audience": "Layout engineers / Project coordinators / Plant design teams",
        "steps": [("01 / Set the route", "Confirm loading, discharge, transfer points, elevation changes, service clearances, and routing modes before fixing the route length."), ("02 / Coordinate interfaces", "Coordinate structural steel, drives, chutes, electrical drops, dust control, guarding, inspection, and clean-out access with the surrounding plant layout."), ("03 / Control the dimensions", "Keep belt width, route length, elevation, support spacing, and service clearance visible in the model and review comments. Treat each as project-controlled until approved."), ("04 / Resolve the operating case", "Verify material, bulk density, loading profile, speed, incline, transfer behavior, and start or stop modes before releasing equipment selections."), ("05 / Release for detail", "Confirm the approved drawing status, revision, field set-out responsibility, and site conditions before fabrication or construction." )],
        "deliverables": ["Material, bulk density, moisture, lump size, and loading profile", "Route, transfer, elevation, and operating mode cases", "Belt width, route length, support spacing, and take-up basis", "Civil, structural, electrical, chute, dust, and access interfaces", "Approved drawing status, revision, and field set-out responsibility"],
    },
    "flow-system-efficiency": {
        "title": "REDUCING ENERGY IN FLOW SYSTEMS", "kicker": "SYSTEM EFFICIENCY GUIDE",
        "lede": "A practical review sequence for finding avoidable hydraulic work and proving whether a modernization idea helps the operating profile that actually exists.", "audience": "Plant engineers / Energy teams / Operations leaders",
        "steps": [("01 / Measure the baseline", "Capture flow, pressure, valve position, run hours, speed, temperature, and energy use across the real production profile. A single design point rarely describes the opportunity."), ("02 / Map avoidable restriction", "Trace the pressure path through control valves, filters, heat exchangers, pipework, and elevation. Separate necessary process pressure from pressure created by an avoidable restriction."), ("03 / Review the control mode", "Compare fixed-speed, throttled, and variable-speed concepts against the duty cycle. Confirm that the proposed control strategy can maintain process quality and stable operation."), ("04 / Match the equipment", "Test whether a pump, valve, motor, or pipework change addresses the system cause. Include turndown, start-up, upset cases, maintenance, and the cost of changing the interface."), ("05 / Verify the outcome", "Define post-change readings, setpoints, run hours, and a review window. Compare like-for-like operating states and keep the measured result visible to the operating team.")],
        "deliverables": ["Operating profile and energy baseline", "Pressure-loss map", "Control strategy comparison", "Change case and interface review", "Post-commissioning verification plan"],
    },
}


styles = getSampleStyleSheet()
TITLE = ParagraphStyle("title", parent=styles["Title"], fontName="Helvetica-Bold", fontSize=25, leading=27, textColor=INK, spaceAfter=6)
KICKER = ParagraphStyle("kicker", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8, leading=10, textColor=ORANGE, spaceAfter=10)
DECK = ParagraphStyle("deck", parent=styles["BodyText"], fontName="Helvetica", fontSize=10.5, leading=15, textColor=SLATE, spaceAfter=9)
BODY = ParagraphStyle("body", parent=styles["BodyText"], fontName="Helvetica", fontSize=9.2, leading=13, textColor=SLATE, spaceAfter=7)
SMALL = ParagraphStyle("small", parent=styles["Normal"], fontName="Helvetica", fontSize=7.1, leading=9.5, textColor=SLATE)
SMALL_DARK = ParagraphStyle("small_dark", parent=SMALL, textColor=INK_SOFT)
LABEL = ParagraphStyle("label", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=7.2, leading=9, textColor=SLATE, spaceAfter=2)
VALUE = ParagraphStyle("value", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=9.2, leading=11, textColor=INK)
SECTION = ParagraphStyle("section", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8.2, leading=10, textColor=ORANGE, spaceBefore=2, spaceAfter=6)
TABLE_HEAD = ParagraphStyle("table_head", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=7.2, leading=9, textColor=SLATE)
TABLE_LABEL = ParagraphStyle("table_label", parent=styles["Normal"], fontName="Helvetica-Bold", fontSize=8, leading=10, textColor=INK)
TABLE_BODY = ParagraphStyle("table_body", parent=styles["Normal"], fontName="Helvetica", fontSize=8, leading=11, textColor=SLATE)


def para(text, style=BODY):
    return Paragraph(text, style)


def header_footer(canvas, doc):
    canvas.saveState()
    canvas.setTitle(getattr(doc, "_axiom_title", "Axiom Forge Systems reference document"))
    canvas.setAuthor("Axiom Forge Systems")
    canvas.setFillColor(INK)
    canvas.rect(0, A4[1] - 22 * mm, A4[0], 22 * mm, fill=1, stroke=0)
    canvas.setFillColor(ORANGE)
    canvas.setFont("Helvetica-Bold", 12)
    canvas.drawString(18 * mm, A4[1] - 14 * mm, "AXIOM")
    canvas.setFillColor(colors.HexColor("#B9C1C8"))
    canvas.setFont("Helvetica", 7)
    canvas.drawString(18 * mm, A4[1] - 18 * mm, "FORGE SYSTEMS  /  ENGINEERED FOR RELENTLESS INDUSTRY")
    canvas.setStrokeColor(ORANGE)
    canvas.setLineWidth(1)
    canvas.line(18 * mm, 17 * mm, A4[0] - 18 * mm, 17 * mm)
    canvas.setFillColor(SLATE)
    canvas.setFont("Helvetica", 7)
    canvas.drawString(18 * mm, 11 * mm, "axiom-forge-systems.vercel.app  /  illustrative reference")
    canvas.drawRightString(A4[0] - 18 * mm, 11 * mm, f"{doc.page:02d}")
    canvas.restoreState()


def doc_for(path, title):
    from reportlab.platypus import SimpleDocTemplate
    document = SimpleDocTemplate(str(path), pagesize=A4, rightMargin=18 * mm, leftMargin=18 * mm, topMargin=30 * mm, bottomMargin=23 * mm, title=title, author="Axiom Forge Systems")
    document._axiom_title = title
    return document


def image_block(path, width=174 * mm, height=54 * mm):
    image_path = ROOT / "public" / path.lstrip("/")
    if not image_path.exists():
        return Spacer(1, 2 * mm)
    optimized_dir = ROOT / "tmp" / "pdfs"
    optimized_dir.mkdir(parents=True, exist_ok=True)
    optimized_path = optimized_dir / f"{image_path.stem}-pdf.jpg"
    with PILImage.open(image_path) as source:
        source = source.convert("RGB")
        source.thumbnail((1200, 900), PILImage.Resampling.LANCZOS)
        source.save(optimized_path, format="JPEG", quality=88, optimize=True, progressive=True)
    return Image(str(optimized_path), width=width, height=height, kind="proportional")


def section_label(text):
    return Paragraph(text.upper(), SECTION)


def table_style(header=True, padding=5):
    commands = [("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), padding), ("RIGHTPADDING", (0, 0), (-1, -1), padding), ("TOPPADDING", (0, 0), (-1, -1), padding), ("BOTTOMPADDING", (0, 0), (-1, -1), padding), ("LINEBELOW", (0, 0), (-1, -1), 0.45, LINE)]
    if header:
        commands += [("BACKGROUND", (0, 0), (-1, 0), MIST), ("LINEBELOW", (0, 0), (-1, 0), 0.8, ORANGE)]
    return TableStyle(commands)


def spec_table(specs):
    rows = [[para("PARAMETER", TABLE_HEAD), para("REFERENCE ENVELOPE", TABLE_HEAD)]] + [[para(key.upper(), TABLE_LABEL), para(value, VALUE)] for key, value in specs]
    table = Table(rows, colWidths=[58 * mm, 116 * mm], rowHeights=[8 * mm] + [10 * mm] * len(specs))
    table.setStyle(table_style())
    return table


def intent_table(items):
    rows = [[para("ENGINEERING LENS", TABLE_HEAD), para("WHAT TO RESOLVE", TABLE_HEAD)]] + [[para(label, TABLE_LABEL), para(text, TABLE_BODY)] for label, text in items]
    table = Table(rows, colWidths=[42 * mm, 132 * mm])
    table.setStyle(table_style())
    return table


def checklist_table(items):
    rows = [[para(f"{index:02d}", VALUE), para(item, TABLE_BODY)] for index, item in enumerate(items, start=1)]
    table = Table(rows, colWidths=[16 * mm, 158 * mm])
    table.setStyle(TableStyle([("BACKGROUND", (0, 0), (0, -1), PALE_ORANGE), ("VALIGN", (0, 0), (-1, -1), "MIDDLE"), ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5), ("TOPPADDING", (0, 0), (-1, -1), 6), ("BOTTOMPADDING", (0, 0), (-1, -1), 6), ("LINEBELOW", (0, 0), (-1, -1), 0.45, LINE)]))
    return table


def product_pdf(path, data):
    title = f"{data['model']} {data['title']} - reference datasheet"
    story = [para(data["model"], TITLE), para(f"{data['title']}  /  {data['category']}", KICKER), para(data["deck"], DECK), image_block(data["image"]), Spacer(1, 4 * mm), Table([[para("PLATFORM ROLE", LABEL), para("REFERENCE STATUS", LABEL), para("DOCUMENT USE", LABEL)], [para(data["role"], VALUE), para("Illustrative project concept", VALUE), para("Early engineering conversation", VALUE)]], colWidths=[67 * mm, 53 * mm, 54 * mm], rowHeights=[7 * mm, 15 * mm], style=TableStyle([("BACKGROUND", (0, 0), (-1, 0), MIST), ("BACKGROUND", (0, 1), (-1, 1), PALE_ORANGE), ("BOX", (0, 0), (-1, -1), 0.6, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.4, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5), ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)])), Spacer(1, 6 * mm), section_label("Technical specification"), spec_table(data["specs"]), Spacer(1, 5 * mm), para("The values above are a reference envelope for concept discussions. Confirm duty, materials, performance, and compliance requirements against the approved project specification before procurement or manufacture.", SMALL), PageBreak(), para(f"{data['model']} / ENGINEERING NOTES", TITLE), para(data["title"] + "  /  CONFIGURATION FRAMEWORK", KICKER), para("The platform is configured around the operating envelope rather than selected from a single catalogue point. Use the prompts below to structure the application review.", DECK), section_label("Design intent and interfaces"), intent_table(data["intent"]), Spacer(1, 6 * mm), section_label("Configuration review"), intent_table(data["config"]), Spacer(1, 6 * mm), section_label("Engineering handoff checklist"), checklist_table(data["handoff"]), Spacer(1, 7 * mm), Table([[para("REFERENCE NOTE", LABEL), para("This document is a polished portfolio reference, not a certified data sheet. Exact performance, materials, interfaces, testing, and applicable requirements remain project-specific and require written confirmation.", SMALL)]], colWidths=[34 * mm, 140 * mm], style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), MIST), ("BOX", (0, 0), (-1, -1), 0.6, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5), ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))]
    doc_for(path, title).build(story, onFirstPage=header_footer, onLaterPages=header_footer)


def layout_drawing():
    width, height = 492, 205
    drawing = Drawing(width, height)
    drawing.add(String(0, 190, "PLAN / ELEVATION REFERENCE", fontName="Helvetica-Bold", fontSize=8, fillColor=ORANGE))
    drawing.add(String(0, 177, "Use B, L, H, and S as project-controlled dimensions in the approved layout.", fontName="Helvetica", fontSize=7.5, fillColor=SLATE))
    drawing.add(String(12, 154, "PLAN", fontName="Helvetica-Bold", fontSize=7, fillColor=INK))
    drawing.add(Rect(40, 133, 340, 24, fillColor=MIST, strokeColor=INK, strokeWidth=1))
    for x in (90, 165, 240, 315):
        drawing.add(Line(x, 133, x, 157, strokeColor=ORANGE, strokeWidth=1))
    drawing.add(Rect(40, 133, 20, 24, fillColor=PALE_ORANGE, strokeColor=ORANGE, strokeWidth=1))
    drawing.add(Rect(360, 133, 20, 24, fillColor=PALE_ORANGE, strokeColor=ORANGE, strokeWidth=1))
    drawing.add(String(44, 122, "transfer", fontName="Helvetica", fontSize=6.8, fillColor=SLATE))
    drawing.add(String(360, 122, "transfer", fontName="Helvetica", fontSize=6.8, fillColor=SLATE))
    drawing.add(Line(40, 171, 380, 171, strokeColor=TEAL, strokeWidth=0.8)); drawing.add(Line(40, 167, 40, 175, strokeColor=TEAL, strokeWidth=0.8)); drawing.add(Line(380, 167, 380, 175, strokeColor=TEAL, strokeWidth=0.8))
    drawing.add(String(170, 174, "L = project-defined route length", fontName="Helvetica", fontSize=7, fillColor=TEAL))
    drawing.add(Line(194, 128, 194, 160, strokeColor=TEAL, strokeWidth=0.8)); drawing.add(Line(190, 128, 198, 128, strokeColor=TEAL, strokeWidth=0.8)); drawing.add(Line(190, 160, 198, 160, strokeColor=TEAL, strokeWidth=0.8))
    drawing.add(String(199, 140, "B = selected belt width", fontName="Helvetica", fontSize=7, fillColor=TEAL))
    drawing.add(String(12, 89, "ELEVATION", fontName="Helvetica-Bold", fontSize=7, fillColor=INK))
    drawing.add(Line(40, 57, 380, 57, strokeColor=INK, strokeWidth=1)); drawing.add(Line(40, 57, 80, 76, strokeColor=INK, strokeWidth=1)); drawing.add(Line(80, 76, 260, 76, strokeColor=INK, strokeWidth=1)); drawing.add(Line(260, 76, 380, 57, strokeColor=INK, strokeWidth=1))
    for x, top in ((80, 76), (170, 76), (260, 76)):
        drawing.add(Line(x, 57, x, top, strokeColor=ORANGE, strokeWidth=1))
    drawing.add(Line(40, 42, 380, 42, strokeColor=TEAL, strokeWidth=0.8)); drawing.add(String(174, 34, "S = define service clearance", fontName="Helvetica", fontSize=7, fillColor=TEAL))
    drawing.add(Line(405, 57, 405, 76, strokeColor=TEAL, strokeWidth=0.8)); drawing.add(Line(401, 57, 409, 57, strokeColor=TEAL, strokeWidth=0.8)); drawing.add(Line(401, 76, 409, 76, strokeColor=TEAL, strokeWidth=0.8))
    drawing.add(String(412, 64, "H = project-defined", fontName="Helvetica", fontSize=7, fillColor=TEAL)); drawing.add(String(412, 55, "elevation change", fontName="Helvetica", fontSize=7, fillColor=TEAL))
    drawing.add(String(40, 16, "Concept geometry only - not for fabrication, construction, or field set-out.", fontName="Helvetica-Bold", fontSize=7, fillColor=ORANGE))
    return drawing


def pump_curve_drawing():
    """Add a compact conceptual pump/system curve to the pump selection guide."""
    width, height = 492, 148
    drawing = Drawing(width, height)
    drawing.add(String(0, 135, "CONCEPTUAL SYSTEM-CURVE CHECK", fontName="Helvetica-Bold", fontSize=8, fillColor=ORANGE))
    drawing.add(String(0, 122, "The duty point is the conversation between the pump curve and the installed system curve.", fontName="Helvetica", fontSize=7.5, fillColor=SLATE))
    left, bottom, right, top = 42, 23, 408, 106
    drawing.add(Line(left, bottom, left, top, strokeColor=INK, strokeWidth=0.9))
    drawing.add(Line(left, bottom, right, bottom, strokeColor=INK, strokeWidth=0.9))
    for y in (bottom + 21, bottom + 42, bottom + 63):
        drawing.add(Line(left, y, right, y, strokeColor=LINE, strokeWidth=0.45, strokeDashArray=[2, 3]))
    duty_x, duty_y = left + 205, bottom + 46
    system = [(left + 8, bottom + 9), (left + 78, bottom + 12), (left + 148, bottom + 27), (duty_x, duty_y), (left + 288, bottom + 66), (right - 6, top - 5)]
    pump = [(left + 8, top - 3), (left + 78, top - 8), (left + 148, top - 24), (duty_x, duty_y), (left + 288, bottom + 29), (right - 6, bottom + 7)]
    drawing.add(PolyLine(system, strokeColor=TEAL, strokeWidth=2.1))
    drawing.add(PolyLine(pump, strokeColor=ORANGE, strokeWidth=2.1))
    drawing.add(Line(duty_x, duty_y, duty_x, bottom, strokeColor=SLATE, strokeWidth=0.55, strokeDashArray=[3, 3]))
    drawing.add(Line(left, duty_y, duty_x, duty_y, strokeColor=SLATE, strokeWidth=0.55, strokeDashArray=[3, 3]))
    drawing.add(Rect(duty_x - 3, duty_y - 3, 6, 6, fillColor=ORANGE, strokeColor=INK, strokeWidth=0.8))
    drawing.add(String(duty_x + 8, duty_y + 4, "illustrative duty point", fontName="Helvetica-Bold", fontSize=6.8, fillColor=INK))
    drawing.add(String(left + 72, top - 4, "pump curve", fontName="Helvetica-Bold", fontSize=6.8, fillColor=ORANGE))
    drawing.add(String(right - 114, top - 7, "system curve", fontName="Helvetica-Bold", fontSize=6.8, fillColor=TEAL))
    drawing.add(String(2, top - 3, "Head / dP", fontName="Helvetica", fontSize=6.8, fillColor=SLATE))
    drawing.add(String(right - 32, bottom - 13, "Flow / Q", fontName="Helvetica", fontSize=6.8, fillColor=SLATE))
    drawing.add(String(0, 4, "Concept only - no measured performance data or certified operating point is represented.", fontName="Helvetica-Bold", fontSize=6.8, fillColor=ORANGE))
    return drawing


def guide_pdf(path, data, slug):
    title = data["title"].replace("+", "and")
    story = [para(data["title"], TITLE), para(data["kicker"], KICKER), para(data["lede"], DECK), Table([[para("PRIMARY AUDIENCE", LABEL), para("REFERENCE STATUS", LABEL)], [para(data["audience"], VALUE), para("Illustrative project concept", VALUE)]], colWidths=[105 * mm, 69 * mm], rowHeights=[7 * mm, 14 * mm], style=TableStyle([("BACKGROUND", (0, 0), (-1, 0), MIST), ("BACKGROUND", (0, 1), (-1, 1), PALE_ORANGE), ("BOX", (0, 0), (-1, -1), 0.6, LINE), ("INNERGRID", (0, 0), (-1, -1), 0.4, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5), ("TOPPADDING", (0, 0), (-1, -1), 4), ("BOTTOMPADDING", (0, 0), (-1, -1), 4)])), Spacer(1, 7 * mm)]
    if slug == "cx-250-layout-pack":
        story.extend([layout_drawing(), Spacer(1, 5 * mm), section_label("Reference envelope and release checks"), Table([[para("PARAMETER", TABLE_HEAD), para("REFERENCE", TABLE_HEAD), para("RELEASE CHECK", TABLE_HEAD)], [para("Belt width", TABLE_LABEL), para("400-1,600 mm", TABLE_BODY), para("Select from material, loading, transfer, and access data.", TABLE_BODY)], [para("Route length", TABLE_LABEL), para("Up to 250 m per drive", TABLE_BODY), para("Confirm route, tension, take-up, support, and drive arrangement.", TABLE_BODY)], [para("Throughput", TABLE_LABEL), para("Up to 1,200 t/h", TABLE_BODY), para("Verify bulk density, flow profile, speed, loading, and transfer behavior.", TABLE_BODY)], [para("Frame", TABLE_LABEL), para("Painted / galvanized steel", TABLE_BODY), para("Coordinate corrosion environment, support steel, access, and finish.", TABLE_BODY)], [para("Controls", TABLE_LABEL), para("PLC / VFD-ready", TABLE_BODY), para("Define operating modes, permissives, signals, and ownership.", TABLE_BODY)]], colWidths=[38 * mm, 47 * mm, 89 * mm], style=table_style()), PageBreak()])
    else:
        story.extend([section_label("Field sequence"), intent_table(data["steps"]), PageBreak()])
        if slug == "pump-selection-guide":
            story.extend([pump_curve_drawing(), Spacer(1, 4 * mm)])
    if slug == "cx-250-layout-pack":
        story.extend([para("CX-250 / COORDINATION NOTES", TITLE), para("LAYOUT RELEASE WORKFLOW", KICKER), para("The pack is most useful when the route and its interfaces are treated as a controlled set of project inputs. Resolve the items below before converting a concept into a detailed layout.", DECK), section_label("Coordinate the route"), intent_table([("01 / Set the route", "Locate loading, discharge, transfer, elevation, and access zones. Keep L, B, H, and S visible in the model and in the review comments."), ("02 / Close interfaces", "Coordinate support steel, drives, take-up, chutes, electrical drops, dust control, guarding, inspection, and clean-out with the surrounding plant."), ("03 / Release for detail", "Confirm material, loading, width, speed, incline, support spacing, and site conditions in the approved layout before fabrication or construction.")]), Spacer(1, 7 * mm), section_label("Minimum release information"), checklist_table(["Material, bulk density, moisture, lump size, and loading profile", "Start, stop, transfer, incline, and operating mode cases", "Belt width, route length, support spacing, and take-up basis", "Civil, structural, electrical, chute, dust, and access interfaces", "Approved drawing status, revision, and field set-out responsibility"]), Spacer(1, 8 * mm), para("This concept pack intentionally does not provide fabrication dimensions, tolerances, load calculations, or construction approval. Use it to coordinate the questions that the approved project layout must answer.", SMALL)])
    else:
        story.extend([para(f"{data['title']} / HANDOVER RECORD", TITLE), para(data["kicker"], KICKER), para("A useful field guide ends with evidence that the system is ready for the next team. Capture the records below in the project handover pack and keep exceptions visible until they are closed.", DECK), section_label("Recommended records"), checklist_table(data["deliverables"]), Spacer(1, 8 * mm), Table([[para("REFERENCE NOTE", LABEL), para("This guide supports early planning and field conversations. It does not replace the approved drawings, equipment instructions, site procedures, inspection plan, or project acceptance criteria.", SMALL)]], colWidths=[34 * mm, 140 * mm], style=TableStyle([("BACKGROUND", (0, 0), (-1, -1), MIST), ("BOX", (0, 0), (-1, -1), 0.6, LINE), ("VALIGN", (0, 0), (-1, -1), "TOP"), ("LEFTPADDING", (0, 0), (-1, -1), 5), ("RIGHTPADDING", (0, 0), (-1, -1), 5), ("TOPPADDING", (0, 0), (-1, -1), 5), ("BOTTOMPADDING", (0, 0), (-1, -1), 5)]))])
    doc_for(path, title).build(story, onFirstPage=header_footer, onLaterPages=header_footer)


if __name__ == "__main__":
    selected = set(sys.argv[1:])
    unknown = selected - PRODUCTS.keys() - GUIDES.keys()
    if unknown:
        raise SystemExit(f"Unknown PDF slug(s): {', '.join(sorted(unknown))}")

    for slug, data in PRODUCTS.items():
        if not selected or slug in selected:
            product_pdf(OUT / f"{slug}.pdf", data)

    for slug, data in GUIDES.items():
        if not selected or slug in selected:
            guide_pdf(OUT / f"{slug}.pdf", data, slug)
