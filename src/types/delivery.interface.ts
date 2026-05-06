export interface Delivery {
  delivery_uuid: string;
  created_at: Date;
  order_uuid: string;
  building: string;
  delivery_address: string;
  reference?: string | null;
  delivery_observation?: string | null;
}
