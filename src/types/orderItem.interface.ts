export interface OrderItem {
  order_item_uuid: string;
  product_uuid: string;
  order_uuid: string;
  unit_price: number;
  quantity: number;
  discount_percentage: number;
  ipi: number;
  additional_amount: number;
  total: number;
}

export interface OrderItemCreate extends Omit<
  OrderItem,
  "order_item_uuid" | "total" | "order_uuid"
> {}
