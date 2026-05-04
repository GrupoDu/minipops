import styles from "./styles.module.scss";

function PageHeader({
  title,
  description,
  addButton,
}: {
  title: string;
  description: string;
  addButton?: string;
}) {
  return (
    <div className={styles.pageHeaderContainer}>
      <div className={styles.pageHeaderTitle}>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {addButton && (
        <button className={styles.pageHeaderAddButton}>{addButton}</button>
      )}
    </div>
  );
}

export default PageHeader;
