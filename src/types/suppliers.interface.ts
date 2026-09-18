export interface Supplier {
  uuid: string;
  name: string;
  tradingName: string;
  cnpjCpf: string;
  cep: string;
  address: string;
  email: string;
  phone: string;
  landline: string;
  addressNumber: string;
  segment: string;
  image?: string | null;
}

export interface SupplierCreate extends Omit<
  Supplier,
  "uuid"
> {}
