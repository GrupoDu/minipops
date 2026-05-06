export function dateFormatter(date: unknown) {
  if (typeof date !== "string") throw new Error("Formato de data inválido");

  const dateObj = new Date(date);
  const day = dateObj.getDate();
  const month = dateObj.getMonth() + 1;
  const year = dateObj.getFullYear();
  return `${day}/${month}/${year}`;
}
