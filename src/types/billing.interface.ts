export interface Billing {
  uuid: string;
  createdAt: Date;
  clientUuid: string;
  address: string;
  cep: string;
  name?: string | null;
}

export interface BillingCreate extends Omit<Billing, "createdAt" | "uuid"> {}
