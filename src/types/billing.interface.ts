export interface Billing {
  billing_uuid: string;
  created_at: Date;
  client_uuid: string;
  billing_address: string;
  name?: string | null;
}

export interface BillingCreate extends Omit<
  Billing,
  "created_at" | "billing_uuid"
> {}
