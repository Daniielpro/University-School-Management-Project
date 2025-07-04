# 📅 Academic Events - Microservices System

A microservices-based system for managing academic events such as **conferences, presentations, and important dates**. The system allows **creating, listing, updating, and deleting events** through RESTful APIs.

## 📌 Features
✅ Create, read, update, and delete (CRUD) academic events.  
✅ Built using **Node.js, Express, and MongoDB**.  
✅ Microservices architecture with **Docker and Docker Compose**.  
✅ Simple frontend built with **HTML, CSS, and JavaScript**.  
✅ Swagger documentation for API endpoints.  

---

## 📂 Project Structure
```
academic-events/
│── create-event-service/   # Microservice for creating events (port 8093)
│── delete-event-service/   # Microservice for deleting events (port 8094)
│── list-event-service/     # Microservice for listing events (port 8095)
│── update-event-service/   # Microservice for updating events (port 8096)
│── frontend/               # Frontend (port 8097)
│── docker-compose.yml      # Docker configuration
│── README.md               # Project documentation
```

---

## 📜 Microservices and Ports
| Microservice            | Description                         | Port  |
|-------------------------|-------------------------------------|-------|
| Create Event Service    | Handles event creation             | 8093  |
| Delete Event Service    | Manages event deletion             | 8094  |
| List Event Service      | Fetches all events                 | 8095  |
| Update Event Service    | Updates event details              | 8096  |
| Frontend                | Provides the web interface         | 8097  |

---

## 🛠️ Technologies Used
- **Node.js** + **Express.js**
- **MongoDB** (Database)
- **Docker & Docker Compose**
- **Swagger UI** (API Documentation)
- **HTML, CSS, JavaScript** (Frontend)

---

## 🚀 Installation and Setup

### 1️⃣ **Clone the Repository**
```sh
git clone https://github.com/Daniielpro/University-School-Management-Project/academic-events.git
cd academic-events
```

### 2️⃣ **Run the Project with Docker**
```sh
docker-compose up -d
```
💡 **This will start MongoDB, all microservices, and the frontend automatically.**  
💡 The first build may take a few minutes.  

### 3️⃣ **Verify that the services are running**
```sh
docker ps
```

### 4️⃣ **Access the Application**
- **Frontend:** [http://localhost:8097](http://localhost:8097)  
- **Create Event API:** `http://localhost:8093/api/events`  
- **List Events API:** `http://localhost:8095/api/events`  
- **Update Event API:** `http://localhost:8096/api/events/:id`  
- **Delete Event API:** `http://localhost:8094/api/events/:id`  

---


## 📦 Running Without Docker
If you prefer to run the services manually:

### 1️⃣ **Start MongoDB**
```sh
mongod --dbpath ~/data/db
```
or with Docker:
```sh
docker run -d --name mongodb -p 27017:27017 mongo
```

### 2️⃣ **Run each microservice manually**
```sh
cd create-event-service && npm install && npm start
cd delete-event-service && npm install && npm start
cd list-event-service && npm install && npm start
cd update-event-service && npm install && npm start
cd frontend && npm install && npm start
```

## 🛠️ Development & Contribution
Feel free to contribute to this project! To set up a local development environment:
```sh
git clone https://github.com/Daniielpro/University-School-Management-Project/academic-events.git
cd academic-events
```
Then, run the services manually or use Docker.

---

## 📝 License
This project is licensed under the **MIT License**.

---

## 🎯 Author
👨‍💻 Developed by **Edwin Proaño & Cristina Colcha**  

