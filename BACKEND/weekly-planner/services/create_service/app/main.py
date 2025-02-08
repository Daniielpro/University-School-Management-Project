import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import psycopg2
import requests
from fastapi.middleware.cors import CORSMiddleware

# Configuración de la base de datos
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', '1751404730')
DB_HOST = os.getenv('DB_HOST', 'database-2.crgu1k6u14fx.us-east-1.rds.amazonaws.com')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'gestion_horarios_db')
WEBHOOK_URL = os.getenv("WEBHOOK_URL", "http://localhost:3030/webhook")

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3020", "http://127.0.0.1:3020", "*"],  # ⚠️ Evita "*" en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Ruta relativa para la carpeta estática
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

# Función para verificar la conexión a la base de datos
def check_db_connection():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1;")  # Hacer una consulta simple para verificar la conexión
        cursor.close()
        conn.close()
        print("✅ Conexión a la base de datos exitosa!")
    except Exception as e:
        print(f"❌ Error de conexión a la base de datos: {e}")
        raise Exception("Conexión a la base de datos fallida")

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

# Verificar conexión a la base de datos al iniciar
check_db_connection()

# Punto de entrada
if __name__ == "__main__":
    import uvicorn
    PORT = int(os.getenv("PORT", 3020))  # Obtiene el puerto de la variable de entorno o usa 3020 por defecto
    uvicorn.run(app, host="0.0.0.0", port=PORT)
