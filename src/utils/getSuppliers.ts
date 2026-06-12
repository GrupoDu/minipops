import { toast } from "react-toastify";
import { api } from "@/services/api";
import { Suppliers } from "@/types/suppliers.type";
import { cookies } from "next/headers";

export async function getSuppliers() {
  try {
    const cookiesStorage = await cookies();
    const token = cookiesStorage.get("access_token");
    const suppliers = await api.get("/suppliers", {
      headers: {
        Cookie: `access_token=${token?.value}`,
      },
    });
    const data: Suppliers[] = await suppliers.data;

    return data;
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
  }
}
