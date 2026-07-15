export interface Suppliers {
  supplierUuid: string;
  supplierName: string;
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
  Suppliers,
  "supplierUuid" | "addressNumber" | "supplierCep"
> {
  addressNumber: string;
  supplierCep: string;
}
