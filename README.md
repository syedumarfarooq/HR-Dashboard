
# 💼 HR Performance Dashboard (Advanced)

A modern HR dashboard for tracking employee performance, managing bookmarks, viewing detailed insights, and visualizing analytics.

---

## 🔧 Tech Stack

- ⚛️ **React (App Router)**
- 💅 **Tailwind CSS**
- 💻 **JavaScript (ES6+)**
- 📦 **State Management:** Context API or Zustand
- 📊 **Charting Library:** Chart.js (for analytics)
- 🌐 **Backend:** Express.js + MongoDB
- 🎯 **Deployment Ready:** Vercel / Render compatible

---

## 🚀 Getting Started

### 📁 Folder Structure

```
root/
├── client/   → Frontend (React)
├── server/   → Backend (Express + MongoDB)
```

### ✅ Prerequisites

- Node.js and npm installed
- MongoDB Atlas connection string (for backend)

---

## ▶️ Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/hr-dashboard.git
cd hr-dashboard
```

### 2️⃣ Setup Backend

```bash
cd server
npm install
```

Create a `.env` file in `server/` with:

```
MONGO_URI=your_mongo_connection_string
PORT=5050
```

Start the backend:

```bash
npm run dev
```

### 3️⃣ Setup Frontend

```bash
cd ../client
npm install
```

Create a `.env` file in `client/` with:

```
REACT_APP_API_URL=http://localhost:5050
```

Start the frontend:

```bash
npm start
```

---

## 🎯 Features

### 1. 🏠 Dashboard Homepage (`/`)

- Fetches users from [DummyJSON](https://dummyjson.com/users?limit=20)
- Shows cards with:
  - Name, Email, Age, Department (randomly assigned)
  - Star-based performance rating
  - Buttons: `View`, `Bookmark`, `Promote`

### 2. 🔍 Search & Filter

- Search bar to filter by name, email, department
- Filter dropdowns:
  - By Department
  - By Performance Rating (⭐)

### 3. 👤 Employee Details Page (`/employee/:id`)

- Displays detailed profile with:
  - Address, Phone, Bio, Past Performance History
- Tabs: `Overview`, `Projects`, `Feedback`
- Rating shown as stars and color-coded badges

### 4. 📌 Bookmarks (`/bookmarks`)

- Lists all bookmarked employees
- Buttons:
  - Remove from bookmarks
  - Trigger "Promote" or "Assign to Project"

### 5. 📊 Analytics (`/analytics`)

- Charts using Chart.js:
  - Department-wise average performance
  - Bookmark trends over months (mocked)
- Optional: Server-side rendering or static generation compatible

---

## 🧪 Test Data APIs

- 🔗 `https://dummyjson.com/users?limit=20` - Dummy employee list

---


---

## 🙌 Contributing

Feel free to fork this repo, submit issues, or open pull requests for improvements!

---

## 📄 License

This project is licensed under the MIT License.
