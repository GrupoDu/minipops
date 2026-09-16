export interface Client {
  uuid: string;
  createdAt: Date;
  name: string;
  tradingName: string;
  cnpj: string;
  address: string;
  cep: string;
  city: string;
  state: string;
  addressNumber: string;
  phone?: string | null;
  email?: string | null;
  landline?: string;
  logo?: string;
}

export interface ClientCreate extends Omit<Client, "uuid" | "createdAt"> {}
