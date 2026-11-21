from fastapi import FastAPI, UploadFile, File, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from sqlalchemy.orm import Session
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import pypdf
import docx
import io
import re
from .database import engine, get_db
from . import models, auth

models.Base.metadata.create_all(bind=engine)

app = FastAPI(title="CareerPilot AI Platform API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SKILL_BANK = [
    "Python", "Java", "C", "C++", "C#", "JavaScript", "TypeScript", "SQL", "NoSQL",
    "HTML", "CSS", "Tailwind", "React", "Next.js", "Node.js", "Express", "Angular", "Vue",
    "FastAPI", "Django", "Flask", "Spring Boot", "REST API", "GraphQL",
    "Machine Learning", "Deep Learning", "NLP", "Computer Vision", "CNN", "RNN",
    "TensorFlow", "PyTorch", "Scikit-learn", "Pandas", "NumPy", "OpenCV", "Agentic AI",
    "Generative AI", "LLM", "LangChain", "RAG", "TF-IDF", "Naive Bayes", "SVM",
    "Data Structures", "Algorithms", "OOP", "OOPS", "DBMS", "Operating Systems", "OS",
    "Computer Networks", "CN", "System Design", "Git", "GitHub", "Docker", "Kubernetes",
    "AWS", "Azure", "GCP", "Linux", "Cyber Security", "Network Security", "Streamlit",
    "MongoDB", "PostgreSQL", "MySQL", "Firebase", "Power BI", "Tableau", "Excel"
]

class AuthRequest(BaseModel):
    name: str = "Student"
    email: str
    password: str
    target_role: str = "AI/ML Engineer"

class MatchRequest(BaseModel):
    resume_text: str
    job_description: str

def extract_text_from_file(filename: str, content: bytes) -> str:
    lower = filename.lower()
    if lower.endswith(".pdf"):
        reader = pypdf.PdfReader(io.BytesIO(content))
        return "\n".join([page.extract_text() or "" for page in reader.pages])
    elif lower.endswith(".docx"):
        doc = docx.Document(io.BytesIO(content))
        return "\n".join([p.text for p in doc.paragraphs])
    elif lower.endswith(".txt"):
        return content.decode("utf-8", errors="ignore")
    else:
        raise HTTPException(status_code=400, detail="Unsupported file format. Please upload PDF, DOCX, or TXT.")

@app.get("/")
def health():
    return {"status": "CareerPilot AI Full Backend Active"}

@app.post("/auth/register")
def register(req: AuthRequest, db: Session = Depends(get_db)):
    existing = db.query(models.User).filter(models.User.email == req.email).first()
    if existing:
        raise HTTPException(status_code=400, detail="Email already registered")
    user = models.User(
        name=req.name,
        email=req.email,
        hashed_password=auth.hash_password(req.password),
        target_role=req.target_role
    )
    db.add(user)
    db.commit()
    db.refresh(user)
    token = auth.create_access_token({"sub": user.email})
    return {"access_token": token, "user": {"name": user.name, "email": user.email, "target_role": user.target_role}}

@app.post("/auth/login")
def login(req: AuthRequest, db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.email == req.email).first()
    if not user or not auth.verify_password(req.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid credentials")
    token = auth.create_access_token({"sub": user.email})
    return {"access_token": token, "user": {"name": user.name, "email": user.email, "target_role": user.target_role}}

@app.post("/resume/upload")
async def upload_resume(file: UploadFile = File(...), db: Session = Depends(get_db)):
    content = await file.read()
    text = extract_text_from_file(file.filename, content)
    if len(text.strip()) < 15:
        raise HTTPException(status_code=400, detail="No readable text found in file.")

    detected = [s for s in SKILL_BANK if re.search(r"\b" + re.escape(s) + r"\b", text, re.I)]
    ats = min(97, 35 + len(detected) * 4)

    report = models.AnalysisReport(filename=file.filename, extracted_skills=", ".join(detected), ats_score=ats)
    db.add(report)
    db.commit()

    return {
        "filename": file.filename,
        "extracted_text": text,
        "skills": detected,
        "ats_score": ats
    }

@app.post("/job/match")
def match_job(req: MatchRequest):
    if not req.resume_text.strip() or not req.job_description.strip():
        raise HTTPException(status_code=400, detail="Resume text and Job Description required.")
    vectorizer = TfidfVectorizer(stop_words="english")
    tfidf = vectorizer.fit_transform([req.resume_text, req.job_description])
    sim = float(cosine_similarity(tfidf[0:1], tfidf[1:2])[0][0])

    jd_skills = [s for s in SKILL_BANK if re.search(r"\b" + re.escape(s) + r"\b", req.job_description, re.I)]
    res_skills = [s for s in SKILL_BANK if re.search(r"\b" + re.escape(s) + r"\b", req.resume_text, re.I)]
    matched = [s for s in jd_skills if s in res_skills]
    missing = [s for s in jd_skills if s not in res_skills]

    kw_ratio = (len(matched) / len(jd_skills)) if jd_skills else sim
    final_score = min(98, max(20, int((sim * 0.45 + kw_ratio * 0.55) * 100)))

    return {
        "match_score": final_score,
        "cosine_similarity": round(sim * 100, 1),
        "matched_skills": matched,
        "missing_skills": missing,
    }
