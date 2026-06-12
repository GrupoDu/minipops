export interface Delivery {
  delivery_uuid?: string;
  created_at?: Date;
  building: string;
  delivery_address: string;
  delivery_cep: string;
  address_number: string;
  contact_number: string;
  reference?: string | null;
  delivery_observation?: string | null;
}

export interface DeliveryCreate extends Omit<
  Delivery,
  "delivery_uuid" | "created_at"
> {}
