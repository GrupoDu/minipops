export const removeUnusedParams = (
  params: URLSearchParams,
  value: string,
  key: string,
) => {
  const isValueEmpty = value.trim() === "";
  const isValueZero = value === "0";

  if (isValueEmpty || isValueZero) params.delete(key);
};
