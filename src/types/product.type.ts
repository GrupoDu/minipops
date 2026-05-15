export interface Product {
  product_uuid: string;
  name: string;
  product_type: string;
  image: string;
  stock_quantity: number;
  unit_price: number;
  features?: string[];
  acronym?: string | null;
  description?: string | null;
  composition?: unknown;
}
