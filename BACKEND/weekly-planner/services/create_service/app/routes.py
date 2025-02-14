from fastapi import APIRouter, Depends, HTTPException
from models import Activity
from services import create_activity
from auth import verify_jwt

router = APIRouter()

@router.post("/activities/", dependencies=[Depends(verify_jwt)])
def create_activity_route(activity: Activity):
    try:
        return create_activity(activity)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
