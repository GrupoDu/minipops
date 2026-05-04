import styles from "./styles.module.scss";
import {
  AgChartOptions,
  BarSeriesModule,
  ModuleRegistry,
} from "ag-charts-enterprise";
import { AgCharts } from "ag-charts-react";

ModuleRegistry.registerModules([BarSeriesModule]);

function BarChart({ barChartOptions }: { barChartOptions: AgChartOptions }) {
  return (
    <div className={styles.barChart}>
      <AgCharts options={barChartOptions} />
    </div>
  );
}

export default BarChart;
