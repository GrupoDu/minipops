export interface Customer {
  customerUuid: string;
  createdAt: Date;
  companyName: string;
  tradingName: string;
  customerCnpj: string;
  customerAddress: string;
  customerCep: string;
  customerCity: string;
  customerState: string;
  addressNumber: number;
  customerPhone?: string | null;
  customerEmail?: string | null;
  customerLandline?: string;
  customerLogo?: string;
}

export interface CustomerCreate extends Omit<
  Customer,
  "customerUuid" | "createdAt"
> {}
