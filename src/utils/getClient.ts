import { api } from "@/services/api";
import { Client } from "@/types/client.interface";
import { cookies } from "next/headers";

export async function getClient(
  client_uuid: string,
): Promise<Client | undefined> {
  const cookieStore = await cookies();
  const token = cookieStore.get("access_token")?.value;

  console.log(token);

  try {
    const response = await api.get(`/clients/${client_uuid}`, {
      headers: {
        Cookie: `access_token=${token}`,
      },
    });
    return response.data.data;
  } catch (err) {
    const error = err as Error;
    console.error(error.message);
  }
}
