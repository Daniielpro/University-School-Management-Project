from fastapi import APIRouter, HTTPException
from services import get_all_activities, get_activity

router = APIRouter()

@router.get("/activities/", tags=["Activities"])
def get_activities():
    """Obtiene la lista de actividades registradas"""
    try:
        return get_all_activities()
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.get("/activities/{activity_id}", tags=["Activities"])
def get_activity_route(activity_id: int):
    """Obtiene una actividad por su ID"""
    try:
        return get_activity(activity_id)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
