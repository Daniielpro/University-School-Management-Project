from fastapi import FastAPI, HTTPException
import psycopg2
import os
import requests
from flask_cors import CORS
# Configuración de la base de datos
DB_USER = os.getenv('DB_USER', 'admin_user')
DB_PASSWORD = os.getenv('DB_PASSWORD', '1751404730')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'gestion_horarios_db')

WEBHOOK_URL = os.getenv("WEBHOOK_URL", "http://localhost:8005/webhook")

app = FastAPI()

def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )

def send_webhook(event_type, data):
    try:
        response = requests.post(WEBHOOK_URL, json={"event_type": event_type, "data": data})
        response.raise_for_status()
        print(f"✅ Webhook sent: {event_type}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to send webhook: {e}")

@app.delete("/activities/{activity_id}")
def delete_activity(activity_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM activities WHERE id=%s RETURNING id", (activity_id,))
        deleted_id = cursor.fetchone()
        if not deleted_id:
            raise HTTPException(status_code=404, detail="Activity not found")

        conn.commit()

        send_webhook("activity_deleted", {"id": activity_id})

        return {"message": "Activity deleted successfully"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()
