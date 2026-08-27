export const hasFilters = (searchParams: URLSearchParams) => {
  return searchParams.size > 2;
};
