import requests
from database import get_db_connection
from models import Activity
import os

WEBHOOK_URL = os.getenv("WEBHOOK_URL", "http://localhost:3030/webhook")

def send_webhook(event_type, data):
    try:
        response = requests.post(WEBHOOK_URL, json={"event_type": event_type, "data": data})
        response.raise_for_status()
        print(f"✅ Webhook enviado: {event_type}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error al enviar el webhook: {e}")

def create_activity(activity: Activity):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO activities (title, description, day_of_week, start_time, end_time) VALUES (%s, %s, %s, %s, %s) RETURNING id",
            (activity.title, activity.description, activity.day_of_week, activity.start_time, activity.end_time)
        )
        activity_id = cursor.fetchone()[0]
        conn.commit()

        webhook_data = {
            "id": activity_id,
            "title": activity.title,
            "description": activity.description,
            "day_of_week": activity.day_of_week,
            "start_time": activity.start_time,
            "end_time": activity.end_time
        }

        send_webhook("activity_created", webhook_data)

        return {"message": "Actividad creada exitosamente", "id": activity_id}
    except Exception as e:
        conn.rollback()
        raise Exception(str(e))
    finally:
        cursor.close()
        conn.close()
