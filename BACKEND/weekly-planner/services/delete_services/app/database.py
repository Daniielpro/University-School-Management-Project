import os
import psycopg2
from dotenv import load_dotenv

load_dotenv()  # Cargar variables desde .env

DB_USER = os.getenv('DB_USER')
DB_PASSWORD = os.getenv('DB_PASSWORD')
DB_HOST = os.getenv('DB_HOST')
DB_PORT = os.getenv('DB_PORT')
DB_NAME = os.getenv('DB_NAME')
 
def get_db_connection():
    """Crea y retorna una conexión a la base de datos"""
    return psycopg2.connect(
        host=DB_HOST,
        database=DB_NAME,
        user=DB_USER,
        password=DB_PASSWORD,
        port=DB_PORT
    )

def check_db_connection():
    """Verifica la conexión a la base de datos"""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT 1;")  
        cursor.close()
        conn.close()
        print("✅ Conexión exitosa a la base de datos!")
    except Exception as e:
        print(f"❌ Error de conexión: {e}")
        raise Exception("No se pudo conectar a la base de datos")
