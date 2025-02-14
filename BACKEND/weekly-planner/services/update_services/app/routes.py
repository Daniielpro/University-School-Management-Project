from fastapi import APIRouter, HTTPException
from services import update_activity
from models import ActivityUpdate

router = APIRouter()

@router.put("/activities/{activity_id}", tags=["Activities"])
def update_activity_route(activity_id: int, activity: ActivityUpdate):
    """Actualiza una actividad y envía un webhook"""
    try:
        return update_activity(activity_id, activity)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
