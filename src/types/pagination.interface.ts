export interface PaginationType<T> {
  data: T[];
  maxPages: number;
  page: number;
}
