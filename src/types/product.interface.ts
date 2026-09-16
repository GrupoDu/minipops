export interface Product {
  uuid: string;
  name: string;
  type: string;
  image: string;
  stockQuantity: number;
  unitPrice: number;
  features?: string[];
  acronym?: string | null;
  description?: string | null;
  composition?: unknown;
}
