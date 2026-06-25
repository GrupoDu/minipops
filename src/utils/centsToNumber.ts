import { toast } from "react-toastify";

export const centsToNumber = (price: string) => {
  const formattedPrice = price.replace(",", "");
  return parseInt(formattedPrice, 10);
};
