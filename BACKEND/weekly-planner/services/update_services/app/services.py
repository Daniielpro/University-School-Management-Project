import requests
import os
from database import get_db_connection
from models import ActivityUpdate

WEBHOOK_URL = os.getenv("WEBHOOK_URL")

def send_webhook(event_type, data):
    """Envía un webhook con el evento especificado"""
    try:
        response = requests.post(WEBHOOK_URL, json={"event_type": event_type, "data": data})
        response.raise_for_status()
        print(f"✅ Webhook enviado: {event_type}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error enviando webhook: {e}")

def update_activity(activity_id: int, activity: ActivityUpdate):
    """Actualiza una actividad en la base de datos y envía un webhook"""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "UPDATE activities SET title=%s, description=%s, day_of_week=%s, start_time=%s, end_time=%s WHERE id=%s RETURNING id",
            (activity.title, activity.description, activity.day_of_week, activity.start_time, activity.end_time, activity_id)
        )
        updated_id = cursor.fetchone()
        
        if not updated_id:
            raise Exception("Actividad no encontrada")

        conn.commit()

        webhook_data = {
            "id": activity_id,
            "title": activity.title,
            "description": activity.description,
            "day_of_week": activity.day_of_week,
            "start_time": activity.start_time,
            "end_time": activity.end_time
        }

        send_webhook("activity_updated", webhook_data)
        return {"message": "Actividad actualizada con éxito"}
    except Exception as e:
        conn.rollback()
        raise Exception(str(e))
    finally:
        cursor.close()
        conn.close()
