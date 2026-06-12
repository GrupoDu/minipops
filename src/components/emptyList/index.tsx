import styles from "./styles.module.scss";

export const EmptyList = ({ targetName }: { targetName: string }) => {
  return (
    <div className={styles.emptyList}>
      <span>Nenhum registro encontrado.</span>
      <span>
        Adicione um novo registro clicando em{" "}
        <strong>&quot;+ Adicionar {targetName}&quot;</strong>
      </span>
    </div>
  );
};
