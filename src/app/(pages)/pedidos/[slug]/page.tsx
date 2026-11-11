"use client";

import PageHeader from "@/components/pageHeader";
import styles from "./page.module.scss";
import useFetch from "@/hooks/useFetch";
import { Order } from "@/types/order.interface";
import Logo from "@/assets/grupodu_new_logo.png";
import { useParams, useRouter } from "next/navigation";
import Breadcrumb from "@/components/breadcrumb";
import Image from "next/image";
import { dateFormatter } from "@/utils/dateFormatter";
import statusFormatter from "@/utils/statusFormatter";
import { IoTimeOutline } from "react-icons/io5";
import { OrderInfos } from "@/components/orderInfos";
import { useState } from "react";
import { BiCheck } from "react-icons/bi";
import { BsX } from "react-icons/bs";
import { Modal } from "@/components/modal";
import { toast } from "react-toastify";
import { DEFAULT_PARAMS } from "@/constants/defaultParams.constant";
import { api } from "@/services/api";
import { useLoading } from "@/hooks/useLoading";
import BackButton from "@/components/backButton";
import { TbCancel } from "react-icons/tb";

export default function OrderDetailsPage() {
  const params = useParams<{ slug: string }>();
  const { setIsLoading } = useLoading();
  const [showModal, setShowModal] = useState(false);
  const [cancellationReason, setCancellationReason] = useState<string>("");
  const router = useRouter();
  const [status, setStatus] = useState("");
  const { data: order } = useFetch<Order>(`order/${params.slug}`);
  const [isCancelling, setIsCancelling] = useState(false);
  const isOrderDone =
    order?.status === "Concluido" || order?.status === "Cancelado";

  const changeStatus = async () => {
    setIsLoading(true);

    const acceptableStatus = ["Concluido", "Cancelado"];

    const isValidStatus = acceptableStatus.includes(status);

    if (!isValidStatus) {
      toast.error("Status inválido.");
      return;
    }

    try {
      const response = await api.patch(`/order/${params.slug}`, {
        status,
        cancellationReason,
      });

      const data = await response.data;

      toast.success(data);
      setShowModal(false);
      router.push(`/pedidos?${DEFAULT_PARAMS}`);
    } catch (e) {
      const err = e as Error;
      toast.error(err.message);
    } finally {
      setIsLoading(false);
      setShowModal(false);
    }
  };

  if (!order) return <OrderNotFound slug={params.slug ?? ""} />;

  const statusClass = order.status.replace(/\s+/g, "_");

  return (
    <>
      <Modal
        type={"warning"}
        showModal={showModal}
        setShowModal={setShowModal}
        onClickConfirm={() => changeStatus()}
      />
      <div className="pageContainer">
        <PageHeader
          title="Pedidos"
          description="Acompanhe pedidos por status, período, cliente e fornecedor."
        />
        <div className="mainContent">
          <Breadcrumb
            customLabels={{
              pedidos: "Lista de Pedidos",
              [order.id]: `Pedido ${order.customId}`,
            }}
          />
          <div className={styles.statusBtnsContainer}>
            <div className={styles.backButton}>
              <BackButton />
            </div>
            <div
              className={styles.statusBtns}
              style={{
                display: order.status !== "Concluido" ? "flex" : "none",
              }}
            >
              <button
                type={"button"}
                className={styles.doneButton}
                onClick={() => {
                  setStatus("Concluido");
                  setShowModal(true);
                }}
              >
                <span>Marcar como Finalizado</span>
                <BiCheck />
              </button>
              <button
                type={"button"}
                onClick={() => {
                  setStatus("Cancelado");
                  setIsCancelling(true);
                }}
                className={styles.cancelButton}
              >
                <span>Marcar como Cancelado</span>
                <TbCancel />
              </button>
            </div>
          </div>
          <div
            className={`${styles.cancelReasonContainer} ${isCancelling && styles.showCancelReasonInput}`}
          >
            <div
              className={styles.close}
              onClick={() => setIsCancelling(false)}
            >
              <BsX className={styles.closeBtn} />
            </div>
            <span className={styles.cancelledSpan}>Motivo do cancelamento</span>
            <input
              type="text"
              value={cancellationReason}
              required={status === "Cancelado"}
              onChange={(e) => setCancellationReason(e.target.value)}
            />
            <button onClick={() => setShowModal(true)}>Confirmar</button>
          </div>
          <div className={styles.orderContainer}>
            <div className={styles.printLogo}>
              <Image
                className={styles.logo}
                src={Logo}
                alt={"logo-grupodu"}
                width={100}
                height={100}
              />
              <div className={styles.textInfo}>
                <h3>GrupoDu</h3>
                <div className={styles.date}>
                  <span>Data de emissão: {dateFormatter(order.issuedAt)}</span>
                </div>
              </div>
            </div>
            <div
              className={`${styles.statusBar} ${styles[`status_${statusClass}`]}`}
            >
              <span>{statusFormatter(order.status)}</span>
            </div>
            {order.isOverdue && (
              <div className={styles.isOverdue}>
                <IoTimeOutline />
                <span>Atrasado</span>
              </div>
            )}
            <h4 className={styles.orderId}>Pedido: {order.customId}</h4>
            <hr />
            <OrderInfos order={order} />
          </div>
        </div>
      </div>
    </>
  );
}

function OrderNotFound({ slug }: { slug: string }) {
  return (
    <>
      <Breadcrumb
        customLabels={{
          pedidos: "Lista de Pedidos",
          [slug]: "Pedido não encontrado",
        }}
      />
      <div className="mainContent">
        <div className={styles.orderContainer}>
          <h3>Pedido não encontrado.</h3>
        </div>
      </div>
    </>
  );
}
