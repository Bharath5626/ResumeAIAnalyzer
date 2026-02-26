import google.generativeai as genai
import json
from app.config import settings
from app.utils.extractor import extract_text

# Configure Gemini
genai.configure(api_key=settings.GEMINI_API_KEY)

FLASH_MODEL = "gemini-2.5-flash"
PRO_MODEL   = "gemini-2.5-pro"


async def analyze_resume(file, job_description: str = None, deep: bool = False):
    """
    Full ATS Analysis with:
    - Score
    - Extracted Data
    - Missing Keywords
    - Strengths / Weaknesses / Suggestions
    - Job Description Comparison (optional)
    """

    # -------------------------------------
    # 1. Extract resume text
    # -------------------------------------
    resume_bytes = await file.read()
    resume_text = extract_text(resume_bytes)

    if not resume_text or "Unable to read" in resume_text:
        return {
            "analysis": {
                "score": 0,
                "extracted_data": {},
                "keywords_missing": [],
                "strengths": [],
                "weaknesses": [],
                "suggestions": []
            },
            "jd_comparison": None,
            "model_used": "N/A",
            "error": "Could not extract text from resume."
        }

    # Choose model based on deep flag
    model_name = PRO_MODEL if deep else FLASH_MODEL
    model = genai.GenerativeModel(model_name)

    # -------------------------------------
    # 2. ATS RESUME ANALYSIS
    # -------------------------------------
    ats_prompt = f"""
    You are an ATS system. Analyze this resume and extract structured data.

    Return ONLY valid JSON in this exact format:
    {{
      "score": number (0-100),
      "extracted_data": {{
        "name": string,
        "email": string,
        "phone": string,
        "position": string,
        "skills": [list of strings],
        "summary": string
      }},
      "keywords_missing": [list of strings],
      "strengths": [list of strings],
      "weaknesses": [list of strings],
      "suggestions": [list of strings]
    }}

    Resume:
    {resume_text}
    """

    try:
        ats_response = model.generate_content(ats_prompt)
        ats_raw = ats_response.text.strip()

        try:
            ats_data = json.loads(ats_raw)
        except:
            cleaned = ats_raw.replace("```json", "").replace("```", "").strip()
            ats_data = json.loads(cleaned)

    except Exception as e:
        ats_data = {
            "score": 0,
            "extracted_data": {},
            "keywords_missing": [],
            "strengths": [],
            "weaknesses": [],
            "suggestions": [],
            "error": str(e)
        }

    # Guarantee all fields exist so frontend never crashes
    ats_data.setdefault("score", 0)
    ats_data.setdefault("extracted_data", {})
    ats_data.setdefault("keywords_missing", [])
    ats_data.setdefault("strengths", [])
    ats_data.setdefault("weaknesses", [])
    ats_data.setdefault("suggestions", [])

    result = {
        "analysis": ats_data,
        "model_used": model_name,
    }

    # -------------------------------------
    # 3. Job Description Comparison (Optional)
    # -------------------------------------
    if job_description:
        jd_prompt = f"""
        Compare the resume with the job description.

        Resume:
        {resume_text}

        Job Description:
        {job_description}

        Return ONLY valid JSON in this format:
        {{
           "match_score": number,
           "jd_missing_keywords": [list of strings],
           "recommendations": [list of strings]
        }}
        """

        try:
            jd_response = model.generate_content(jd_prompt)
            jd_raw = jd_response.text.strip()

            try:
                jd_data = json.loads(jd_raw)
            except:
                cleaned = jd_raw.replace("```json", "").replace("```", "").strip()
                jd_data = json.loads(cleaned)

        except Exception as e:
            jd_data = {
                "match_score": None,
                "jd_missing_keywords": [],
                "recommendations": [],
                "error": str(e)
            }
    else:
        jd_data = {
            "match_score": None,
            "jd_missing_keywords": [],
            "recommendations": []
        }

    # Guarantee fields exist
    jd_data.setdefault("match_score", None)
    jd_data.setdefault("jd_missing_keywords", [])
    jd_data.setdefault("recommendations", [])

    result["jd_comparison"] = jd_data

    return result
