from fastapi import APIRouter, UploadFile, File, Form, HTTPException

from fastapi.responses import FileResponse
from app.services.ats_service import analyze_resume

# PDF generation libs
from reportlab.platypus import SimpleDocTemplate, Paragraph
from reportlab.lib.styles import getSampleStyleSheet
from reportlab.lib.pagesizes import letter

router = APIRouter(prefix="/ats", tags=["ATS"])

@router.post("/analyze")
async def analyze(file: UploadFile = File(...),job_description: str = Form(None)):
    if not file.filename.endswith((".pdf", ".docx")):
        raise HTTPException(status_code=400, detail="Invalid file format. Upload PDF or DOCX")

    result = await analyze_resume(file, job_description)
    return result


@router.post("/export")
async def export_pdf(data: dict):
    """
    Generate ATS analysis report as PDF and return it.
    """
    file_path = "ats_report.pdf"

    styles = getSampleStyleSheet()
    doc = SimpleDocTemplate(file_path, pagesize=letter)
    story = []

    # Title
    story.append(Paragraph("<b>ATS Analysis Report</b>", styles["Title"]))

    # Score
    story.append(Paragraph(f"Score: {data['analysis']['score']}%", styles["BodyText"]))

    # Sections
    for section in ["strengths", "weaknesses", "suggestions"]:
        story.append(Paragraph(f"<b>{section.capitalize()}</b>", styles["Heading2"]))
        for item in data["analysis"][section]:
            story.append(Paragraph(f"• {item}", styles["BodyText"]))

    doc.build(story)

    return FileResponse(file_path, filename="ATS_Report.pdf")
