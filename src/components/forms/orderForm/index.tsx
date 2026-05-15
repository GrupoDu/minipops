"use client";

import styles from "./styles.module.scss";
import { InputDate } from "@/components/inputs/inputDate";
import { CSSProperties, useState } from "react";
import useOrderMultistepValues from "@/hooks/useOrderMultistepValues";
import BillingForm from "@/components/forms/billingForm";
import { Revenue } from "@/types/revenue.interface";
import { BillingCreate } from "@/types/billing.interface";
import { DeliveryCreate } from "@/types/delivery.interface";
import DeliveryForm from "@/components/forms/deliveryForm";
import RevenueForm from "@/components/forms/revenueForm";
import { toast } from "react-toastify";
import { api } from "@/services/api";
import { useRouter } from "next/navigation";
import OrderItemForm from "@/components/forms/orderItemForm";
import { OrderItemCreate } from "@/types/orderItem.interface";
import debugLogger from "@/utils/debugLogger";
import DefaultButton from "@/components/defaultButton";

const OrderForm = () => {
  const [deadline, setDeadline] = useState<string>("");
  const [revenue, setRevenue] = useState<Revenue>({
    client_uuid: "",
    revenue_address: "",
    revenue_cnpj: "",
    revenue_email: "",
    revenue_landline: "",
    revenue_phone: "",
  });
  const [billing, setBilling] = useState<BillingCreate>({
    billing_address: "",
    client_uuid: "",
    name: "",
  });
  const [delivery, setDelivery] = useState<DeliveryCreate>({
    building: "",
    delivery_address: "",
    reference: "",
  });
  const [orderItem, setOrderItem] = useState<OrderItemCreate[]>([]);
  const router = useRouter();

  const forms = [
    <RevenueForm setRevenue={setRevenue} revenue={revenue} key={0} />,
    <BillingForm setBilling={setBilling} billing={billing} key={1} />,
    <DeliveryForm setDelivery={setDelivery} delivery={delivery} key={2} />,
    <OrderItemForm setOrderItem={setOrderItem} key={3} />,
  ];

  const handleSubmit = async () => {
    if (!deadline) {
      toast.error("Prazo não fonecido.");
      return;
    }

    debugLogger([
      JSON.stringify({
        delivery,
        revenue,
        billing,
        order_deadline: new Date(deadline),
        client_uuid: billing.client_uuid,
        order_items: orderItem,
      }),
    ]);

    const body = {
      delivery,
      revenue,
      billing: {
        ...billing,
        client_uuid: revenue.client_uuid,
      },
      order_deadline: new Date(deadline),
      client_uuid: revenue.client_uuid,
      order_items: orderItem,
    };

    try {
      await api.post("/orders", body);
      toast.success("Pedido registrado com sucesso!");
      router.push("/pedidos");
    } catch (err) {
      const error = err as Error;
      console.error(error.message);
    }
  };

  const { nextStep, step, prevStep, CurrentComponent } =
    useOrderMultistepValues(forms, handleSubmit);

  const isLastForm = step === 3;
  const prevButtonText = step < 1 ? "Cancelar" : "Voltar";
  const nextButtonText = step === 3 ? "Concluir" : "Próximo";

  const doneStyle: CSSProperties = isLastForm
    ? {
        color: "var(--select-green)",
        border: "1px solid var(--select-green)",
      }
    : {};

  return (
    <form className="formContainer">
      <div className={styles.formTitle}>
        <h5>Registrar um novo pedido</h5>
      </div>
      <InputDate
        label={"Prazo do pedido"}
        value={deadline}
        onChange={(e) => setDeadline(e.target.value)}
        style={{ padding: ".8rem" }}
      />
      <div className={styles.tabs}>{displayTabs(step)}</div>
      {CurrentComponent}
      <div className={styles.buttonsContainer}>
        <DefaultButton
          type={"button"}
          onClick={() => {
            prevStep();
            debugLogger([
              JSON.stringify(revenue),
              JSON.stringify(billing),
              JSON.stringify(delivery),
              JSON.stringify(orderItem),
            ]);
          }}
        >
          {prevButtonText}
        </DefaultButton>
        <DefaultButton
          style={doneStyle}
          type={"button"}
          onClick={() => {
            nextStep();
            debugLogger([
              JSON.stringify(revenue),
              JSON.stringify(billing),
              JSON.stringify(delivery),
              JSON.stringify(orderItem),
            ]);
          }}
        >
          {nextButtonText}
        </DefaultButton>
      </div>
      <div className={styles.orderItemsListContainer}></div>
    </form>
  );
};

function displayTabs(step: number) {
  const tabs = ["Faturamento", "Cobrança", "Entrega", "Produtos"];
  const isSelected = (tab: string) => tabs[step] === tab;

  return tabs.map((tab, index) => (
    <div className={`${isSelected(tab) && styles.isSelected}`} key={index}>
      <span>{tab}</span>
    </div>
  ));
}

export default OrderForm;
