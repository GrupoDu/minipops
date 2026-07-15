export interface Revenue {
  customerUuid: string;
  revenueAddress: string;
  revenueCnpj: string;
  revenueLandline: string;
  revenuePhone: string;
  revenueEmail: string;
}

// export interface RevenueCreate extends Omit<Revenue, "client_uuid"> {}
