from database import get_db_connection

def get_all_activities():
    """Obtiene todas las actividades de la base de datos"""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id, title, description, day_of_week, start_time, end_time FROM activities")
        activities = cursor.fetchall()
        return [
            {"id": row[0], "title": row[1], "description": row[2], "day_of_week": row[3], "start_time": str(row[4]), "end_time": str(row[5])}
            for row in activities
        ]
    except Exception as e:
        raise Exception(str(e))
    finally:
        cursor.close()
        conn.close()

def get_activity(activity_id: int):
    """Obtiene una actividad específica"""
    conn = get_db_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT id, title, description, day_of_week, start_time, end_time FROM activities WHERE id = %s", (activity_id,))
        activity = cursor.fetchone()
        if activity is None:
            raise Exception("Actividad no encontrada")
        return {
            "id": activity[0],
            "title": activity[1],
            "description": activity[2],
            "day_of_week": activity[3],
            "start_time": str(activity[4]),
            "end_time": str(activity[5]),
        }
    except Exception as e:
        raise Exception(str(e))
    finally:
        cursor.close()
        conn.close()
