import { OrderItem, OrderItemCreate } from "@/types/orderItem.interface";
import { Client } from "@/types/client.interface";
import { Revenue } from "@/types/revenue.interface";
import { Billing, BillingCreate } from "@/types/billing.interface";
import { Delivery, DeliveryCreate } from "@/types/delivery.interface";

export interface Order {
  order_uuid: string;
  created_at: Date;
  order_status: string;
  order_deadline: Date;
  order_items: OrderItem[];
  billing: Billing;
  revenue: Revenue;
  delivery: Delivery;
  client_uuid: string;
  clients: Client;
  total_price: number;
}

type omitCreate =
  | "created_at"
  | "order_uuid"
  | "order_status"
  | "totalPrice"
  | "clients"
  | "billing"
  | "revenue"
  | "delivery"
  | "order_items";

export interface OrderCreate extends Omit<Order, omitCreate> {
  delivery: DeliveryCreate;
  revenue: Revenue;
  billing: BillingCreate;
  order_items: OrderItemCreate[];
}
