# 📝 MERN User Feedback System

A full-stack feedback collection and management system built with **MongoDB**, **Express.js**, **React**, and **Node.js** — styled using **Tailwind CSS**. This project enables users to submit feedback easily, while allowing admins to efficiently manage, categorize, analyze, and track it via a secure dashboard with visual charts.

---

## 🚀 Features

### 🧑 Public (Unauthenticated Users)
- **Submit Feedback**: A simple, user-friendly form to submit feedback.
- **Feedback Categories**: Users can categorize feedback into:
  - General
  - Bug Report
  - Suggestion
  - Feature Request

### 🔐 Admin (Authenticated Users)
- **Admin Login**: Secure JWT-based authentication system. (**Username**: **admin**  &&  **Password**:**admin@123**)
- **Admin Dashboard**: Protected area to manage feedback, including:
  - View all feedback entries
  - View individual feedback details
  - Update feedback categories or status
  - Soft delete feedback entries
  - View feedback analytics (via charts)

---

## 📁 Folder Structure

```plaintext
user_feedback_app/
├── frontend/                           # React frontend (Vite + Tailwind CSS)
│   ├── public/
│   │   └── feedback.svg               # Custom favicon
│   ├── src/
│   │   ├── api/
│   │   │   └── api.js                 # Centralized Axios configuration
│   │   ├── assets/
│   │   │   └── react.svg              # React logo asset
│   │   ├── Pages/
│   │   │   ├── AdminDashboard.jsx     # Admin dashboard main component
│   │   │   ├── FeedbackForm.jsx       # Public feedback submission form
│   │   │   ├── LoginForm.jsx          # Admin login form
│   │   │   ├── FeedbackStatsChart.jsx # Chart component for feedback stats
│   │   │   └── AdminDashboardComponents/
│   │   │       ├── DashBoardHeader.jsx    # Dashboard header with logout
│   │   │       ├── StatsCards.jsx         # Statistics cards component
│   │   │       ├── FeedbackList.jsx       # List of all feedback
│   │   │       ├── FeedbackCard.jsx       # Individual feedback card
│   │   │       └── FeedbackModal.jsx      # Modal for viewing feedback details
│   │   ├── App.jsx                    # Main app component with routing
│   │   ├── App.css                    # App-specific styles
│   │   ├── main.jsx                   # React app entry point
│   │   └── index.css                  # Global styles with Tailwind imports
│   ├── .gitignore                     # Frontend git ignore rules
│   ├── eslint.config.js               # ESLint configuration
│   ├── index.html                     # HTML template
│   ├── package.json                   # Frontend dependencies & scripts
│   ├── README.md                      # Frontend documentation
│   └── vite.config.js                 # Vite build configuration
│
├── backend/                           # Node.js + Express backend
│   ├── config/
│   │   └── db.js                      # MongoDB connection configuration
│   ├── controllers/
│   │   ├── authController.js          # User authentication logic
│   │   └── feedbackController.js      # Feedback CRUD operations
│   ├── middleware/
│   │   └── authMiddleware.js          # JWT authentication & admin authorization
│   ├── models/
│   │   ├── User.js                    # User schema (admin/user roles)
│   │   └── Feedback.js                # Feedback schema with validation
│   ├── routes/
│   │   ├── authRoutes.js              # Authentication routes (/auth/*)
│   │   └── feedbackRoutes.js          # Feedback management routes (/feedback/*)
│   ├── .env                           # Environment variables (MongoDB URI, JWT secret)
│   ├── .gitignore                     # Backend git ignore rules
│   ├── index.js                       # Express server entry point
│   └── package.json                   # Backend dependencies & scripts
│

```

---

## 🛠️ Tech Stack

| Layer       | Technology                     |
|-------------|--------------------------------|
| Frontend    | React, Tailwind CSS, Vite      |
| Backend     | Node.js, Express.js            |
| Database    | MongoDB (via Mongoose)         |
| Auth        | JWT (Token-based Authentication) |
| Charts      | Recharts (Bar chart for stats) |

---

## 🔧 How to Run the Project Locally

### 1. Clone the Repository

```bash
git clone https://github.com/meehirlokhande/User_Feedback_System.git
cd User_Feedback_System
```

### 2. Start the Backend Server

```bash
cd backend
npm install
npm run dev
```

> Make sure MongoDB is running locally or configure your MongoDB Atlas URI in the `.env` file.

### 3. Start the Frontend React App

```bash
cd ../frontend
npm install
npm run dev
```

### 4. Open in Browser

Visit: [http://localhost:5173](http://localhost:5173)

### 🔐 Admin Credentials
You can register an admin via the backend or manually insert one into the database with the role: `"admin"`.  
Login at: [http://localhost:5173/login](http://localhost:5173/login)


---

## 🧭 Application Flow

### 🧑 Public User
1. Loads the root (`/`) → Sees the feedback form.
2. Fills out and submits the form → Sends a POST request to `/feedback`.
3. Data is stored in MongoDB for future access and management.

### 🔐 Admin User
1. Navigates to `/login` → Enters admin credentials (Username: admin  &  Password: admin@123).
2. On successful login → Redirected to `/admin` (Admin Dashboard).
3. Dashboard includes:
   - View all feedback (GET `/feedback`)
   - View individual feedback (GET `/feedback/:id`)
   - Update feedback details (PUT `/feedback/:id`)
   - Soft delete feedback (DELETE `/feedback/:id`)
   - View charts (GET `/feedback/stats`)
4. Logging out clears the session token.

---

## 🧱 API Endpoints

### Public

| Method | Endpoint        | Description          |
|--------|-----------------|----------------------|
| POST   | `/feedback`     | Submit new feedback  |

### Admin (Protected with JWT)

| Method | Endpoint        | Purpose              |
|--------|-----------------|----------------------|
| POST   | `/auth/login`   | Admin login          |
| GET    | `/feedback`     | Fetch all feedback   |
| GET    | `/feedback/:id` | View single feedback |
| PUT    | `/feedback/:id` | Update category/status |
| GET    | `/feedback/stats` | Get feedback statistics (charts) |

---

## 📊 Visualizations

Admin Dashboard includes:
- 📊 **Bar chart** displaying feedback count categorized by type (General, Bug Report, Suggestion, Feature Request).
- Potential future enhancements for more visualizations like pie charts and time-trend graphs.

---



## 📬 Contact

For questions, feedback, or suggestions, feel free to contact [meehirlokhande@email.com] or open an issue here on GitHub.

---

Happy coding! 🚀
