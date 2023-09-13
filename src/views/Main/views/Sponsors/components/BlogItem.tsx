import React, { ReactElement, ReactNode } from "react";

import "./BlogItem.scss";

function BlogItem({
  header,
  subHeader,
  children,
}: {
  header: string;
  subHeader: string;
  children: ReactNode;
}): ReactElement {
  return (
    <div className="blog-item">
      <div className="blog-header">
        <h3 className="blog-title">{header}</h3>
        <p className="blog-subheader">{subHeader}</p>
      </div>

      <div className="blog-body">{children}</div>
    </div>
  );
}

export default BlogItem;
