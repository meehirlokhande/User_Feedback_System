import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import FeedbackForm from "./Pages/FeedbackForm";
import LoginForm from "./Pages/LoginForm";
import AdminDashboard from "./Pages/AdminDashboard";

const ProtectedRoute = ({children}) =>{
    const token = localStorage.getItem("token");
    const role  = localStorage.getItem("role");
    return token && role === "admin" ? children : <Navigate to="/login"/>
};


function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<FeedbackForm/>} />
        <Route path="/login" element={<LoginForm/>} />
        <Route path="/admin" 
               element={
               <ProtectedRoute>
                  <AdminDashboard/>
               </ProtectedRoute>
               } 
            />
      </Routes>
    </Router>
  );
}

export default App;
