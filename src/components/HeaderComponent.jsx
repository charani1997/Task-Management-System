import { NavLink } from "react-router-dom";
import { isUserLoggedIn, logout } from "../services/AuthService";
import { useNavigate } from "react-router-dom";

const HeaderComponent = () => {
  /* Diplay the Links as Per User Auth in the Header */
  const isAuth = isUserLoggedIn();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div>
            <NavLink className="navbar-brand" to="/">
              Task Management System
            </NavLink>
          </div>
          <div className="collapse navbar-collapse">
            <ul className="navbar-nav">
              {isAuth && (
                <li className="nav-item">
                  <NavLink className="nav-link" to="/tasks">
                    Tasks
                  </NavLink>
                </li>
              )}
            </ul>
          </div>
          <ul className="navbar-nav">
            {!isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/register">
                  Register
                </NavLink>
              </li>
            )}

            {!isAuth && (
              <li className="nav-item">
                <NavLink className="nav-link" to="/login">
                  Login
                </NavLink>
              </li>
            )}

            {isAuth && (
              <li className="nav-item">
                <NavLink
                  className="nav-link"
                  to="/login"
                  onClick={handleLogout}
                >
                  Logout
                </NavLink>
              </li>
            )}
          </ul>
        </nav>
      </header>
    </div>
  );
};

export default HeaderComponent;