import React from "react";
import styles from "./styles.module.css";

export default function Pagination() {
  return (
    <div className={styles.pagination}>
      <a href="#" className={styles.active}>
        1
      </a>
      <a href="#">2</a>
      <a href="#">3</a>
      <a href="#">4</a>
      <a href="#">5</a>
      <a href="#">6</a>
    </div>
  );
}
