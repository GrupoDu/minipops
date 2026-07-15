export function dateFormatter(date: unknown) {
  if (typeof date !== "string") throw new Error("Formato de data inválido");

  const dateObj = new Date(date);
  const day = dateObj.getUTCDate();
  const month = dateObj.getUTCMonth() + 1;
  const year = dateObj.getUTCFullYear();
  return `${day}/${month}/${year}`;
}
