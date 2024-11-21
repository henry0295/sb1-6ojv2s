from sqlalchemy import Column, Integer, String, Enum, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from .database import Base
import enum

class AgentStatus(enum.Enum):
    AVAILABLE = "available"
    ON_CALL = "on_call"
    BREAK = "break"
    OFFLINE = "offline"

class Agent(Base):
    __tablename__ = "agents"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    email = Column(String, unique=True, index=True)
    extension = Column(String, unique=True)
    password_hash = Column(String)
    status = Column(Enum(AgentStatus), default=AgentStatus.OFFLINE)
    created_at = Column(DateTime, default=datetime.utcnow)
    last_login = Column(DateTime, nullable=True)
    
    # Relationships
    calls = relationship("Call", back_populates="agent")
    skills = relationship("Skill", secondary="agent_skills")