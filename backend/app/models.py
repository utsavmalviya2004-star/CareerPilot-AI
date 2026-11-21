from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime
from .database import Base

class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    hashed_password = Column(String)
    target_role = Column(String, default="AI/ML Engineer")

class AnalysisReport(Base):
    __tablename__ = "analysis_reports"
    id = Column(Integer, primary_key=True, index=True)
    filename = Column(String)
    extracted_skills = Column(Text)
    ats_score = Column(Integer)
    created_at = Column(DateTime, default=datetime.utcnow)
