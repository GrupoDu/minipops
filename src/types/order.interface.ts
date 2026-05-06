import { OrderItem } from "@/types/orderItem.interface";
import { Client } from "@/types/client.interface";
import { Revenue } from "@/types/revenue.interface";
import { Billing } from "@/types/billing.interface";
import { Delivery } from "@/types/delivery.interface";

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
  totalPrice: number;
}
