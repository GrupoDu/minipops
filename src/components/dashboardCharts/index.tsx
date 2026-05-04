"use client";

import styles from "./styles.module.scss";
import { DonutSeriesModule, ModuleRegistry } from "ag-charts-enterprise";
import { AgCharts } from "ag-charts-react";
import BarChart from "@/components/barChart";

ModuleRegistry.registerModules([DonutSeriesModule]);

function DashboardCharts() {
  const barChartOptions = {
    title: {
      text: "Quantidade mensal de vendas",
    },
    subtitle: {
      text: "Janeiro - Março",
    },
    data: [
      {
        month: "Janeiro",
        sales: 140000,
      },
      {
        month: "Fevereiro",
        sales: 440000,
      },
      {
        month: "Março",
        sales: 693005,
      },
    ],
    series: [
      { type: "bar" as const, xKey: "month", yKey: "sales", yName: "Janeiro" },
      {
        type: "bar" as const,
        xKey: "month",
        yKey: "sales",
        yName: "Fevereiro",
      },
      { type: "bar" as const, xKey: "month", yKey: "sales", yName: "Março" },
    ],
  };
  const donutChartOptions = {
    data: [
      { status: "Pendente", amount: 10 },
      { status: "Finalizado", amount: 50 },
      { status: "Cancelado", amount: 2 },
    ],
    title: {
      text: "Quantidade de pedidos por status",
    },
    series: [
      { type: "donut" as const, calloutLabelKey: "status", angleKey: "amount" },
    ],
  };

  return (
    <div className={styles.dashboardChartsContainer}>
      <div className={styles.monthlySalesChart}>
        <BarChart barChartOptions={barChartOptions} />
      </div>
      <div className={styles.monthlyStatusChart}>
        <AgCharts options={donutChartOptions} />
      </div>
    </div>
  );
}

export default DashboardCharts;
