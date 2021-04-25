import React, { ReactElement } from "react";

import { ReactComponent as MagnifyGlass } from "../../assets/magnify-glass.svg";

import "./NoResults.scss";

type Props = {
  title: string;
  body: string;
};

export default function NoResults({ title, body }: Props): ReactElement {
  return (
    <div className="NoResults">
      <div className="NoResults__icon-container">
        <MagnifyGlass className="NoResults__icon" />
      </div>
      <h4 className="NoResults__title">{title}</h4>
      <p className="NoResults__body">{body}</p>
    </div>
  );
}
