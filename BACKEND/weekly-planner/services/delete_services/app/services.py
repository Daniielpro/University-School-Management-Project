import requests
from database import get_db_connection
from models import Activity
import os

WEBHOOK_URL = os.getenv("WEBHOOK_URL")

def send_webhook(event_type, data):
    """Envía un webhook con el evento especificado"""
    try:
        response = requests.post(WEBHOOK_URL, json={"event_type": event_type, "data": data})
        response.raise_for_status()
        print(f"✅ Webhook enviado: {event_type}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error enviando webhook: {e}")

def get_all_activities():
    """Obtiene todas las actividades de la base de datos"""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM activities")
        activities = cursor.fetchall()
        return [
            {"id": a[0], "title": a[1], "description": a[2], "day_of_week": a[3], "start_time": a[4], "end_time": a[5]}
            for a in activities
        ]
    except Exception as e:
        raise Exception(str(e))
    finally:
        cursor.close()
        conn.close()

def delete_activity(activity_id: int):
    """Elimina una actividad y envía un webhook"""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        print(f"🔍 Buscando actividad con ID: {activity_id}")
        cursor.execute("SELECT id FROM activities WHERE id = %s", (activity_id,))
        found_id = cursor.fetchone()
        print(f"📌 Resultado de la consulta: {found_id}")

        if not found_id:
            print(f"❌ Actividad con ID {activity_id} no encontrada en la base de datos.")
            raise Exception("Actividad no encontrada")

        print(f"🗑 Eliminando actividad con ID: {activity_id}")
        cursor.execute("DELETE FROM activities WHERE id=%s RETURNING id", (activity_id,))
        deleted_id = cursor.fetchone()
        conn.commit()
        print(f"✅ Actividad eliminada: {deleted_id}")

        if not deleted_id:
            print("❌ No se pudo eliminar la actividad.")
            raise Exception("No se pudo eliminar la actividad")

        send_webhook("activity_deleted", {"id": activity_id})
        return {"message": "Actividad eliminada con éxito"}
    except Exception as e:
        conn.rollback()
        print(f"❌ Error en delete_activity: {e}")
        raise Exception(str(e))
    finally:
        cursor.close()
        conn.close()
