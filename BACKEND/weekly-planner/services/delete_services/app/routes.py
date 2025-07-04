from fastapi import APIRouter, Depends, HTTPException
from services import get_all_activities, delete_activity
from auth import verify_jwt

router = APIRouter()

@router.get("/activities/", dependencies=[Depends(verify_jwt)], tags=["Activities"])
def get_activities():
    """Obtiene la lista de actividades registradas"""
    try:
        activities = get_all_activities()
        if not activities:
            raise HTTPException(status_code=404, detail="No hay actividades registradas")
        return {"activities": activities}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@router.delete("/activities/{activity_id}", dependencies=[Depends(verify_jwt)], tags=["Activities"])
def remove_activity(activity_id: int):
    """Elimina una actividad por su ID"""
    print(f"📌 Recibida solicitud DELETE para activity_id: {activity_id}")

    try:
        return delete_activity(activity_id)
    except Exception as e:
        print(f"❌ Error en remove_activity: {e}")
        raise HTTPException(status_code=500, detail=str(e))
