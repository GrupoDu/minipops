import { removeUnusedParams } from "@/utils/removeUnusedParams";

type QueryParamsType = {
  searchParams: URLSearchParams;
  key: string;
  value: string;
};

export const setQueryParams = (query: QueryParamsType) => {
  const params = new URLSearchParams(query.searchParams.toString());

  params.set(query.key, query.value);

  removeUnusedParams(params, query.value, query.key);

  return params.toString();
};
