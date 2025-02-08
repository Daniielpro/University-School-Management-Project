📂 Maestro Service - Teacher Management Microservice

This project is a **teacher management microservice** built with **Spring Boot and MongoDB**. It allows users to **register and update teachers**, storing their information in a separate database.

## 🚀 Features
✅ **Register teachers** with their subject  
✅ **Update teacher information** dynamically  
✅ **List all teachers**  
✅ **Connects to MongoDB to store teacher data**  
✅ **Uses Swagger for API documentation**  
✅ **Docker support for containerized deployment**  

---

## 🏗️ **Architecture**
| Service | Port | Description |
|-----------------|--------|-------------|
| **MongoDB** | `27017` | Database for storing teacher information |
| **Maestro Service** | `8083` | Manages teacher records (CRUD operations) |

---

## 🛠️ **Technologies Used**
- **Backend:** Java, Spring Boot, MongoDB
- **Database:** MongoDB
- **Documentation:** Swagger
- **Containers:** Docker

## 🏗️ **Project Structure**

maestro-service/ 
│── src/ │ 
 ├── main/ 
 │ │ ├── java/com/example/maestroservice/ 
 │ │ │ ├── MaestroServiceApplication.java # Main application entry 
 │ │ │ ├── controller/ # API controllers 
 │ │ │ ├── model/ # Data models (MongoDB) 
 │ │ │ ├── repository/ # Database interaction 
 │ │ │ ├── service/ # Business logic 
 │ │ ├── resources/ 
 │ │ │ ├── application.properties # Configuration file 
│── target/ # Compiled JAR file 
│── Dockerfile # Docker configuration 
│── pom.xml # Maven dependencies 
│── README.md # Project documentation

---

## ⚡ **How to Clone and Set Up the Project**

### 🔹 **Clone from GitHub**
```sh
  git clone https://github.com/your-repo/maestro-service.git
  cd maestro-service
```

### 🔹 Build and Run with Docker
```sh
mvn clean package
docker build -t maestro-service .
docker run -d -p 8083:8083 --name maestro-service maestro-service
```

### 🔹 Run Locally
```sh
mvn clean package
java -jar target/maestro-service-*.jar
```

# 📜 **Author**
Developed by 🚀 **Edwin Proañ and Cristina Colcha**

