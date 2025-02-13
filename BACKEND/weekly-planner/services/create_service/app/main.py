import os
from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.templating import Jinja2Templates
from routes import router  
from database import check_db_connection

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3020", "http://127.0.0.1:3020", "*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)
app.mount("/static", StaticFiles(directory="frontend/static"), name="static")


templates = Jinja2Templates(directory="frontend/templates")

@app.get("/")
async def get_index(request: Request):
    
    return templates.TemplateResponse("index.html", {"request": request})


if __name__ == "__main__":
    import uvicorn
    PORT = int(os.getenv("PORT", 3020))
    check_db_connection()
    uvicorn.run(app, host="0.0.0.0", port=PORT)
