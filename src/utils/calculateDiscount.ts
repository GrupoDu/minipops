export function calculateDiscount(
  total: number,
  discount_percentage?: number | null,
) {
  if (!discount_percentage || discount_percentage < 1) return 0;
  return (total * discount_percentage) / 100;
}
