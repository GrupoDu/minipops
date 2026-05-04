export interface Order {
  order_uuid: string;
  revenue: Revenue;
  billing: Billing;
  supplier: Supplier;
  delivery: Delivery;
  products: Product[];
}

interface Revenue {
  name: string;
  address: string;
  cnpj: string;
  phone: string;
  landline: string;
  email: string;
  status: string;
}

interface Billing {
  name: string;
  address: string;
}

interface Supplier {
  bussiness_name: string;
  address: string;
  cnpj_cpf: string;
  phone: string;
  landline: string;
  email: string;
  representative: string;
}

interface Delivery {
  building: string;
  address: string;
  reference?: string;
}

interface Product {
  name: string;
  quantity: number;
  unit_price: number;
  discount_percentage: number;
  ipi: number;
  additional_amount: number;
  observation?: string;
}
