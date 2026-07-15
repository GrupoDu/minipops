export interface Billing {
  billingUuid: string;
  createdAt: Date;
  clientUuid: string;
  billingAddress: string;
  billingCep: string;
  name?: string | null;
}

export interface BillingCreate extends Omit<
  Billing,
  "createdAt" | "billingUuid"
> {}
