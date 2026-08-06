import { calculateDiscount } from "@/utils/calculateDiscount";

export function calculateProductTotalPrice(item: {
  quantity: number;
  unitPrice: number;
  discountPercentage?: number;
}): number {
  const total = item.quantity * item.unitPrice;
  const discount = calculateDiscount(total, item.discountPercentage);

  return total - discount;
}
