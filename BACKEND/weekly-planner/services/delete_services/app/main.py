from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
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
PORT = int(os.getenv("PORT", 3021))  # Puerto configurable

# Inicializar la aplicación FastAPI
app = FastAPI()

# Configuración de CORS para permitir peticiones desde otros orígenes
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3020", "http://127.0.0.1:3020", "*"],  # ⚠️ Evita "*" en producción
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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

# Endpoint para obtener todas las actividades
@app.get("/activities")
def get_activities():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT * FROM activities")
        activities = cursor.fetchall()
        if not activities:
            raise HTTPException(status_code=404, detail="No activities found")
        # Aquí puedes formatear los datos antes de retornarlos si es necesario
        activities_list = []
        for activity in activities:
            activities_list.append({
                "id": activity[0],
                "title": activity[1],
                "description": activity[2],
                "day_of_week": activity[3],
                "start_time": activity[4],
                "end_time": activity[5]
            })
        return {"activities": activities_list}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# Endpoint para eliminar una actividad
@app.delete("/activities/{activity_id}")
def delete_activity(activity_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("DELETE FROM activities WHERE id=%s RETURNING id", (activity_id,))
        deleted_id = cursor.fetchone()
        if not deleted_id:
            raise HTTPException(status_code=404, detail="Actividad no encontrada")

        conn.commit()

        send_webhook("activity_deleted", {"id": activity_id})

        return {"message": "Actividad eliminada con éxito"}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()

# Punto de entrada para ejecución directa
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
