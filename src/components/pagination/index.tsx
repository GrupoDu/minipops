"use client";

import styles from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

type PaginationProps = {
  maxPage: number;
};

export const Pagination = (props: PaginationProps) => {
  const { maxPage } = props;
  const searchParams = useSearchParams();
  const page = searchParams.get("page") || "1";
  const allPages = Array.from({ length: maxPage }, (_, i) => i + 1);
  const currentSequence = getCurrentSequence(parseInt(page), allPages);

  return (
    <div className={styles.pagination}>
      <DisplayPages currentSequence={currentSequence} />
    </div>
  );
};

function DisplayPages({ currentSequence }: { currentSequence: number[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const handleChangeParams = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", page.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const isSelected = (page: number) =>
    page === Number(searchParams.get("page"));

  return (
    <>
      {currentSequence.map((page) => (
        <button
          key={page}
          onClick={() => handleChangeParams(page)}
          className={`${styles.paginationItem} ${isSelected(page) ? styles.isSelected : ""}`}
        >
          {page}
        </button>
      ))}
    </>
  );
}

function getCurrentSequence(page: number, allPages: number[]) {
  const isFirstPage = page === 1;
  const sequenceEnd = page + 4;
  const sequenceStart = isFirstPage ? page - 1 : page - 2;
  return allPages.slice(sequenceStart, sequenceEnd);
}
