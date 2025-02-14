# 🔗 Link Management - Link Storage System

This project allows **storing, listing, and deleting links or repositories**. It is built with **microservices in Node.js** and **MongoDB**, featuring a **frontend in HTML, CSS, and JavaScript**.

## 🚀 Features
✅ **Save links and repositories**  
✅ **List all stored links**  
✅ **Delete links by ID**  
✅ **Web interface for link management**  
✅ **Run with Docker and `docker-compose`**  

---
## 🏗️ **Arquitectura de Microservicios**
| Servicio         | Puerto | Descripción |
|-----------------|--------|-------------|
| **MongoDB**     | `27017` | Base de datos para almacenar enlaces |
| **Save Link Service**  | `8085`  | Servicio para guardar enlaces |
| **Delete Link Service**  | `8086`  | Servicio para eliminar enlaces |
| **Frontend**        | `8087`  | Interfaz web para gestionar enlaces |

---
## 🛠️ **Used Technologies**
- **Backend:** Node.js, Express, MongoDB
- **Frontend:** HTML, CSS, JavaScript
- **Database:** MongoDB
- **Containers:** Docker and Docker Compose

---
## 🏗️ **Project Structure**
```
link-management/
│── save-link-service/    # Service to save links
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   ├── server.js
│   │   ├── app.js
│   ├── Dockerfile
│
│── delete-link-service/  # Service to delete links
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   ├── server.js
│   │   ├── app.js
│   ├── Dockerfile
│
│── frontend/             # Web interface for link management
│   ├── public/
│   ├── views/
│   ├── server.js
│   ├── Dockerfile
│
│── docker-compose.yml    # Docker file to run all services
│── README.md             # Project documentation
```

---

## ⚡ **How to Clone and Set Up the Project**

### 🔹 **Clone from GitHub**
```sh
git clone https://github.com/Daniielpro/University-School-Management-Project/link-management.git
cd link-management
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
Developed by 🚀 **Edwin Proañ and Cristina Colcha**
