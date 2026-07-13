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

    if (newOrderItem.quantity < 1)
      return toast.error("Quantidade de produtos inválida.");

    if (!newOrderItem.product_uuid || newOrderItem.product_uuid === "")
      return toast.error("Por favor, selecione um produto.");

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
          discount_percentage: newOrderItem.discount_percentage,
        }),
      },
    ]);
    setNewOrderItem({
      product_uuid: "",
      unit_price: 0,
      quantity: 1,
      ipi: 0,
      discount_percentage: 0,
      additional_amount: 0,
    });
    debugLogger(["Save clicado."]);
  };
  const setDiscountToZero = () => {
    setNewOrderItem((prev) => ({
      ...prev,
      discount_percentage: 0,
    }));
  };
  const setDiscountToMax = () => {
    setNewOrderItem((prev) => ({
      ...prev,
      discount_percentage: 100,
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
      discount_percentage: value,
    }));
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
          <td>{priceFormatter(item.unitprice)}</td>
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
