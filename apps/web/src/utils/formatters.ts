export const formatCNPJ = (value: string) => {
  const cleanedValue = value.replace(/\D/g, ""); // remove caracteres não numéricos

  // CNPJ
  return cleanedValue
    .replace(/(\d{2})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1.$2")
    .replace(/(\d{3})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1-$2");
};

export const formatDate = (value: string) => {
  const cleanedValue = value.replace(/\D/g, ""); // remove caracteres não numéricos

  // CNPJ
  return cleanedValue
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{2})(\d)/, "$1/$2")
    .replace(/(\d{4})(\d)/, "$1");
};

export function formatPhone(value: string) {
  const cleaned = value.replace(/\D/g, "");

  if (cleaned === "" || cleaned.length < 2) {
    return "";
  }

  let formatted = `(${cleaned.substring(0, 2)})`;
  if (cleaned.length > 2) {
    formatted += ` ${cleaned.substring(2, 7)}`;
  }
  if (cleaned.length > 7) {
    formatted += `-${cleaned.substring(7, 11)}`;
  }

  return formatted;
}

export function getInitialsFromFullName(fullname: string) {
  const nameParts = fullname.split(" ");
  const firstLetter = nameParts[0][0];
  const lastLetter = nameParts[nameParts.length - 1][0];

  return `${firstLetter}${lastLetter}`;
}
