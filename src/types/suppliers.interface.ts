export interface Supplier {
  supplierUuid: string;
  companyName: string;
  tradingName: string;
  supplierCnpj: string;
  supplierCep: string;
  supplierAddress: string;
  supplierEmail: string;
  supplierPhone: string;
  supplierLandline: string;
  addressNumber: string;
  supplierSegment: string;
  supplierImage?: string | null;
}

export interface SupplierCreate extends Omit<
  Supplier,
  "supplierUuid" | "addressNumber" | "supplierCep"
> {
  addressNumber: string;
  supplierCep: string;
}
