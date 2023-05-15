import React, { ReactElement } from "react";

import "./Icon.css"

type Props = {
  iconType: string;
  scale?: number;
}

function Icon({ iconType, scale = 1 }: Props): ReactElement {
  return (
    <i className={`i-${iconType}`} style={{ width: `${scale}rem`, height: `${scale}rem` }}>
    </i>
  );
}

export default Icon;