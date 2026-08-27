type ExtractOptionsArray = {
  label: string;
  value: string;
};

/**
 * Extrai um array de opções para o componente InputSelect
 *
 * @param arr - Array de itens
 */
export function extractOptionsArray<T>(arr: T[]): ExtractOptionsArray[] {
  return arr.map((item, index) => ({
    label: String(item),
    value: String(index + 1),
  }));
}
