export function priceFormatter(price: number) {
  if (!price) return "0,00";

  const formattedPrice = price / 100;

  return formattedPrice.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
  });
}
