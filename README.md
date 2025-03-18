### 📄 **README.md - Property Listing Platform**

---

# 🏠 **Property Listing Platform - Nest.js + Docker**

This is a **CRUD-based web application** built using **Nest.js** and **Docker**. It allows users to **register**, authenticate, and manage multiple properties. The application supports **full CRUD operations** (Create, Read, Update, Delete) while ensuring that users are **authenticated and authorized** before performing any actions.

---

## ✅ **Features**

- 🔐 **User Authentication & Authorization**
  - User registration and login with **JWT-based authentication**.
  - Protected routes to ensure only authenticated users can access and modify their data.
- 🏠 **Property Management**
  - Create, Read, Update, and Delete properties.
  - Each user can add multiple properties.
- 📚 **CRUD Operations**
  - Users can **add, edit, delete, and view** their properties.
- 🐳 **Docker Integration**
  - Dockerized for easy setup and deployment.
- 📄 **API Documentation**
  - Integrated with **Swagger** for easy API exploration.

---

## ⚙️ **Tech Stack**

- **Backend:** [Nest.js](https://nestjs.com) (Node.js framework)
- **Database:** PostgreSQL (using TypeORM)
- **Authentication:** JWT (JSON Web Tokens)
- **Containerization:** Docker
- **Documentation:** Swagger
- **Environment Variables:** dotenv

---

## 🚀 **Getting Started**

### 🔥 **Clone the Repository**

```bash
git clone https://github.com/amanpreetcs/Learning-nestjs
cd Learning-nestjs
```

---

### 🛠️ **Prerequisites**

Make sure you have the following installed:

- **Node.js** (v20+)
- **Docker** and **Docker Compose**
- **PostgreSQL**

---

### ⚙️ **Environment Variables**

Create a `.env` file in the root directory and add the following environment variables:

```env
# Database configuration
DB_URL = "postgresql://neondb_owner:npg_pQ75jgSOUvHd@ep-super-king-a5hz6ned-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require"

# JWT Secret Keys
JWT_SECRET="sldjflsdjflsjdfljslj32oruofsdjjsfljlslflsf"
JWT_REFRESH_SECRET="sldjfl32432423532532532523523sdjflsjdfljslj32oruofsdjjsfljlslflsf"
```

---

### 🐳 **Run with Docker**

To run the app in a Docker container:

```bash
docker-compose up --build
```

✅ The server will be running at:`http://localhost:3003`

---

### 🛠️ **Run Locally**

To run the project locally (without Docker):

1. **Install dependencies:**

```bash
npm install
```

2. **Run the development server:**

```bash
npm run start:dev
```

---

## 🔥 **Swagger API Documentation**

The project includes **Swagger UI** for easy testing and exploration of the API.

- Visit: `http://localhost:3003/api`

---

## 📜 **License**

This project is licensed under the **MIT License**.

---

## 🛠️ **Author**

👤 **Amanpreet Singh**📧 Email: [amanpreet@crownstack.com](mailto:amanpreet@crownstack.com)🔗 GitHub: [amanpreetcs](https://github.com/amanpreetcs)

---

## 🌟 **Show your support**

If you find this project helpful, consider **starring ⭐** the repository!

---
