import requests
import os

WEBHOOK_URL = os.getenv("WEBHOOK_URL", "http://localhost:8005/webhook")  # Cambia el puerto si es necesario

def send_webhook(event_type, data):
    payload = {"event_type": event_type, "data": data}
    try:
        response = requests.post(WEBHOOK_URL, json=payload)
        response.raise_for_status()
        print(f"✅ Webhook sent: {event_type}")
    except requests.exceptions.RequestException as e:
        print(f"❌ Failed to send webhook: {e}")
