export const hasFilters = (searchParams: URLSearchParams) => {
  searchParams.forEach((_, key) => {
    const isNotPaginationParam = key !== "page" && key !== "pageSize";

    if (isNotPaginationParam) return true;
  });

  return false;
};
