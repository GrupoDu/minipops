export interface Delivery {
  deliveryUuid?: string;
  createdAt?: Date;
  building: string;
  deliveryAddress: string;
  deliveryCep: string;
  addressNumber: number;
  contactNumber: string;
  deliveryStatus: string;
  reference?: string | null;
  deliveryObservation?: string | null;
}

export interface DeliveryCreate extends Omit<
  Delivery,
  "deliveryUuid" | "createdAt"
> {}
