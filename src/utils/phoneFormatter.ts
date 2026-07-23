function phoneFormatter(phone?: string) {
  if (!phone) return "Celular não informado.";

  return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
}

export default phoneFormatter;
