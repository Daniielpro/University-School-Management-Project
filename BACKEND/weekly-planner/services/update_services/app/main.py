from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import psycopg2
import os
import requests

# Configuración de la base de datos desde variables de entorno
DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', '1751404730')
DB_HOST = os.getenv('DB_HOST', 'database-2.crgu1k6u14fx.us-east-1.rds.amazonaws.com')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'gestion_horarios_db')
WEBHOOK_URL = os.getenv("WEBHOOK_URL", "http://localhost:3030/webhook")
PORT = int(os.getenv("PORT", 3024))  # Puerto configurable para el servicio

# Inicializar la aplicación FastAPI
app = FastAPI()

# Configuración de CORS (puedes agregar más orígenes si es necesario)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Los orígenes permitidos
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de datos para actualización de actividad
class ActivityUpdate(BaseModel):
    title: str
    description: str
    day_of_week: str
    start_time: str
    end_time: str

# Función para conectar con la base de datos
def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT  # Se añade el puerto de PostgreSQL
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

# Función para enviar webhooks
def send_webhook(event_type, data):
    try:
        response = requests.post(WEBHOOK_URL, json={"event_type": event_type, "data": data})
        response.raise_for_status()
        print(f"✅ Webhook enviado correctamente: {event_type}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error enviando webhook: {e}")

# Endpoint para actualizar una actividad
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

# Punto de entrada para ejecución directa
if __name__ == "__main__":
    print("Verificando conexión a la base de datos...")
    check_db_connection()  # Verificar conexión antes de arrancar el servidor
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
