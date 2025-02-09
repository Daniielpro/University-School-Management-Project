
# 🔐 User Authentication Microservice

This project enables **user registration, authentication, and management** using **microservices in Node.js** and **PostgreSQL**, with security based on **JWT**.

## 🚀 Features
✅ **User registration and authentication**  
✅ **Authentication middleware with JWT**  
✅ **Encrypted user credentials**  
✅ **Implementation with Docker and `docker-compose`**  
✅ **Integration with GitHub Actions for CI/CD**  

---
## 🏗️ **Microservices Architecture**
| Service          | Port  | Description |
|-----------------|-------|-------------|
| **PostgreSQL**  | `5432` | Database for storing users |
| **Auth Service** | `3000` | User authentication service |

---
## 🛠️ **Used Technologies**
- **Backend:** Node.js, Express, PostgreSQL
- **Security:** JWT, Bcrypt, CORS
- **Database:** PostgreSQL
- **Containers:** Docker and Docker Compose
- **CI/CD:** GitHub Actions

---
## 🏗️ **Project Structure**
```
user-auth-microservices/
│── auth-service/    # Authentication service
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├──config/
├── Dockerfile
│── docker-compose.yml    # Docker file to run all services
│── README.md             # Project documentation
├── server.js
├── app.js
├── .env
├── swagger
```

---

## ⚡ **How to Clone and Set Up the Project**

### 🔹 **Clone from GitHub**
```sh
git clone https://github.com/Daniielpro/University-School-Management-Project/user-auth-microservices.git
cd user-auth-microservices
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

## 📜 **Author**
Developed by 🚀 **Edwin Poraño & Cristina Colcha**

