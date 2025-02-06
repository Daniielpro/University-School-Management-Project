from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import psycopg2
import os
import requests  # Para enviar Webhooks
from flask_cors import CORS
# Configuración de la base de datos
DB_USER = os.getenv('DB_USER', 'admin_user')
DB_PASSWORD = os.getenv('DB_PASSWORD', '1751404730')
DB_HOST = os.getenv('DB_HOST', 'localhost')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'gestion_horarios_db')

# URL del Webhook receptor
WEBHOOK_URL = os.getenv("WEBHOOK_URL", "http://localhost:8005/webhook")

app = FastAPI()

# Montar la carpeta 'static' para servir archivos estáticos (CSS, JS, imágenes)
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")

# Configurar Jinja2 para las plantillas HTML
templates = Jinja2Templates(directory="frontend/templates")

@app.get("/")
async def get_index(request: Request):
    # Renderiza la plantilla index.html ubicada en 'frontend/templates'
    return templates.TemplateResponse("index.html", {"request": request})

# Modelo de datos para actividades
class Activity(BaseModel):
    title: str
    description: str
    day_of_week: str  # Ejemplo: "Monday", "Tuesday", etc.
    start_time: str   # Formato HH:MM
    end_time: str     # Formato HH:MM

# Conectar a la base de datos
def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
    )

# Función para enviar Webhooks
def send_webhook(event_type, data):
    try:
        response = requests.post(WEBHOOK_URL, json={"event_type": event_type, "data": data})
        response.raise_for_status()
        print(f"✅ Webhook sent: {event_type}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to send webhook: {e}")

# Endpoint para crear actividades
@app.post("/activities/")
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

        # Datos para Webhook
        webhook_data = {
            "id": activity_id,
            "title": activity.title,
            "description": activity.description,
            "day_of_week": activity.day_of_week,
            "start_time": activity.start_time,
            "end_time": activity.end_time
        }

        # Enviar Webhook
        send_webhook("activity_created", webhook_data)

        return {"message": "Activity created successfully", "id": activity_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# Punto de entrada
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8001)
