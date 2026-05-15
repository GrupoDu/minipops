import styles from "./styles.module.scss";

const ListTemplate = ({ children }: { children: React.ReactNode }) => {
  return <ul className={styles.listTemplateContainer}>{children}</ul>;
};

export default ListTemplate;
