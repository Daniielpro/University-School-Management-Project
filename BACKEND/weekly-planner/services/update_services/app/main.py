from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
import os
import requests


DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', '1751404730')
DB_HOST = os.getenv('DB_HOST', 'database-2.crgu1k6u14fx.us-east-1.rds.amazonaws.com')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'gestion_horarios_db')
WEBHOOK_URL = os.getenv("WEBHOOK_URL", "http://localhost:3030/webhook")
PORT = int(os.getenv("PORT", 3024))  


app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class ActivityUpdate(BaseModel):
    title: str
    description: str
    day_of_week: str
    start_time: str
    end_time: str


def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT  
    )


def check_db_connection():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1;")  
        cursor.close()
        conn.close()
        print("✅ Conexión a la base de datos exitosa!")
    except Exception as e:
        print(f"❌ Error de conexión a la base de datos: {e}")
        raise Exception("Conexión a la base de datos fallida")


def send_webhook(event_type, data):
    try:
        response = requests.post(WEBHOOK_URL, json={"event_type": event_type, "data": data})
        response.raise_for_status()
        print(f"✅ Webhook enviado correctamente: {event_type}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error enviando webhook: {e}")


@app.put("/activities/{activity_id}")
def update_activity(activity_id: int, activity: ActivityUpdate):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute(
            "UPDATE activities SET title=%s, description=%s, day_of_week=%s, start_time=%s, end_time=%s WHERE id=%s RETURNING id",
            (activity.title, activity.description, activity.day_of_week, activity.start_time, activity.end_time, activity_id)
        )
        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="Actividad no encontrada")

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
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    print("Verificando conexión a la base de datos...")
    check_db_connection()  
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
