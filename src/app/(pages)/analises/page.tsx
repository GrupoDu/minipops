import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import { LuMonitorCog } from "react-icons/lu";

function AnalysisPage() {
  return (
    <div className={"pageContainer"}>
      <PageHeader
        title={"Analises"}
        description={"Analise de dados para visão geral"}
      />
      <div className={"mainContent"}>
        <div className={styles.devMessage}>
          <LuMonitorCog size={30} />
          <h4>Página atualmente em desenvolvimento</h4>
        </div>
      </div>
    </div>
  );
}

export default AnalysisPage;
