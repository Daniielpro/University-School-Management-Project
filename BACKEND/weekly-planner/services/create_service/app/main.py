import os
from fastapi import FastAPI, HTTPException, Request
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from pydantic import BaseModel
import psycopg2
import requests
from fastapi.middleware.cors import CORSMiddleware


DB_USER = os.getenv('DB_USER', 'postgres')
DB_PASSWORD = os.getenv('DB_PASSWORD', '1751404730')
DB_HOST = os.getenv('DB_HOST', 'database-2.crgu1k6u14fx.us-east-1.rds.amazonaws.com')
DB_PORT = os.getenv('DB_PORT', '5432')
DB_NAME = os.getenv('DB_NAME', 'gestion_horarios_db')
WEBHOOK_URL = os.getenv("WEBHOOK_URL", "http://localhost:3030/webhook")

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3020", "http://127.0.0.1:3020", "*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



app.mount("/static", StaticFiles(directory="frontend/static"), name="static")


templates = Jinja2Templates(directory="frontend/templates")

@app.get("/")
async def get_index(request: Request):
    
    return templates.TemplateResponse("index.html", {"request": request})


class Activity(BaseModel):
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


def send_webhook(event_type, data):
    try:
        response = requests.post(WEBHOOK_URL, json={"event_type": event_type, "data": data})
        response.raise_for_status()
        print(f"✅ Webhook sent: {event_type}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to send webhook: {e}")


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

        
        webhook_data = {
            "id": activity_id,
            "title": activity.title,
            "description": activity.description,
            "day_of_week": activity.day_of_week,
            "start_time": activity.start_time,
            "end_time": activity.end_time
        }

        
        send_webhook("activity_created", webhook_data)

        return {"message": "Activity created successfully", "id": activity_id}
    except Exception as e:
        conn.rollback()
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        conn.close()


check_db_connection()


if __name__ == "__main__":
    import uvicorn
    PORT = int(os.getenv("PORT", 3020)) 
    uvicorn.run(app, host="0.0.0.0", port=PORT)
