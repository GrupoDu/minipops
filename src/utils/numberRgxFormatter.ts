function numberRgxFormatter(value: string) {
  const numberRgx = /[^0-9]/g;
  return value.replace(numberRgx, "");
}

export default numberRgxFormatter;
