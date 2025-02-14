import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routes import router  
from database import check_db_connection

app = FastAPI(
    title="Gestión de Actividades API",
    description="API para gestionar actividades",
    version="1.0.0",
    docs_url="/docs",
    openapi_url="/openapi.json"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)

@app.get("/")
async def root():
    return {"message": "Bienvenido a la API de Gestión de Actividades"}

if __name__ == "__main__":
    import uvicorn
    PORT = int(os.getenv("PORT", 3022))
    check_db_connection()
    uvicorn.run(app, host="0.0.0.0", port=PORT)
