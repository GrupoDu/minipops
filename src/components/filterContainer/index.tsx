"use client";

import styles from "./styles.module.scss";
import { ReactNode } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterContainerProps = {
  children: ReactNode;
  target?: string;
  isFiltersAvailable?: boolean;
};

const FilterContainer = (props: FilterContainerProps) => {
  const { children, isFiltersAvailable } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const clearFilters = () => {
    const params = new URLSearchParams(searchParams.toString());

    params.forEach((_, key) => {
      if (key !== "page" && key !== "pageSize") {
        params.delete(key);
      }
    });

    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      {isFiltersAvailable ? (
        <div className={styles.filterContainer}>
          <h5 className={styles.filterTitle}>Filtros</h5>
          <div className={styles.filters}>
            {children}
            <button
              className={styles.clearFilters}
              onClick={() => clearFilters()}
            >
              <span>Limpar filtros</span>
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.unavailable}>
          <span className={styles.unavailableText}>
            <strong>Filtros não disponíveis</strong>
          </span>
          <div className={styles.filterContainer}>
            <h5 className={styles.filterTitle}>Filtros</h5>
            <div className={styles.filters}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};

export default FilterContainer;
