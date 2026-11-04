export default function statusFormatter(status: string) {
  switch (status) {
    case "EmProducao":
      return "Em Produção";
    case "Concluido":
      return "Concluído";
    case "Disponivel":
      return "Disponível";
    default:
      return status;
  }
}
