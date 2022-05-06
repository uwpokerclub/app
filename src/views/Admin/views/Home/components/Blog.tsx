import React, { ReactElement, ReactNode } from "react";

import "./Blog.scss"

function Blog({ children }: { children: ReactNode }): ReactElement {
  return (
    <div className="blog">
      {children}
    </div>
  )
}

export default Blog;