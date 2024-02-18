import { ReactElement } from "react";

import styles from "./Icon.module.css";

type Props = {
  iconType: string;
  scale?: number;
};

export function Icon({ iconType, scale = 1 }: Props): ReactElement {
  return <i className={styles[iconType]} style={{ width: `${scale}rem`, height: `${scale}rem` }}></i>;
}
