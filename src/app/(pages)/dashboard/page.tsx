import styles from "./page.module.scss";
import PageHeader from "@/components/pageHeader";
import { BsCart } from "react-icons/bs";
import Card from "@/components/card";
import { MdAttachMoney, MdOutlinePending } from "react-icons/md";
import { CiClock1 } from "react-icons/ci";
import DashboardCharts from "@/components/dashboardCharts";
import OrderList from "@/components/orderList";
import OrderProvider from "@/providers/order.provider";

function DashboardPage() {
  const cards = [
    {
      title: "Vendas do mês",
      boldText: "57 Pedidos",
      subtext: "+16% vs. mês anterior",
      icon: <BsCart />,
    },
    {
      title: "Receita total",
      boldText: "R$ 314.000,00",
      subtext: "Meta mensal em 82%",
      icon: <MdAttachMoney />,
    },
    {
      title: "Pedidos pendentes",
      boldText: "14",
      subtext: "6 aguardando produção",
      icon: <CiClock1 />,
    },
  ];

  return (
    <div className={"pageContainer"}>
      <PageHeader
        title="Dashboard"
        description="Visão rápida da operação comercial do mês."
      />
      <div className={"mainContent"}>
        <div className={styles.cards}>
          {cards.map((card) => (
            <Card key={card.title} {...card} />
          ))}
        </div>
        <DashboardCharts />
        <div className={styles.recentOrders}>
          <div className={styles.pendingTitle}>
            <MdOutlinePending size={20} />
            <h4>Pedidos pendentes</h4>
          </div>
          <OrderProvider>
            <OrderList />
          </OrderProvider>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
