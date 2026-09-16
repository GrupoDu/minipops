export interface Delivery {
  uuid?: string;
  createdAt?: Date;
  building: string;
  address: string;
  cep: string;
  addressNumber: number;
  contactNumber: string;
  status: string;
  reference?: string | null;
  deliveryObservation?: string | null;
}

export interface DeliveryCreate extends Omit<
  Delivery,
  "uuid" | "createdAt" | "status"
> {}
