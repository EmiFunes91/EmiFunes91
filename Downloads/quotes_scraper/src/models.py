"""
models.py
SQLAlchemy models for quotes.
"""

from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String

Base = declarative_base()

class Quote(Base):
    """
    SQLAlchemy model for a quote.
    """
    __tablename__ = 'quotes'
    id = Column(Integer, primary_key=True)
    text = Column(String, nullable=False)
    author = Column(String, nullable=False)
    tags = Column(String)  # Comma-separated tags
    page = Column(Integer) 