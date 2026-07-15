export const landlineFormatter = (landline: string) => {
  if (!landline) return "Fixo não fornecido";

  return (
    "(" +
    landline.slice(0, 2) +
    ") " +
    landline.slice(2, 6) +
    "-" +
    landline.slice(6)
  );
};
