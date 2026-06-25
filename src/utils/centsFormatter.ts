export const centsFormatter = (value: string) => {
  const rgx = /[^\d,]/g;
  return value.replace(rgx, ",");
};
