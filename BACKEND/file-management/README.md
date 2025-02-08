# 📂 File Management - File Storage System

This project is a **file management system** built with **microservices in Node.js** and **MongoDB**, allowing users to **upload, delete, and search files** (PDF, Word, Excel). It includes a **frontend in HTML, CSS, and JavaScript** for user interaction.

## 🚀 Features
✅ **Upload files** (PDF, Word, Excel)  
✅ **Delete files** (from MongoDB and filesystem)  
✅ **Search files** in the database  
✅ **Web interface for file management**  
✅ **Run with Docker and `docker-compose`**  

---

## 🏗️ **Project Structure**
```
file-management/
│── upload-service/       # Service to upload files
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   ├── uploads/      # Folder where files are stored
│   │   ├── server.js
│   │   ├── app.js
│   ├── Dockerfile
│
│── delete-service/       # Service to delete files
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   ├── server.js
│   │   ├── app.js
│   ├── Dockerfile
│
│── search-service/       # Service to search files
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── config/
│   │   ├── server.js
│   │   ├── app.js
│   ├── Dockerfile
│
│── frontend/             # Web interface for file management
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
git clone https://github.com/Daniielpro/University-School-Management-Project/file-management.git
cd file-management
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
Developed by 🚀 **Edwin Proaño and Cristina Colcha**
