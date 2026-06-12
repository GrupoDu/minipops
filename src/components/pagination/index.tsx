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

  const isSelected = (pageItem: number) => {
    return pageItem === Number(page);
  };

  const displayPaginationNumbers = () => {
    const actualPage = Number(page);
    let maxNumberPages = actualPage + 4;

    if (maxPage < 4) maxNumberPages = maxPage;

    const paginationSpans = [];

    if (actualPage > 1)
      paginationSpans.push(
        <Link
          key={actualPage - 1}
          href={`${pathname}?page=${actualPage - 1}`}
          className={styles.paginationItem}
        >
          {actualPage - 1}
        </Link>,
      );

    for (let i = actualPage; i < maxNumberPages; i++) {
      if (i < 1) return;

      paginationSpans.push(
        <Link
          key={i}
          href={`/fornecedores?page=${i}`}
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
      <Link
        href={`${pathname}?page=${maxPage}`}
        className={`${styles.paginationItem} ${isSelected(maxPage) && styles.isSelected}`}
      >
        {maxPage}
      </Link>
    </div>
  );
};
