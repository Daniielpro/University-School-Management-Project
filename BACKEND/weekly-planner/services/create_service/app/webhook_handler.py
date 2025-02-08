import requests
import os

WEBHOOK_URL = os.getenv("WEBHOOK_URL", "http://localhost:8002/webhook")

def send_webhook(data):
    try:
        response = requests.post(WEBHOOK_URL, json=data)
        response.raise_for_status()
        print("Webhook sent successfully")
    except requests.exceptions.RequestException as e:
        print(f"Failed to send webhook: {e}")
