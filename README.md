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
| **User Service** | `3001` | User authentication service |
| **Task Service** | `3002` | Task management service |
| **Scheduler Service** | `3003` | Academic scheduling service |
| **Exam Reminder Service** | `3004` | Exam reminder service |
| **File Management Service** | `3005` | File upload and management service |
| **Student Schedule Service** | `3006` | Student and teacher scheduling service |
| **Evaluation Service** | `3007` | Academic performance evaluation service |
| **Frontend** | `8080` | Web interface |

---
## 🛠️ **Technologies Used**
- **Backend:** Node.js, Express.js, Java (Spring Boot)
- **Frontend:** HTML, CSS, JavaScript, React.js
- **Databases:** PostgreSQL, MongoDB
- **Containers:** Docker and Docker Compose
- **Messaging and Events:** Amazon SQS, SNS
- **Authentication and Security:** JWT, bcrypt
- **Orchestration and Deployment:** AWS EC2, GitHub Actions
- **External Integrations:** REST API for third-party systems

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
## 🌍 **Deployment on AWS**
This project is designed to run on AWS EC2 using Docker. To deploy:
1. **Build the image and push it to Docker Hub:**
   ```sh
   docker build -t user/microservice .
   docker push user/microservice
   ```
2. **Connect to the EC2 instance:**
   ```sh
   ssh ec2-user@your-ec2-ip
   ```
3. **Run the containers on EC2:**
   ```sh
   docker run -d -p 3000:3000 user/microservice
   ```
4. **Automate updates with GitHub Actions.**

---
## 📜 **Authors**
Developed by 🚀 **Edwin Proañ and Cristina Colcha**

---
## 📝 **Contributing**
Contributions are welcome. To contribute:
1. Fork the repository.
2. Create a new branch.
3. Make changes and submit a Pull Request.


