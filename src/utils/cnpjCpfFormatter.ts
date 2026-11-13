function cnpjFormatter(cnpj: string) {
  return cnpj
    .replace(/\D+/g, "")
    .replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, "$1.$2.$3/$4-$5");
}

function cpfFormatter(cpf: string) {
  return cpf
    .replace(/\D/g, "")
    .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4");
}

export function displayCnpjCpf(value: string) {
  const isCnpj = value.length === 14;
  const isCpf = value.length === 11;

  if (isCnpj) {
    return cnpjFormatter(value);
  } else if (isCpf) {
    return cpfFormatter(value);
  } else {
    return value;
  }
}
