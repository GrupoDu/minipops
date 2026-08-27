export function priceFormatter(price: number) {
  if (price === 0) return "0,00";

  return price.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
