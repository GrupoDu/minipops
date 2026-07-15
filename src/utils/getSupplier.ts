import { cookies } from "next/headers";
import { api } from "@/services/api";
import { Supplier } from "@/types/suppliers.interface";

export async function getSupplier(supplierUuid: string) {
  try {
    if (!supplierUuid) return;

    const cookiesStorage = await cookies();
    const token = cookiesStorage.get("access_token");
    const supplier = await api.get(`/suppliers/${supplierUuid}`, {
      headers: {
        Cookie: `accessToken=${token?.value}`,
      },
    });
    const data: Supplier = await supplier.data.data;

    return data;
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
  }
}
