function cepFormatter(value: unknown) {
  const stringValue = String(value);
  return `${stringValue.slice(0, 5)}-${stringValue.slice(5)}`;
}

export default cepFormatter;
