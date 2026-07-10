"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";

type PaginationProps = {
  maxPage: number;
};

export const Pagination = (props: PaginationProps) => {
  const { maxPage } = props;
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const pathname = usePathname();
  const { setIsLoading } = useLoading();

  const isSelected = (pageItem: number) => pageItem === Number(page);

  const displayPaginationNumbers = () => {
    const paginationSpans = [];

    for (let i = parseInt(page); i <= i + 5; i++) {
      paginationSpans.push(
        <Link
          key={i}
          href={`${pathname}?page=${i}&per_page=7`}
          className={`${styles.paginationItem} ${isSelected(i) && styles.isSelected}`}
          onClick={() => setIsLoading(true)}
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
          onClick={() => setIsLoading(true)}
        >
          {maxPage}
        </Link>
      )}
    </div>
  );
};
