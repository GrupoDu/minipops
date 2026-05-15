"use client";

import styles from "./styles.module.scss";
import { BiPlus } from "react-icons/bi";
import Link from "next/link";
import { usePathname } from "next/navigation";

function PageHeader({
  title,
  description,
  addButton,
}: {
  title: string;
  description: string;
  addButton?: string;
}) {
  const pathname = usePathname();

  return (
    <div className={styles.pageHeaderContainer}>
      <div className={styles.pageHeaderTitle}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {addButton && (
        <Link href={`${pathname}/add`} className={styles.pageHeaderAddButton}>
          <BiPlus />
          <span>{addButton}</span>
        </Link>
      )}
    </div>
  );
}

export default PageHeader;
