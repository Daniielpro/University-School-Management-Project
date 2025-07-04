# 📂 Tareas Service - Task Management Microservice

This project is a **task management microservice** built with **Node.js, Express, and MongoDB**. It allows users to **create, update, delete, and list tasks**, associating them with teachers stored in a separate database.

## 🚀 Features
✅ **Create tasks** with a due date and assigned teacher  
✅ **Update tasks** dynamically  
✅ **Delete tasks** from the database  
✅ **List all tasks**  
✅ **Connects to MongoDB to store task data**  
✅ **Docker support for containerized deployment**  

---

## 🏗️ **Architecture**
| Service | Port | Description |
|-----------------|--------|-------------|
| **MongoDB** | `27017` | Database for storing task information |
| **Tareas Service** | `8084` | Manages tasks (CRUD operations) |

---

## 🛠️ **Technologies Used**
- **Backend:** Node.js, Express, MongoDB
- **Database:** MongoDB
- **Containers:** Docker

---

## 🏗️ **Project Structure**
```
tasks-service/ 
│── models/ # Mongoose models for MongoDB 
│── controllers/ # Business logic for tasks 
│── routes/ # API endpoints 
│── repositories/ # Database interaction logic 
│── public/ # Frontend interface (HTML, CSS, JS) 
   │── index.js # Main application file 
│── Dockerfile # Docker configuration 
│── package.json # Dependencies 
│── README.md # Project documentation
```

## ⚡ **How to Clone and Set Up the Project**

### 🔹 **Clone from GitHub**
```sh
git clone https://github.com/Daniielpro/University-School-Management-Project/tareas-service.git
cd tareas-service
```
🔹 Run with Docker

```sh
docker build -t tareas-service .
docker run -d -p 8084:8084 --name tareas-service tareas-service
```
🔹 Run Locally

```sh
npm install
npm start
```

# 📜 **Author**
Developed by 🚀 **Edwin Proañ and Cristina Colcha**