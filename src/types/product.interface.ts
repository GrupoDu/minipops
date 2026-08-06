export interface Product {
  productUuid: string;
  name: string;
  productType: string;
  image: string;
  stockQuantity: number;
  unitPrice: number;
  features?: string[];
  acronym?: string | null;
  description?: string | null;
  composition?: unknown;
}
