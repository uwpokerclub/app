import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts";

export function AdminNavbar() {
  const navigate = useNavigate();
  const auth = useAuth();

  const handleLogout = () => {
    auth.signOut(() => {
      navigate("/admin/login");
    });
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <Link to="/admin" className="navbar-brand">
          UW Poker
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent" style={{ justifyContent: "inherit" }}>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link">
                Users
              </Link>
            </li>
            <li>
              <Link to="/admin/events" className="nav-link">
                Events
              </Link>
            </li>
            <li>
              <Link to="/admin/semesters" className="nav-link">
                Semesters
              </Link>
            </li>
            <li>
              <Link to="/admin/rankings" className="nav-link">
                Rankings
              </Link>
            </li>
          </ul>

          <div className="d-flex">
            <button
              type="button"
              onClick={() => handleLogout()}
              className="btn btn-primary navbar-btn logout-btn btn-responsive"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
