# 📅 Exam Reminder Service - Node.js & MySQL

This project is an **exam reminder system** built with **Node.js and MySQL**, allowing users to **schedule and manage exam reminders**. It includes a **web interface using EJS** to interact with the service.

## 🚀 Features
✅ **Add new exam reminders** with date and time  
✅ **Automatically delete expired reminders**  
✅ **Receive alerts when an exam is 30 minutes away**  
✅ **Web interface to view and manage reminders**  
✅ **Run with Docker and `docker-compose`**  

---

## 🏗️ **Microservices Architecture**
| Service | Port | Description |
|-----------------|--------|-------------|
| **MySQL Database** | `3306` | Stores exam reminder information |
| **Reminder Service** | `8081` | Handles exam reminders (creation, deletion, notifications) |
| **Frontend (EJS)** | `8081` | Web interface to manage reminders |

---

## 🛠️ **Used Technologies**
- **Backend:** Node.js, Express, MySQL2, dotenv
- **Frontend:** EJS, HTML, CSS
- **Database:** MySQL
- **Containers:** Docker and Docker Compose

---

## 🏗️ **Project Structure**
```
exam-reminder-service/ 
│── src/ 
│ ├── config/ # Database configuration 
│ ├── controllers/ # Reminder logic
│ ├── routes/ # API routes 
│ ├── views/ # EJS templates for the UI 
│ ├── docs/ # Documentation
│ ├── index.js # Main application file 
│── Dockerfile # Dockerfile for containerization 
│── .env # Environment variables 
│── package.json # Dependencies 
│── README.md # Project documentation
```

## ⚡ **How to Clone and Set Up the Project**

### 🔹 **Clone from GitHub**
```sh
 git clone https://github.com/Daniielpro/University-School-Management-Project/exam-reminder-service. git
 cd exam-reminder-service
```
### 🔹 Run with Docker

```sh
 docker build -t exam-reminder-service .
docker run -p 8080:8080 --name exam-reminder-container exam-reminder-service

```
### 🔹 Run Locally

```sh
npm install
npm start

```
# 📜 **Author**
Developed by 🚀 **Edwin Proañ and Cristina Colcha**

