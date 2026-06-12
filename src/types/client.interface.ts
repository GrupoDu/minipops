export interface Client {
  client_uuid: string;
  created_at: Date;
  client_name: string;
  client_cnpj: string;
  client_address: string;
  client_phone: string;
  client_email: string;
  client_landline?: string;
  client_logo?: string;
}

export interface ClientCreate extends Omit<
  Client,
  "client_uuid" | "created_at"
> {}
