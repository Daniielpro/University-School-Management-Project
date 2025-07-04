from pydantic import BaseModel

class ActivityUpdate(BaseModel):
    title: str
    description: str
    day_of_week: str  
    start_time: str   
    end_time: str     
 