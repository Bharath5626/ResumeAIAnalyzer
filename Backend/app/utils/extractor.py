import docx2txt
from PyPDF2 import PdfReader
from io import BytesIO

def extract_text(file_bytes):
    try:
        # PDF
        pdf = PdfReader(BytesIO(file_bytes))
        text = ""
        for page in pdf.pages:
            text += page.extract_text() or ""
        if text.strip():
            return text
    except:
        pass

    try:
        # DOCX
        text = docx2txt.process(BytesIO(file_bytes))
        if text.strip():
            return text
    except:
        pass

    return "Unable to read the resume file."
