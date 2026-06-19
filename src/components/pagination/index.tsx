"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

type PaginationProps = {
  maxPage: number;
};

export const Pagination = (props: PaginationProps) => {
  const { maxPage } = props;
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pathname = usePathname();

  const isSelected = (pageItem: number) => pageItem === Number(page);

  const displayPaginationNumbers = () => {
    const paginationSpans = [];

    for (let i = 1; i <= maxPage; i++) {
      if (i > 5) return;

      paginationSpans.push(
        <Link
          key={i}
          href={`${pathname}?page=${i}&per_page=7`}
          className={`${styles.paginationItem} ${isSelected(i) && styles.isSelected}`}
        >
          {i}
        </Link>,
      );
    }

    return paginationSpans;
  };

  return (
    <div className={styles.pagination}>
      {displayPaginationNumbers()}
      {maxPage > 5 && (
        <Link
          href={`${pathname}?page=${maxPage}&per_page=7`}
          className={`${styles.paginationItem} ${isSelected(maxPage) && styles.isSelected}`}
        >
          {maxPage}
        </Link>
      )}
    </div>
  );
};
