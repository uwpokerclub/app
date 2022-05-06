import React, { ReactElement } from "react";
import { Link } from "react-router-dom";

import "./Home.scss";
import logoSrc from "../../../../../assets/logo.png";

import Blog from "./Blog";
import { blogPosts } from "./posts";
import BlogItem from "./BlogItem";


function Home(): ReactElement {
  return (
    <div className="center">
      <img src={logoSrc} className="ps-club-logo" alt="Logo" />

      <h1>UW Poker Studies Club</h1>
      <p>Welcome to The Admin Interface</p>

      <div className="btn-group">
        <Link to="/events" className="btn btn-primary">
          Manage Events
        </Link>
        <Link to="/users" className="btn btn-success">
          Manage Users
        </Link>
      </div>

      <div className="btn-group-sub">
        <Link to="/semesters/new" className="btn btn-primary">
          Create Semester
        </Link>
        <Link to="/events/new" className="btn btn-primary">
          Create Event
        </Link>
        <Link to="/users/new" className="btn btn-primary">
          Create User
        </Link>
      </div>

      <Blog>
        { blogPosts.map((post) => (
          <BlogItem key={post.title} header={post.title} subHeader={post.date}>{post.body}</BlogItem>
        ))}
      </Blog>
    </div>
  );
}

export default Home;