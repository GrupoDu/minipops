import styles from "./styles.module.scss";
import { ReactNode } from "react";

const FilterContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className={styles.filterContainer}>
      <h5 className={styles.filterTitle}>Filtros</h5>
      <div className={styles.filters}>{children}</div>
    </div>
  );
};

export default FilterContainer;
