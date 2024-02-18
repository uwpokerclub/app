import { Link } from "react-router-dom";
import { Blog } from "../features/blog";

export function Home() {
  return (
    <div className="container text-center">
      <h1>UW Poker Studies Club</h1>
      <p>Welcome to the Admin Dashboard</p>

      <div className="container mb-1">
        <div className="btn-group">
          <Link to="./events" className="btn btn-primary">
            Manage Events
          </Link>
          <Link to="./users" className="btn btn-success">
            Manage Users
          </Link>
        </div>
      </div>

      <div className="container border-bottom pb-3">
        <div className="btn-group">
          <Link to="./semesters/new" className="btn btn-primary">
            Create Semester
          </Link>
          <Link to="./events/new" className="btn btn-primary">
            Create Event
          </Link>
          <Link to="./users/new" className="btn btn-primary">
            Create User
          </Link>
        </div>
      </div>

      <Blog />
    </div>
  );
}
