"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./styles.module.scss";
import { MdChevronRight, MdHome } from "react-icons/md";

interface BreadcrumbProps {
  customLabels?: Record<string, string>;
}

const Breadcrumb = ({ customLabels = {} }: BreadcrumbProps) => {
  const pathname = usePathname();
  const pathSegments = pathname.split("/").filter((segment) => segment !== "");

  return (
    <nav className={styles.breadcrumb} aria-label="Breadcrumb">
      <ol className={styles.list}>
        <li className={styles.item}>
          <Link href="/dashboard" className={styles.link}>
            <MdHome size={18} />
          </Link>
        </li>

        {pathSegments.map((segment, index) => {
          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;
          const isLast = index === pathSegments.length - 1;
          
          // Use custom label if provided, otherwise capitalize and remove hyphens/underscores
          const label = customLabels[segment] || segment.charAt(0).toUpperCase() + segment.slice(1).replace(/[-_]/g, " ");

          return (
            <li key={href} className={styles.item}>
              <MdChevronRight className={styles.separator} />
              {isLast ? (
                <span className={styles.current} aria-current="page">
                  {label}
                </span>
              ) : (
                <Link href={href} className={styles.link}>
                  {label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumb;
