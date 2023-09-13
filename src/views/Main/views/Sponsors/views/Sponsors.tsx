import React, { ReactElement } from "react";

import "./Sponsors.scss";

import Blog from "../components/Blog";
import { blogPosts } from "../components/posts";
import BlogItem from "../components/BlogItem";

export default function Sponsors(): ReactElement {
  return (
    <section className="Sponsors">
      <p className="sponsors-logo">Sponsors</p>
      <Blog>
        {blogPosts.map((post) => (
          <BlogItem key={post.title} header={post.title} subHeader={post.date}>
            {post.body}
          </BlogItem>
        ))}
      </Blog>
    </section>
  );
}
