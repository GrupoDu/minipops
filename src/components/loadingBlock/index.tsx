import styles from "./styles.module.scss";
import { MoonLoader } from "react-spinners";

export const LoadingBlock = () => {
  return (
    <div className={styles.loadingBlockContainer}>
      <MoonLoader size={30} color={"#4AB56C"} />
      <span>Carregando...</span>
    </div>
  );
};
