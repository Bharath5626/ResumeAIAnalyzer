# AI-Powered Resume Analysis & ATS Optimization System

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python](https://img.shields.io/badge/Python-3.8+-blue.svg)](https://www.python.org/downloads/)
[![React](https://img.shields.io/badge/React-18+-61DAFB.svg)](https://reactjs.org/)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.100+-009688.svg)](https://fastapi.tiangolo.com/)

An intelligent web application that leverages Natural Language Processing (NLP) and Generative AI to analyze resumes, evaluate ATS compatibility, and provide actionable improvement suggestions. The system includes a comprehensive resume builder with multiple professional templates.

---

## 📋 Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [System Architecture](#system-architecture)
- [Technology Stack](#technology-stack)
- [Installation](#installation)
- [Configuration](#configuration)
- [Usage](#usage)
- [ATS Scoring Methodology](#ats-scoring-methodology)
- [API Documentation](#api-documentation)
- [Project Structure](#project-structure)
- [Future Roadmap](#future-roadmap)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## 🎯 Overview

This project addresses the critical challenge of resume optimization in modern recruitment processes. With over 90% of large companies using Applicant Tracking Systems (ATS), this tool helps job seekers improve their resume's compatibility and visibility to recruiters.

### Problem Statement
- Manual resume analysis is time-consuming and inconsistent
- Candidates lack visibility into how ATS systems evaluate their resumes
- Generic improvement suggestions fail to provide actionable insights

### Solution
An automated system that combines NLP, rule-based algorithms, and generative AI to provide:
- Instant resume parsing and structured data extraction
- Transparent ATS compatibility scoring
- Personalized improvement recommendations
- Professional resume templates with live preview

---

## ✨ Key Features

### 📊 Resume Analysis Engine
- **Intelligent Text Extraction**: PDF parsing with support for various resume formats
- **Structured Data Parsing**: Automated extraction of personal information, skills, experience, and education
- **NLP-Powered Skill Identification**: Context-aware skill extraction using natural language processing
- **ATS Compatibility Scoring**: Rule-based weighted algorithm providing explainable scores (0-100)
- **Gap Analysis**: Identifies missing keywords and required skills for target roles
- **AI-Generated Insights**: Personalized improvement suggestions powered by Google Gemini API

### 🎨 Resume Builder
- **5 Professional Templates**:
  - Classic Clean: Traditional, ATS-friendly format
  - Modern Blue Accent: Contemporary design with subtle color accents
  - Two Column Modern: Space-efficient layout for comprehensive resumes
  - Creative Sidebar: Eye-catching design for creative roles
  - Corporate Executive: Premium format for senior positions
- **Live Preview**: Real-time rendering of resume changes
- **Flexible View Modes**: Page view and full-width preview options
- **PDF Export**: High-quality PDF generation for download

### 🔐 Security Features
- **Secure Authentication**: SHA-256 pre-hashing combined with bcrypt for password storage
- **JWT Token Management**: Stateless authentication with secure token handling
- **Protected Routes**: Role-based access control for sensitive operations
- **Input Validation**: Comprehensive data sanitization and validation

---

## 🏗️ System Architecture

```
┌─────────────┐
│   Client    │
│  (React)    │
└──────┬──────┘
       │ HTTP/HTTPS
       ↓
┌─────────────────────────────────────┐
│         FastAPI Backend             │
├─────────────────────────────────────┤
│  ┌──────────────┐  ┌─────────────┐ │
│  │ Auth Service │  │ Resume API  │ │
│  └──────┬───────┘  └──────┬──────┘ │
│         │                 │         │
│  ┌──────▼──────────────────▼──────┐ │
│  │     NLP Processing Engine      │ │
│  │  • Text Extraction             │ │
│  │  • Entity Recognition          │ │
│  │  • Skill Extraction            │ │
│  └────────────┬───────────────────┘ │
│               │                      │
│  ┌────────────▼───────────────────┐ │
│  │   ATS Scoring Algorithm        │ │
│  │  • Weighted Rule-Based         │ │
│  │  • Multi-factor Analysis       │ │
│  └────────────┬───────────────────┘ │
│               │                      │
│  ┌────────────▼───────────────────┐ │
│  │   AI Suggestion Generator      │ │
│  │  (Google Gemini Integration)   │ │
│  └────────────────────────────────┘ │
└──────────────┬──────────────────────┘
               ↓
        ┌──────────────┐
        │   Database   │
        │   (SQLite)   │
        └──────────────┘
```

---

## 🛠️ Technology Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React.js 18+** | UI framework for component-based architecture |
| **Tailwind CSS** | Utility-first CSS framework for responsive design |
| **Axios** | HTTP client for API communication |
| **React Router v6** | Client-side routing and navigation |
| **React PDF** | PDF generation and rendering |

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | High-performance async web framework |
| **SQLAlchemy** | ORM for database operations |
| **Passlib + Bcrypt** | Password hashing and verification |
| **PyJWT** | JWT token generation and validation |
| **Google Gemini API** | Generative AI for suggestions |
| **PyPDF2** | PDF text extraction |
| **spaCy** | NLP processing (optional enhancement) |

### Database
- **SQLite**: Lightweight relational database for development
- **Migration Ready**: Easily upgradable to PostgreSQL/MySQL for production

---

## 📦 Installation

### Prerequisites
- **Python 3.8+**
- **Node.js 16+**
- **npm or yarn**
- **Git**

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Bharath5626/ResumeAIAnalyzer.git
cd ResumeAIAnalyzer
```

### 2️⃣ Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run database migrations (if applicable)
# alembic upgrade head

# Start the development server
uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
```

Backend API will be available at: `http://localhost:8000`  
API documentation: `http://localhost:8000/docs`

### 3️⃣ Frontend Setup
```bash
# Open new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

Frontend application will be available at: `http://localhost:3000`

---

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the `backend` directory:

```env
# API Keys
GEMINI_API_KEY=your_gemini_api_key_here

# JWT Configuration
JWT_SECRET=your_secure_secret_key_here
JWT_ALGORITHM=HS256
JWT_ACCESS_TOKEN_EXPIRE_MINUTES=30

# Database
DATABASE_URL=sqlite:///./app.db

# Application Settings
DEBUG=True
ALLOWED_ORIGINS=http://localhost:3000
```

### Obtaining API Keys
1. **Google Gemini API**: 
   - Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
   - Create a new API key
   - Add to `.env` file

---

## 🚀 Usage

### Analyzing a Resume

1. **Register/Login**: Create an account or sign in
2. **Upload Resume**: Click "Upload Resume" and select your PDF file
3. **View Analysis**: System automatically extracts and analyzes resume data
4. **Review Scores**: Check ATS compatibility score and detailed breakdown
5. **Review Suggestions**: Read AI-generated improvement recommendations
6. **Download Report**: Export analysis results as PDF

### Building a Resume

1. **Navigate to Builder**: Click "Resume Builder" in the navigation menu
2. **Select Template**: Choose from 5 professional templates
3. **Fill Information**: Enter your details in the form sections
4. **Live Preview**: See real-time changes in the preview panel
5. **Download PDF**: Click "Download PDF" to save your resume

---

## 📊 ATS Scoring Methodology

The ATS compatibility score is calculated using a **weighted rule-based algorithm** that evaluates multiple factors:

### Scoring Formula

```
ATS Score = (W₁ × S₁) + (W₂ × S₂) + (W₃ × S₃) - P

Where:
W₁ = Skill Match Weight (40%)
W₂ = Experience Weight (30%)
W₃ = Education Weight (20%)
P  = Penalties (10%)
```

### Evaluation Criteria

| Category | Weight | Sub-factors |
|----------|--------|-------------|
| **Skills** | 40% | Keyword density, technical vs. soft skills balance, industry relevance |
| **Experience** | 30% | Years of experience, role progression, achievement metrics |
| **Education** | 20% | Degree relevance, institution recognition, certifications |
| **Format** | 10% | File type, parsing compatibility, structure clarity |

### Score Interpretation
- **90-100**: Excellent - Resume is highly ATS-compatible
- **75-89**: Good - Minor improvements recommended
- **60-74**: Fair - Several areas need optimization
- **Below 60**: Poor - Significant revision required

---

## 📚 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123",
  "full_name": "John Doe"
}
```

#### Login
```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

### Resume Analysis Endpoints

#### Upload & Analyze Resume
```http
POST /api/resume/analyze
Authorization: Bearer {jwt_token}
Content-Type: multipart/form-data

file: [PDF file]
```

#### Get Analysis History
```http
GET /api/resume/history
Authorization: Bearer {jwt_token}
```

**Interactive API Documentation**: Visit `http://localhost:8000/docs` when the backend is running.

---

## 📁 Project Structure

```
ResumeAIAnalyzer/
├── backend/
│   ├── app/
│   │   ├── main.py              # FastAPI application entry point
│   │   ├── models.py            # SQLAlchemy database models
│   │   ├── schemas.py           # Pydantic schemas for validation
│   │   ├── auth/
│   │   │   ├── jwt_handler.py   # JWT token management
│   │   │   └── password.py      # Password hashing utilities
│   │   ├── resume/
│   │   │   ├── parser.py        # Resume text extraction
│   │   │   ├── analyzer.py      # ATS scoring logic
│   │   │   └── ai_suggestions.py # Gemini API integration
│   │   ├── database.py          # Database connection
│   │   └── config.py            # Configuration management
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── Auth/            # Login/Register components
│   │   │   ├── Dashboard/       # Main dashboard
│   │   │   ├── ResumeBuilder/   # Resume builder components
│   │   │   └── Analysis/        # Analysis display components
│   │   ├── services/
│   │   │   └── api.js           # Axios API configuration
│   │   ├── App.js
│   │   └── index.js
│   ├── package.json
│   └── tailwind.config.js
│
├── docs/
│   ├── architecture.md
│   ├── api-reference.md
│   └── deployment.md
│
├── README.md
└── LICENSE
```

---

## 🔮 Future Roadmap

### Short-term (Next 3 months)
- [ ] **Job Description Matching**: Semantic comparison between resume and job postings
- [ ] **Multi-language Support**: Resume analysis in Spanish, French, German
- [ ] **Enhanced Analytics**: Detailed skill gap visualization with charts
- [ ] **Resume Version Control**: Track changes and compare different versions

### Mid-term (6 months)
- [ ] **Recruiter Dashboard**: Tools for HR professionals to evaluate multiple resumes
- [ ] **Bias Detection Module**: Identify and suggest removal of biased language
- [ ] **Integration APIs**: Connect with LinkedIn, Indeed, and other job platforms
- [ ] **Advanced Templates**: 10+ additional resume designs

### Long-term (12 months)
- [ ] **Cloud Deployment**: Scalable infrastructure on AWS/GCP
- [ ] **Mobile Applications**: iOS and Android native apps
- [ ] **Enterprise Features**: Team collaboration, bulk processing
- [ ] **Explainable AI**: Visual explanation of scoring decisions

---

## 🤝 Contributing

Contributions are welcome! Please follow these guidelines:

1. **Fork the repository**
2. **Create a feature branch**: `git checkout -b feature/YourFeature`
3. **Commit changes**: `git commit -m 'Add YourFeature'`
4. **Push to branch**: `git push origin feature/YourFeature`
5. **Submit a Pull Request**

### Development Guidelines
- Follow PEP 8 style guide for Python code
- Use ESLint configuration for JavaScript/React code
- Write unit tests for new features
- Update documentation for API changes

---



## 👨‍💻 Author

**Bharath S**  
Final Year Computer Science Student  
Specialization: Artificial Intelligence & Machine Learning

- GitHub: [Bharath5626](https://github.com/Bharath5626)
- LinkedIn: [Bharath5626](https://linkedin.com/in/Bharath5626)
- Email: Bharathsiva453@gmail.com

### Academic Context
This project was developed as a final year capstone project, exploring the intersection of NLP, machine learning, and web development in solving real-world recruitment challenges.

---

## 🙏 Acknowledgments

- Google Gemini API for generative AI capabilities
- FastAPI framework for excellent documentation and developer experience
- React community for comprehensive UI component libraries
- Open-source contributors whose libraries made this project possible

---

## 📧 Support

For questions, issues, or feature requests:
- **Email**: Bharathsiva453@gmail.com
- **Issues**: [GitHub Issues](https://github.com/Bharath5626/ResumeAIAnalyzer/issues)
- **Discussions**: [GitHub Discussions](https://github.com/Bharath5626/ResumeAIAnalyzer/discussions)

---

<div align="center">

**If you find this project helpful, please consider giving it a ⭐️**

Made with ❤️ by Bharath S

</div>
