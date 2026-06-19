import { calculateDiscount } from "@/utils/calculateDiscount";

export function calculateProductTotalPrice(item: {
  quantity: number;
  unit_price: number;
  discount_percentage?: number;
}): number {
  const total = item.quantity * item.unit_price;
  const discount = calculateDiscount(total, item.discount_percentage);

  return total - discount;
}
