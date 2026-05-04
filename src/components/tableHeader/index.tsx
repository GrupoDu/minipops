import styles from "./styles.module.scss";

function TableHeader({ titles }: { titles: string[] }) {
  return (
    <div className={styles.tableHeaderContainer}>
      {titles.map((title) => (
        <div key={title} className={styles.tableHeaderItem}>
          {title}
        </div>
      ))}
    </div>
  );
}

export default TableHeader;
