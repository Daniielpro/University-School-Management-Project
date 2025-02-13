import requests
import os


WEBHOOK_URL = os.getenv("WEBHOOK_URL", "http://localhost:3030/webhook")  

def send_webhook(event_type, data):
    payload = {"event_type": event_type, "data": data}
    try:
        response = requests.post(WEBHOOK_URL, json=payload) 
        response.raise_for_status()
        print(f"✅ Webhook enviado: {event_type}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Error enviando webhook: {e}")


if __name__ == "__main__":
    test_data = {
        "id": 123,
        "title": "Tarea de prueba",
        "description": "Esto es un ejemplo de webhook",
        "day_of_week": "Monday",
        "start_time": "08:00",
        "end_time": "10:00"
    }
    send_webhook("activity_created", test_data)
