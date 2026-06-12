"use client";

import styles from "./styles.module.scss";
import InputSelect from "@/components/inputs/inputSelect";
import useProducts from "@/hooks/useProducts";
import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import { OrderItemCreate } from "@/types/orderItem.interface";
import InputText from "@/components/inputs/inputText";
import TableHeader from "@/components/tableHeader";
import { priceFormatter } from "@/utils/priceFormatter";
import debugLogger from "@/utils/debugLogger";
import DefaultButton from "@/components/defaultButton";

type OrderItemProps = {
  setOrderItem: Dispatch<SetStateAction<OrderItemCreate[]>>;
};

type AddOrderItemType = {
  product: string;
  unitprice: number;
  quantity: number;
  descount: number;
  ipi: number;
  additionalamount: number;
  total: number;
};

const ProductsForm = (props: OrderItemProps) => {
  const { products } = useProducts();
  const [newOrderItem, setNewOrderItem] = useState<OrderItemCreate>({
    product_uuid: "",
    unit_price: 0,
    quantity: 1,
    ipi: 0,
    discount_percentage: 0,
    additional_amount: 0,
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
    "Valor unit.",
    "Quantidade",
    "Desconto(%)",
    "IPI(%)",
    "Total",
  ];

  const productsList =
    products?.map((product) => ({
      value: product.product_uuid || "",
      label: product.name || "",
    })) || emptyList;

  const getProduct = (target: { product_uuid: string }) =>
    products?.find((product) => product.product_uuid === target.product_uuid);
  const selectProduct = (e: ChangeEvent<HTMLSelectElement>) => {
    const productTarget = products?.find(
      (product) => product.product_uuid === e.target.value,
    );

    setNewOrderItem((prev) => ({
      ...prev,
      product_uuid: e.target.value,
      unit_price: productTarget?.unit_price || 0,
    }));
  };
  const handleSave = () => {
    const product = getProduct(newOrderItem);

    setOrderItem((prevState) => [...prevState, newOrderItem]);
    setAddProductsList((prevState) => [
      ...prevState,
      {
        product: product?.name || "",
        ipi: newOrderItem.ipi,
        quantity: newOrderItem.quantity,
        descount: newOrderItem.discount_percentage,
        unitprice: newOrderItem.unit_price,
        additionalamount: newOrderItem.additional_amount,
        total: calculateProductTotalPrice({
          quantity: newOrderItem.quantity,
          unit_price: newOrderItem.unit_price,
        }),
      },
    ]);
    setNewOrderItem({
      product_uuid: "",
      unit_price: 0,
      quantity: 0,
      ipi: 0,
      discount_percentage: 0,
      additional_amount: 0,
    });
    debugLogger(["Save clicado."]);
  };

  return (
    <div className={"multistepForm"}>
      <div className={styles.orderItemForm}>
        <InputSelect
          label={"Selecionar produto"}
          options={productsList}
          value={newOrderItem.product_uuid}
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
          value={priceFormatter(newOrderItem.unit_price)}
          readonly={true}
        />
        <InputText
          type={"number"}
          label={"Desconto(%)"}
          value={String(newOrderItem.discount_percentage)}
          onChange={(e) =>
            setNewOrderItem((prev) => ({
              ...prev,
              discount_percentage: Number(e.target.value),
            }))
          }
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
        <span>Adicionar item</span>
      </DefaultButton>
      <div className={styles.productsListContainer}>
        <h4>Produtos adicionados</h4>
        <TableHeader titles={tableTitles} />
        {displayAddOrderItems(addProductsList)}
      </div>
    </div>
  );
};

function calculateProductTotalPrice(item: {
  quantity: number;
  unit_price: number;
}): number {
  return item.quantity * item.unit_price;
}

function displayAddOrderItems(orderItems?: AddOrderItemType[]) {
  return (
    <ul>
      {orderItems?.map((item, index) => (
        <li key={index}>
          <span>{item.product}</span>
          <span>{priceFormatter(item.unitprice)}</span>
          <span>{item.quantity}</span>
          <span>{item.descount}</span>
          <span>{item.ipi}</span>
          <span>{priceFormatter(item.total)}</span>
        </li>
      ))}
    </ul>
  );
}

export default ProductsForm;
