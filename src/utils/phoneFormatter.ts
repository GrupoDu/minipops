function phoneFormatter(phone: string) {
  return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
}

export default phoneFormatter;
