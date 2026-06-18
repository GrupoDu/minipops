"use client";

import styles from "./styles.module.scss";
import { InputDate } from "@/components/inputs/inputDate";
import { CSSProperties, useState } from "react";
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
import numberRgxFormatter from "@/utils/numberRgxFormatter";
import { useLoading } from "@/hooks/useLoading";
import { BiCheck } from "react-icons/bi";
import BackButton from "@/components/backButton";

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
    billing_cep: "",
    name: "",
  });
  const [delivery, setDelivery] = useState<DeliveryCreate>({
    building: "",
    delivery_address: "",
    address_number: "",
    contact_number: "",
    delivery_cep: "",
    reference: "",
  });
  const [orderItem, setOrderItem] = useState<OrderItemCreate[]>([]);
  const router = useRouter();
  const { setIsLoading } = useLoading();

  const handleSubmit = async () => {
    if (!deadline) {
      toast.error("Prazo não fonecido.");
      return;
    }

    setIsLoading(true);

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
      delivery: {
        ...delivery,
        delivery_cep: Number(numberRgxFormatter(delivery.delivery_cep)),
        address_number: Number(numberRgxFormatter(delivery.address_number)),
        contact_number: numberRgxFormatter(delivery.contact_number),
      },
      revenue,
      billing: {
        ...billing,
        client_uuid: revenue.client_uuid,
        billing_cep: Number(numberRgxFormatter(billing.billing_cep)),
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
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const doneStyle: CSSProperties = {
    color: "var(--select-green)",
    border: "1px solid var(--select-green)",
  };

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
      <div className={styles.forms}>
        <div className={styles.grid}>
          <section className={styles.revenueForm}>
            <Tab>Faturamento</Tab>
            <RevenueForm setRevenue={setRevenue} revenue={revenue} key={0} />
          </section>
          <section className={styles.billingForm}>
            <Tab>Cobrança</Tab>
            <BillingForm setBilling={setBilling} billing={billing} key={1} />
          </section>
        </div>
        <section className={styles.deliveryForm}>
          <Tab>Entrega</Tab>
          <DeliveryForm setDelivery={setDelivery} delivery={delivery} key={2} />
        </section>
        <section className={styles.orderItemForm}>
          <Tab>Produtos</Tab>
          <OrderItemForm setOrderItem={setOrderItem} key={3} />
        </section>
      </div>
      <div className={styles.buttonsContainer}>
        <div>
          <BackButton />
        </div>
        <DefaultButton style={doneStyle} type={"button"} onClick={handleSubmit}>
          <span>Registrar</span>
          <BiCheck />
        </DefaultButton>
      </div>
      <div className={styles.orderItemsListContainer}></div>
    </form>
  );
};

function Tab({ children }: { children: React.ReactNode }) {
  return (
    <div className={styles.tabs}>
      <span>{children}</span>
    </div>
  );
}

export default OrderForm;
