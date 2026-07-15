import { Product } from "@/types/product.interface";

export interface OrderItem {
  orderItemUuid: string;
  productUuid: string;
  orderUuid: string;
  unitPrice: number;
  quantity: number;
  discountPercentage: number;
  ipi: number;
  additionalAmount: number;
  total: number;
  products: Product;
}

export interface OrderItemCreate extends Omit<
  OrderItem,
  "orderItemUuid" | "total" | "orderUuid" | "products"
> {}
