export interface Suppliers {
  supplier_uuid: string;
  supplier_name: string;
  supplier_cnpj: string;
  supplier_cep: number;
  supplier_address: string;
  supplier_email: string;
  supplier_phone: string;
  supplier_landline: string;
  address_number: number;
  supplier_segment: string;
  supplier_image?: string | null;
}

export interface SupplierCreate extends Omit<
  Suppliers,
  "supplier_uuid" | "address_number" | "supplier_cep"
> {
  address_number: string;
  supplier_cep: string;
}
