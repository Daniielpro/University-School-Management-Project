# 📅 Student Schedule - Personalized Student Agenda

This project is a **student schedule management system** built with **Go (Golang), GraphQL, and MongoDB**. It allows students to **create, edit, delete, and view scheduled events** through a **web interface**.

## 🚀 Features
✅ **Create events** (with title, description, date, and time)  
✅ **Edit events** (modify any event details)  
✅ **Delete events** (remove events from the schedule)  
✅ **View all events** (list of scheduled activities)  
✅ **Web interface for event management**  
✅ **Run with Docker and `docker-compose`**  

---

## 🏗️ **Architecture**
| Service | Port | Description |
|-----------------|--------|-------------|
| **MongoDB** | `27017` | Stores student events |
| **Backend (Go)** | `8080` | Handles GraphQL API for managing events |
| **Frontend (HTML, CSS, JS)** | `8080` | Web interface to interact with the system |

---

## 🛠️ **Used Technologies**
- **Backend:** Go (Golang), GraphQL, Gin
- **Frontend:** HTML, CSS, JavaScript
- **Database:** MongoDB
- **Containers:** Docker and Docker Compose

---

## 🏗️ **Project Structure**

student-schedule/ 
│── backend/ # Go-based backend with GraphQL 
│ ├── graphql/ # GraphQL schema and resolvers
│ ├── database/ # MongoDB connection and queries 
│ ├── controller/ # Handlers for API requests 
│ ├── main.go # Main entry point of the backend 
│ ├── Dockerfile 
│ │── frontend/ # Web interface for event management 
│ ├── public/ 
│ │ ├── index.html # Main UI file 
│ │ ├── script.js # JavaScript logic for frontend 
│ │ ├── styles.css # Styles for UI 
│ ├── Dockerfile 
│ │── docker-compose.yml # Docker file to run all services 
│── README.md # Project documentation

---

## ⚡ **How to Clone and Set Up the Project**

### 🔹 **Clone from GitHub**
```sh
git clone https://github.com/Daniielpro/University-School-Management-Project/Student-Schedule.git
cd student-schedule
```
---
🔹 Run with Docker
```sh
docker-compose up --build
```

### 🔹 Run Locally

Start MongoDB

### 🔹 Run Backend

```sh
go run main.go
```
### 🔹 Open Frontend
### 🔹 Open your browser and go to:

```sh
http://localhost:8080/public/index.html
```

# 📜 **Author**
Developed by 🚀 **Edwin Proañ and Cristina Colcha**