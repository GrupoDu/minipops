export default function stringIsNullOrEmpty(value?: string | null): boolean {
  return !value || value.trim().length < 1;
}
