"use client";

import styles from "./styles.module.scss";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { setQueryParams } from "@/utils/setQueryParams";

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
      <DisplayFirstPage sequenceFirstIndex={currentSequence[0]} />
      <DisplayPages currentSequence={currentSequence} />
      <DisplayLastPage maxPage={maxPage} />
    </div>
  );
};

function DisplayPages({ currentSequence }: { currentSequence: number[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const isSelected = (page: number) =>
    page === Number(searchParams.get("page"));

  return currentSequence.map((page) => (
    <button
      key={page}
      onClick={() => {
        const params = setQueryParams({
          searchParams,
          key: "page",
          value: page.toString(),
        });
        router.push(`${pathname}?${params}`);
      }}
      className={`${styles.paginationItem} ${isSelected(page) ? styles.isSelected : ""}`}
    >
      {page}
    </button>
  ));
}

function DisplayFirstPage({
  sequenceFirstIndex,
}: {
  sequenceFirstIndex: number;
}) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const isNotFirstSequence = sequenceFirstIndex > 4;

  if (!isNotFirstSequence) return;

  return (
    <>
      <button
        onClick={() => {
          const params = setQueryParams({
            searchParams,
            key: "page",
            value: "1",
          });
          router.push(`${pathname}?${params}`);
        }}
        className={styles.paginationItem}
      >
        1
      </button>
      <span className={styles.spaceDots}>...</span>
    </>
  );
}

function DisplayLastPage({ maxPage }: { maxPage: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const page = Number(searchParams.get("page")) || 1;
  const isLastSequence = page + 4 >= maxPage;

  if (isLastSequence) return;

  return (
    <>
      <span className={styles.spaceDots}>...</span>
      <button
        onClick={() => {
          const params = setQueryParams({
            searchParams,
            key: "page",
            value: maxPage.toString(),
          });
          router.push(`${pathname}?${params}`);
        }}
        className={styles.paginationItem}
      >
        {maxPage}
      </button>
    </>
  );
}

/**
 * Retorna a sequência de números para exibição na paginação.
 *
 * @param page - Página atual
 * @param allPages - Array com todas as páginas
 */
function getCurrentSequence(page: number, allPages: number[]) {
  const isFirstPage = page === 1;
  const sequenceEnd = page + 4;
  const sequenceStart = isFirstPage ? page - 1 : page - 2;
  return allPages.slice(sequenceStart, sequenceEnd);
}
