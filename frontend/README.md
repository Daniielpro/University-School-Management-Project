
# 🎨 TASKIFY Frontend

This is the **TASKIFY frontend**, built with **Vite, React, and Material UI**. It enables the management of boards, lists, and cards, providing a smooth and modern interface.

---

## 🚀 Features
👉 **Intuitive and modern interface based on Material UI**  
👉 **Board, list, and card management**  
👉 **Authentication with JWT**  
👉 **Connection with backend microservices**  
👉 **Deployment with Docker and NGINX**  

---

## 🏰️ **Project Architecture**
| Component  | Description |
|-------------|------------|
| **Frontend** | User interface in React with Vite |
| **Backend (Microservices)** | API in Node.js connected to the database |
| **Database** | PostgreSQL (EC2) and MongoDB (EC2) |
| **Authentication** | JWT with Express and PostgreSQL |
| **Deployment** | Docker, NGINX, and GitHub Actions |

---

## 🛠️ **Technologies Used**
- **Frontend:** React, Vite, Material UI
- **Global State Management:** Context API
- **Backend:** Node.js, Express, PostgreSQL, MongoDB
- **Security:** JWT, CORS, Encryption
- **Containers:** Docker and NGINX
- **CI/CD:** GitHub Actions

---

## 🏰️ **Project Structure**
```
taskify-frontend/
│── public/             # Static files
│── src/
│   ├── components/     # Reusable components
│   ├── pages/          # Main pages
│   ├── context/        # Global state management
│   ├── services/       # API connections
│   ├── hooks/          # Custom hooks
│   ├── App.jsx         # Main component
│   ├── main.jsx        # Entry point
│── Dockerfile          # Docker configuration file
│── nginx.conf          # NGINX configuration
│── package.json        # Project dependencies
│── README.md           # Project documentation
```

---

## ⚡ **How to Clone and Start the Project**

### 🔹 **Clone from GitHub**
```sh
git clone https://github.com/Daniielpro/UNIVERSITY-SCHOOL-MANAGEMENT-PROJECT/taskify-frontend.git
cd taskify-frontend
```

### 🔹 **Run with Docker**
```sh
docker build -t taskify-frontend .
docker run -p 8080:80 taskify-frontend
```

To stop the container:
```sh
docker stop taskify-frontend
```

### 🔹 **Run Locally**
```sh
npm install
npm run dev
```

---

## 📜 **Authors**
Developed by 🚀 **Edwin Poraño & Cristina Coclcha**

