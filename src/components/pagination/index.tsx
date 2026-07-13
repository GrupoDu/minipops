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
    let paginationSpans = [];

    const pageInt = parseInt(page);

    if (pageInt >= 1 && pageInt < maxPage - 5) {
      paginationSpans = displayDefaultPagination(
        pageInt,
        maxPage,
        pathname,
        isSelected,
        setIsLoading,
      );
    } else {
      paginationSpans = displayFinalPages(
        pageInt,
        maxPage,
        pathname,
        isSelected,
        setIsLoading,
      );
    }

    return paginationSpans;
  };

  return (
    <div className={styles.pagination}>
      {prevPages(pathname, parseInt(page), isSelected, maxPage, setIsLoading)}
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

function displayFinalPages(
  page: number,
  maxPage: number,
  pathname: string,
  isSelected: (page: number) => boolean,
  setIsLoading: (isLoading: boolean) => void,
) {
  const paginationSpans = [];

  for (let i = page; i < maxPage; i++) {
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
}

function displayDefaultPagination(
  page: number,
  maxPage: number,
  pathname: string,
  isSelected: (page: number) => boolean,
  setIsLoading: (isLoading: boolean) => void,
) {
  const paginationSpans = [];

  const maxPagePagination = page + 5;

  for (let i = page; i <= maxPagePagination; i++) {
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
}

function prevPages(
  pathname: string,
  page: number,
  isSelected: (value: number) => boolean,
  maxPage: number,
  setIsLoading: (isLoading: boolean) => void,
) {
  if (page !== maxPage) return null;

  return (
    <>
      <Link
        href={`${pathname}?page=${page - 1}&per_page=7`}
        className={`${styles.paginationItem} ${isSelected(maxPage) && styles.isSelected}`}
        onClick={() => setIsLoading(true)}
      >
        {maxPage - 1}
      </Link>
      <Link
        href={`${pathname}?page=${page - 1}&per_page=7`}
        className={`${styles.paginationItem} ${isSelected(maxPage) && styles.isSelected}`}
        onClick={() => setIsLoading(true)}
      >
        {maxPage - 2}
      </Link>
      <Link
        href={`${pathname}?page=1&per_page=7`}
        className={`${styles.paginationItem} ${isSelected(maxPage) && styles.isSelected}`}
        onClick={() => setIsLoading(true)}
      >
        1
      </Link>
    </>
  );
}
