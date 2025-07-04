# 📅 Weekly Planner - Task Management System

This project allows **creating, listing, and managing weekly tasks** using **microservices in Python** and **PostgreSQL**, featuring a **frontend in HTML, CSS, and JavaScript**.

## 🚀 Features
✅ **Create weekly tasks**  
✅ **List all scheduled tasks**  
✅ **Delete tasks by ID**  
✅ **Web interface for task management**  
✅ **Run with Docker and `docker-compose`**  

---
## 🏗️ **Microservices Architecture**
| Service         | Port  | Description |
|----------------|-------|-------------|
| **PostgreSQL** | `5432` | Database for storing tasks |
| **Task Create Service** | `8001` | Service to create tasks |
| **Task List Service** | `8002` | Service to list tasks |
| **Task Delete Service** | `8003` | Service to delete tasks |

---
## 🛠️ **Used Technologies**
- **Backend:** Python, FastAPI, PostgreSQL
- **Frontend:** HTML, CSS, JavaScript
- **Database:** PostgreSQL
- **Containers:** Docker and Docker Compose

---
## 🏗️ **Project Structure**
```
weekly-planner/
│── services/
│   ├── create_service/  # Service to create tasks
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── database.py
│   │   │   ├── webhook_handler.py
│   │   │   ├── Dockerfile
│   │   │   ├── requirements.txt
│
│   ├── list_service/    # Service to list tasks
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── database.py
│   │   │   ├── Dockerfile
│   │   │   ├── requirements.txt
│
│   ├── delete_service/  # Service to delete tasks
│   │   ├── app/
│   │   │   ├── main.py
│   │   │   ├── database.py
│   │   │   ├── Dockerfile
│   │   │   ├── requirements.txt
│
│── Webhooks   
│── docker-compose.yml   # Docker file to run all services
│── README.md            # Project documentation
```

---

## ⚡ **How to Clone and Set Up the Project**

### 🔹 **Clone from GitHub**
```sh
git clone  https://github.com/Daniielpro/University-School-Management-Project/weekly-planer.git
cd weekly-planner
```

### 🔹 **Run with Docker**
```sh
docker-compose up -d
```

To stop the containers:
```sh
docker-compose down
```

### 🔹 **Run Locally**
```sh
pip install -r services/create_service/app/requirements.txt
python services/create_service/app/main.py
```

---

## 📜 **Author**
Developed by 🚀 **Edwin Proaño & Cristina Coclcha**

