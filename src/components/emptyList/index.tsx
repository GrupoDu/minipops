import styles from "./styles.module.scss";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const EmptyList = ({ targetName }: { targetName: string }) => {
  const pathname = usePathname();
  const isDashboard = pathname === "/dashboard";

  return (
    <div className={styles.emptyList}>
      <span>Nenhum registro encontrado.</span>
      <span>
        Adicione um novo registro clicando em{" "}
        {isDashboard ? (
          <Link href={`/pedidos/add`}>Registrar Pedido</Link>
        ) : (
          <strong>&quot;+ Adicionar {targetName}&quot;</strong>
        )}
      </span>
    </div>
  );
};
