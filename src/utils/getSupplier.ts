import { cookies } from "next/headers";
import { api } from "@/services/api";
import { Suppliers } from "@/types/suppliers.type";
import { AxiosResponse } from "axios";

export async function getSupplier(supplier_uuid: string) {
  try {
    if (!supplier_uuid) return;

    const cookiesStorage = await cookies();
    const token = cookiesStorage.get("access_token");
    const supplier = await api.get(`/suppliers/${supplier_uuid}`, {
      headers: {
        Cookie: `access_token=${token?.value}`,
      },
    });
    const data: Suppliers = await supplier.data.data;

    return data;
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
  }
}
