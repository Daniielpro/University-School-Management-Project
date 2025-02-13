# 📚 University School Management Project

This project is a **school and university management system** based on microservices. It enables task management, academic scheduling, user administration, and other essential services.

---
## 🚀 **Features**
✅ **User management and authentication**  
✅ **Task management and academic scheduling**  
✅ **Exam management and reminders**  
✅ **File upload and management**  
✅ **Student and teacher scheduling management**  
✅ **Task assignment and performance evaluation**  
✅ **Web interface for system administration**  
✅ **Deployable with Docker and `docker-compose`**  
✅ **Scalability through microservices architecture**  
✅ **Security with JWT and encryption**  
✅ **Support for integration with external systems**  

---
## 🏗️ **Microservices Architecture**
| Service | Port | Description |
|----------|--------|-------------|
| **PostgreSQL** | `5432` | Main database |
| **MongoDB** | `27017` | Secondary database |
| **User Service** | `3000` | User authentication service |
| **Task Service** | `8084` | Task management service |
| **academic-events** | `8097` |  |
| **Scheduler Service** | `8080` | Academic scheduling service |
| **Exam Reminder Service** | `8081` | Exam reminder service |
| **File Management Service** | `8091` | File upload and management service |
| **Link Service** | `8087` |  |
| **weekly-planner** | `3020` |  |
| **maestro-service** | `8083` | |
| **Calculate** | `3010` |  |
| **Frontend** | `5175` | Web interface |

---
## 🛠️ **Technologies Used**
- **Backend:** Node.js, Express.js, Java (Spring Boot), Phyton, Javascript, GO.
- **Frontend:** HTML, CSS, JavaScript.
- **Databases:** PostgreSQL, MongoDB, MYSQL
- **Containers:** Docker and Docker Compose
- **Authentication and Security:** JWT
- **Orchestration and Deployment:** AWS EC2, GitHub Actions

---
## 📂 **Project Structure**
```
University-School-Management-Project/
├── BACKEND/
│   ├── user-auth-microservices/
│   ├── tareas-service/
│   ├── exam-reminder-service/
│   ├── file-management/
│   ├── student-schedule/
│   ├── maestro-service/
│   ├── task-scheduler/
│   ├── weekly-planner/
│   ├── evaluation-service/
├── FRONTEND/
│   ├── dashboard/
│   ├── public/
│── docker-compose.yml
│── README.md
```

---
## ⚡ **How to Clone and Set Up the Project**

### 🔹 **Clone from GitHub**
```sh
git clone https://github.com/Daniielpro/University-School-Management-Project.git
cd University-School-Management-Project
```

### 🔹 **Run with Docker**
```sh
docker-compose up --build
```
To stop the containers:
```sh
docker-compose down
```

### 🔹 **Run Locally**
```sh
npm install
npm start
```

---
## 📜 **Authors**
Developed by 🚀 **Edwin Proaño and Cristina Colcha**




