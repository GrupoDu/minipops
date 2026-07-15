export const cepFinder = async (cep: string) => {
  if (cep.length < 8) return "";

  const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
  return await response.json();
};
