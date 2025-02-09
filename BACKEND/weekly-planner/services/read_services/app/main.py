from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import psycopg2
import os


app = FastAPI()
WEBHOOK_URL = os.getenv("WEBHOOK_URL", "http://localhost:3030/webhook")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],  
    allow_headers=["*"],  
)


DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', '1751404730')
DB_HOST = os.getenv('DB_HOST', 'database-2.crgu1k6u14fx.us-east-1.rds.amazonaws.com')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'gestion_horarios_db')

def get_db_connection():
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD
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


@app.get("/activities/")
def get_activities():
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id, title, description, day_of_week, start_time, end_time FROM activities")
        activities = cursor.fetchall()
        result = [
            {
                "id": row[0],
                "title": row[1],
                "description": row[2],
                "day_of_week": row[3],
                "start_time": str(row[4]),
                "end_time": str(row[5]),
            }
            for row in activities
        ]
        return result
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


@app.get("/activities/{activity_id}")
def get_activity(activity_id: int):
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id, title, description, day_of_week, start_time, end_time FROM activities WHERE id = %s", (activity_id,))
        activity = cursor.fetchone()
        if activity is None:
            raise HTTPException(status_code=404, detail="Activity not found")
        return {
            "id": activity[0],
            "title": activity[1],
            "description": activity[2],
            "day_of_week": activity[3],
            "start_time": str(activity[4]),
            "end_time": str(activity[5]),
        }
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


if __name__ == "__main__":
    import uvicorn
    PORT = int(os.getenv("PORT", 3022))
    uvicorn.run(app, host="0.0.0.0", port=PORT)