import "./App.css";
import HeaderComponent from "./components/HeaderComponent";
import ListTaskComponent from "./components/ListTaskComponent";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import TaskComponent from "./components/TaskComponent";
import RegisterComponent from "./components/RegisterComponent";
import LoginComponent from "./components/LoginComponent";
import { isUserLoggedIn } from "./services/AuthService";

function App() {
  const AuthenticatedRoute = ({ children }) => {
    const isAuth = isUserLoggedIn();
    if (isAuth) {
      return children;
    }
    return <Navigate to="/" />;
  };

  return (
    <>
      <BrowserRouter>
        <HeaderComponent />
        <Routes>
          {/* <Route path="/" element={<ListTodoComponent />} /> */}
          {/* Diplay the Links as Per User Auth in the Header */}
          <Route path="/" element={<LoginComponent />} />
          {/* Secure the Routes */}
          <Route
            path="/tasks"
            element={
              <AuthenticatedRoute>
                <ListTaskComponent />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/add-task"
            element={
              <AuthenticatedRoute>
                <TaskComponent />
              </AuthenticatedRoute>
            }
          />
          <Route
            path="/update-task/:id"
            element={
              <AuthenticatedRoute>
                <TaskComponent />
              </AuthenticatedRoute>
            }
          />
          <Route path="/register" element={<RegisterComponent />} />
          <Route path="/login" element={<LoginComponent />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;