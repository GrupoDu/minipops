export const removeUnusedParams = (
  params: URLSearchParams,
  value: string,
  key: string,
) => {
  if (value.trim() === "") params.delete(key);
};
