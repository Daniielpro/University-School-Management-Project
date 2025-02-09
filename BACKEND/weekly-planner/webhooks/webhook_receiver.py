import os
import json
from fastapi import FastAPI, HTTPException, WebSocket
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware


PORT = int(os.getenv("PORT", 3030))  

app = FastAPI()


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class WebhookEvent(BaseModel):
    event_type: str
    data: dict


@app.post("/webhook")
async def receive_webhook(event: WebhookEvent):
    try:
        print(f"📩 Webhook recibido: {event.event_type}")
        print(json.dumps(event.data, indent=4))

        if event.event_type == "activity_created":
            print("✅ Nueva actividad creada:", event.data)
        elif event.event_type == "activity_updated":
            print("🔄 Actividad actualizada:", event.data)
        elif event.event_type == "activity_deleted":
            print("❌ Actividad eliminada:", event.data)

        return {"message": "Webhook procesado con éxito"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(f"Mensaje recibido: {data}")
    except Exception as e:
        print(f"Error en WebSocket: {e}")
        await websocket.close()


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=PORT)
