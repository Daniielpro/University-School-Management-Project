from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import json

app = FastAPI()

# Modelo de datos esperado para los Webhooks
class WebhookEvent(BaseModel):
    event_type: str
    data: dict

# Endpoint para recibir Webhooks
@app.post("/webhook")
async def receive_webhook(event: WebhookEvent):
    try:
        print(f"📩 Webhook received: {event.event_type}")
        print(json.dumps(event.data, indent=4))
        
        # Aquí puedes agregar lógica específica para cada evento
        if event.event_type == "activity_created":
            print("✅ Nueva actividad creada:", event.data)
        elif event.event_type == "activity_updated":
            print("🔄 Actividad actualizada:", event.data)
        elif event.event_type == "activity_deleted":
            print("❌ Actividad eliminada:", event.data)
        
        return {"message": "Webhook processed successfully"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

