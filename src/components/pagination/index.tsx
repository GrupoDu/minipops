"use client";

import styles from "./styles.module.scss";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useLoading } from "@/hooks/useLoading";

type PaginationProps = {
  maxPage: number;
};

type DisplayPaginationsProps = {
  pathname: string;
  page: number;
  isSelected: (value: number) => boolean;
  maxPage: number;
  setIsLoading: (isLoading: boolean) => void;
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
      paginationSpans = displayDefaultPagination({
        maxPage,
        page: pageInt,
        pathname,
        isSelected,
        setIsLoading,
      });
    } else {
      paginationSpans = displayFinalPages({
        maxPage,
        page: pageInt,
        pathname,
        isSelected,
        setIsLoading,
      });
    }

    return paginationSpans;
  };

  return (
    <div className={styles.pagination}>
      {prevPages({
        maxPage,
        page: parseInt(page),
        pathname,
        isSelected,
        setIsLoading,
      })}
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

function displayFinalPages(props: DisplayPaginationsProps) {
  const paginationSpans = [];

  for (let i = props.page; i < props.maxPage; i++) {
    paginationSpans.push(
      <Link
        key={i}
        href={`${props.pathname}?page=${i}&per_page=7`}
        className={`${styles.paginationItem} ${props.isSelected(i) && styles.isSelected}`}
        onClick={() => props.setIsLoading(true)}
      >
        {i}
      </Link>,
    );
  }

  return paginationSpans;
}

function displayDefaultPagination(props: DisplayPaginationsProps) {
  const paginationSpans = [];

  const maxPagePagination = props.page + 5;

  for (let i = props.page; i <= maxPagePagination; i++) {
    paginationSpans.push(
      <Link
        key={i}
        href={`${props.pathname}?page=${i}&per_page=7`}
        className={`${styles.paginationItem} ${props.isSelected(i) && styles.isSelected}`}
        onClick={() => props.setIsLoading(true)}
      >
        {i}
      </Link>,
    );
  }

  return paginationSpans;
}

function prevPages(props: DisplayPaginationsProps) {
  if (props.page === 1) return null;

  if (props.page > 1 && props.page < props.maxPage - 5)
    return initialPrevPages(props);

  return (
    <>
      <Link
        href={`${props.pathname}?page=${props.page - 2}&per_page=7`}
        className={`${styles.paginationItem} ${props.isSelected(props.maxPage) && styles.isSelected}`}
        onClick={() => props.setIsLoading(true)}
      >
        {props.maxPage - 2}
      </Link>
      <Link
        href={`${props.pathname}?page=1&per_page=7`}
        className={`${styles.paginationItem} ${props.isSelected(props.maxPage) && styles.isSelected}`}
        onClick={() => props.setIsLoading(true)}
      >
        1
      </Link>
      <Link
        href={`${props.pathname}?page=${props.page - 1}&per_page=7`}
        className={`${styles.paginationItem} ${props.isSelected(props.maxPage) && styles.isSelected}`}
        onClick={() => props.setIsLoading(true)}
      >
        {props.maxPage - 1}
      </Link>
    </>
  );
}

function initialPrevPages(props: DisplayPaginationsProps) {
  return (
    <>
      <Link
        href={`${props.pathname}?page=${props.page - 1}&per_page=7`}
        className={`${styles.paginationItem} ${props.isSelected(props.maxPage) && styles.isSelected}`}
        onClick={() => props.setIsLoading(true)}
      >
        {props.page - 1}
      </Link>
    </>
  );
}
