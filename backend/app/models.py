from sqlalchemy import Column, Integer, String, Text, DateTime, JSON
from sqlalchemy.ext.declarative import declarative_base
import datetime

Base = declarative_base()

class PopularTimes(Base):
    __tablename__ = "popular_times"

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False) 
    place_id = Column(String, unique=True, nullable=False)  
    address = Column(String, nullable=True) 
    hours = Column(JSON, nullable=True)  
    populartimes = Column(JSON, nullable=True)  
    current_popularity = Column(Integer, nullable=True) 
    last_updated = Column(DateTime, default=datetime.datetime.utcnow)  
