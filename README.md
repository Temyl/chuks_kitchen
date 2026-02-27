# 🍽 Chuks Kitchen API

## 📖 Project Description

This is a backend REST API built with **Node.js, Express, TypeScript, and MongoDB** for a simple food ordering system.

The system allows users to:

- Sign up using email or phone
- Receive and verify OTP
- Authenticate using JWT
- Create orders
- View their orders

The project follows a clean layered architecture:

Route → Service → Repository → Database

This structure ensures proper separation of concerns and makes the application easy to maintain and extend.

# 🛠 Running This Project Locally

## 📌 Prerequisites

Ensure you have the following installed:

- Node.js (v18 or higher recommended)
- npm
- MongoDB (Local installation)
- Git

To confirm Node.js installation:

```bash
node -v
npm -v
````

---

## 📥 1. Clone the Repository

```bash
git clone <your-repository-url>
cd <project-folder>
```

---

## 📦 2. Install Dependencies

```bash
npm install
```

---

## ⚙️ 3. Create Environment Variables

Create a `.env` file in the root directory and add the following:

```env
PORT=5000
MONGO_URI=mongodb://127.0.0.1:27017/food-ordering


> Make sure MongoDB is running locally before starting the server.

---

## 🗄 4. Start MongoDB

If MongoDB is installed locally, start it using:

```bash
mongod
```

Or start it from your system service manager.

---

## 🚀 5. Run the Application (Development Mode)

```bash
npm run dev
```

If successful, you should see:

```
MongoDB connected
Server running on port 5000
```

---

## 🏗 6. Build and Run Compiled Version (Optional)

To compile TypeScript:

```bash
npm run build
```

Then start the compiled version:

```bash
npm start
```

---

## 🌐 Server URL

Once running, the API will be available at:

```
http://localhost:5000
```

---

## 🧪 Testing the API

You can test the endpoints using:

* Postman
* Thunder Client (VS Code Extension)

Example endpoint:

```
POST http://localhost:3000/api/users/signup
```

---

## 🛑 Stop the Server

Press:

```bash
CTRL + C
```