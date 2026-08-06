function phoneFormatter(phone?: string | null) {
  if (!phone) return "Celular não fornecido";
  return `(${phone.slice(0, 2)}) ${phone.slice(2, 7)}-${phone.slice(7)}`;
}

export default phoneFormatter;
