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
| **academic-events** | `8097` | academic event management microservice |
| **Scheduler Service** | `8080` | Academic scheduling service |
| **Exam Reminder Service** | `8081` | Exam reminder service |
| **File Management Service** | `8091` | File upload and management service |
| **Link Service** | `8087` | microservice to help in link management with search information |
| **weekly-planner** | `3020` | weekly activity planning microservice |
| **maestro-service** | `8083` |master management microservice for organization help |
| **Calculate** | `3010` | Additional calculator microservice with basic functionalities |
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

### 🔹 **Run Locally**
  1.- run each mciroservice individually to check that each one is working correctly

  2.- run the authentication microservice to be able to lift user authentication and communicate with the front

  3.- run the frontend to be able to enter the dashboard and interact with all the microservices

---
## 📜 **Authors**
Developed by 🚀 **Edwin Proaño and Cristina Colcha**




