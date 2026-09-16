import { OrderItem, OrderItemCreate } from "@/types/orderItem.interface";
import { Client } from "@/types/client.interface";
import { Revenue } from "@/types/revenue.interface";
import { Billing, BillingCreate } from "@/types/billing.interface";
import { Delivery, DeliveryCreate } from "@/types/delivery.interface";

export interface Order {
  id: number;
  customId: string;
  issuedAt: string;
  status: string;
  deadline: Date;
  orderItems: OrderItem[];
  billing: Billing;
  revenue: Revenue;
  delivery: Delivery;
  clientUuid: string;
  client: Client;
  totalPrice: number;
}

type omitCreate =
  | "issuedAt"
  | "id"
  | "status"
  | "totalPrice"
  | "client"
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
