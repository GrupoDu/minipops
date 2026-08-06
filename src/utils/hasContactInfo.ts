export const hasContactInfo = (
  email?: string | null,
  phone?: string | null,
  landline?: string | null,
) => {
  const hasEmail = !!email && email.length > 0;
  const hasPhone = !!phone && phone.length > 0;
  const hasLandline = !!landline && landline.length > 0;

  if (!hasEmail && !hasPhone && !hasLandline)
    throw new Error("Informe pelo menos um contato");

  return hasEmail || hasPhone || hasLandline;
};
