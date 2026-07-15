"use client";

import styles from "./styles.module.scss";
import InputSelect from "@/components/inputs/inputSelect";
import useProducts from "@/hooks/useProducts";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { OrderItemCreate } from "@/types/orderItem.interface";
import InputText from "@/components/inputs/inputText";
import { priceFormatter } from "@/utils/priceFormatter";
import debugLogger from "@/utils/debugLogger";
import DefaultButton from "@/components/defaultButton";
import { toast } from "react-toastify";
import { calculateProductTotalPrice } from "@/utils/calculateProductTotalPrice";

type OrderItemProps = {
  setOrderItem: Dispatch<SetStateAction<OrderItemCreate[]>>;
};

type AddOrderItemType = {
  product: string;
  unitPrice: number;
  quantity: number;
  descount: number;
  ipi: number;
  additionalAmount: number;
  total: number;
};

const ProductsForm = (props: OrderItemProps) => {
  const { products } = useProducts();
  const [newOrderItem, setNewOrderItem] = useState<OrderItemCreate>({
    productUuid: "",
    unitPrice: 0,
    quantity: 1,
    ipi: 0,
    discountPercentage: 0,
    additionalAmount: 0,
  });
  const [addProductsList, setAddProductsList] = useState<AddOrderItemType[]>(
    [],
  );
  const { setOrderItem } = props;
  const emptyList = [
    {
      value: "",
      label: "",
    },
  ];
  const tableTitles = [
    "Produto",
    "Preço unit.",
    "Quantidade",
    "Desconto(%)",
    "IPI(%)",
    "Total",
  ];

  const productsList =
    products?.map((product) => ({
      value: product.productUuid || "",
      label: product.name || "",
    })) || emptyList;

  const getProduct = (target: { productUuid: string }) =>
    products?.find((product) => product.productUuid === target.productUuid);
  const selectProduct = (e: ChangeEvent<HTMLSelectElement>) => {
    const productTarget = products?.find(
      (product) => product.productUuid === e.target.value,
    );

    setNewOrderItem((prev) => ({
      ...prev,
      productUuid: e.target.value,
      unitPrice: productTarget?.unitPrice || 0,
    }));
  };
  const handleSave = () => {
    const product = getProduct(newOrderItem);

    if (newOrderItem.quantity < 1)
      return toast.error("Quantidade de produtos inválida.");

    if (!newOrderItem.productUuid || newOrderItem.productUuid === "")
      return toast.error("Por favor, selecione um produto.");

    setOrderItem((prevState) => [...prevState, newOrderItem]);
    setAddProductsList((prevState) => [
      ...prevState,
      {
        product: product?.name || "",
        ipi: newOrderItem.ipi,
        quantity: newOrderItem.quantity,
        descount: newOrderItem.discountPercentage,
        unitPrice: newOrderItem.unitPrice,
        additionalAmount: newOrderItem.additionalAmount,
        total: calculateProductTotalPrice({
          quantity: newOrderItem.quantity,
          unitPrice: newOrderItem.unitPrice,
          discountPercentage: newOrderItem.discountPercentage,
        }),
      },
    ]);
    setNewOrderItem({
      productUuid: "",
      unitPrice: 0,
      quantity: 1,
      ipi: 0,
      discountPercentage: 0,
      additionalAmount: 0,
    });
    debugLogger(["Save clicado."]);
  };
  const setDiscountToZero = () => {
    setNewOrderItem((prev) => ({
      ...prev,
      discountPercentage: 0,
    }));
  };
  const setDiscountToMax = () => {
    setNewOrderItem((prev) => ({
      ...prev,
      discountPercentage: 100,
    }));
  };
  const handleDiscountChange = (value: number) => {
    if (value > 100) {
      setDiscountToMax();
      return toast.error("Porcentagem máxima de 100%.");
    }

    if (value < 0) {
      setDiscountToZero();
      return;
    }

    setNewOrderItem((prev) => ({
      ...prev,
      discountPercentage: value,
    }));
  };

  return (
    <div className={"multistepForm"}>
      <div className={styles.orderItemForm}>
        <InputSelect
          label={"Selecionar produto"}
          options={productsList}
          value={newOrderItem.productUuid}
          onChange={(e) => selectProduct(e)}
        />
        <InputText
          type={"number"}
          min={1}
          label={"Quantidade"}
          required={true}
          value={String(newOrderItem.quantity)}
          onChange={(e) =>
            setNewOrderItem((prev) => ({
              ...prev,
              quantity: Number(e.target.value),
            }))
          }
        />
        <InputText
          type={"text"}
          label={"Preço unitário"}
          required={true}
          value={priceFormatter(newOrderItem.unitPrice)}
          readonly={true}
        />
        <InputText
          type={"number"}
          label={"Desconto(%)"}
          value={String(newOrderItem.discountPercentage)}
          max={100}
          onChange={(e) => handleDiscountChange(Number(e.target.value))}
        />
        <InputText
          type={"number"}
          label={"IPI(%)"}
          value={String(newOrderItem.ipi)}
          onChange={(e) =>
            setNewOrderItem((prev) => ({
              ...prev,
              ipi: Number(e.target.value),
            }))
          }
        />
      </div>
      <h4>Total: {priceFormatter(calculateProductTotalPrice(newOrderItem))}</h4>
      <DefaultButton
        type={"button"}
        onClick={handleSave}
        className={styles.saveButton}
      >
        <span>+ Adicionar item</span>
      </DefaultButton>
      <div className={styles.productsListContainer}>
        <h4>Produtos adicionados</h4>
        <table>
          <thead>
            <tr>
              {tableTitles.map((head, index) => (
                <th key={index}>{head}</th>
              ))}
            </tr>
          </thead>
          {displayAddOrderItems(addProductsList)}
        </table>
      </div>
    </div>
  );
};

function displayAddOrderItems(orderItems?: AddOrderItemType[]) {
  return (
    <tbody>
      {orderItems?.map((item, index) => (
        <tr key={index}>
          <td>{item.product}</td>
          <td>{priceFormatter(item.unitPrice)}</td>
          <td>{item.quantity}</td>
          <td>{item.descount}</td>
          <td>{item.ipi}</td>
          <td>{priceFormatter(item.total)}</td>
        </tr>
      ))}
    </tbody>
  );
}

export default ProductsForm;
