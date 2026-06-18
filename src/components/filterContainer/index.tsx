"use client";

import styles from "./styles.module.scss";
import { ReactNode } from "react";
import { BsSearch } from "react-icons/bs";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type FilterContainerProps = {
  children: ReactNode;
  setEndpoint?: (value: string) => void;
  target?: string;
};

const FilterContainer = (props: FilterContainerProps) => {
  const { children, setEndpoint, target } = props;
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handleSearch = () => {
    if (setEndpoint && target)
      setEndpoint(`${target}/filter?${searchParams.toString()}`);
  };
  const clearFilters = () => {
    const defaultParams = searchParams
      .toString()
      .split("&")
      .filter(
        (filter) => filter.includes("page") || filter.includes("per_page"),
      )
      .join("&");

    if (setEndpoint && target) setEndpoint(`${target}?${defaultParams}`);

    router.push(`${pathname}?${defaultParams}`);
  };

  return (
    <div className={styles.filterContainer}>
      <h5 className={styles.filterTitle}>Filtros</h5>
      <div className={styles.filters}>
        {children}
        <button className={styles.searchButton} onClick={handleSearch}>
          <BsSearch />
        </button>
        <button className={styles.clearFilters} onClick={() => clearFilters()}>
          <span>Limpar filtros</span>
        </button>
      </div>
    </div>
  );
};

export default FilterContainer;
