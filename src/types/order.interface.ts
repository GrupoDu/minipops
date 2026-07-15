import { OrderItem, OrderItemCreate } from "@/types/orderItem.interface";
import { Customer } from "@/types/customer.interface";
import { Revenue } from "@/types/revenue.interface";
import { Billing, BillingCreate } from "@/types/billing.interface";
import { Delivery, DeliveryCreate } from "@/types/delivery.interface";

export interface Order {
  customOrderId: string;
  createdAt: string;
  orderStatus: string;
  orderDeadline: Date;
  orderItems: OrderItem[];
  billing: Billing;
  revenue: Revenue;
  delivery: Delivery;
  clientUuid: string;
  customer: Customer;
  totalPrice: number;
}

export interface OrderPagination {
  data: Order[];
  maxPages: number;
  page: number;
}

type omitCreate =
  | "createdAt"
  | "orderUuid"
  | "orderStatus"
  | "totalPrice"
  | "clients"
  | "billing"
  | "revenue"
  | "delivery"
  | "orderItems";

export interface OrderCreate extends Omit<Order, omitCreate> {
  delivery: DeliveryCreate;
  revenue: Revenue;
  billing: BillingCreate;
  orderItems: OrderItemCreate[];
}
