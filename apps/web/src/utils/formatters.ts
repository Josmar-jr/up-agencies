export const formatCNPJ = (value: string) => {
  const cleanedValue = value.replace(/\D/g, '') // remove caracteres não numéricos

  // CNPJ
  return cleanedValue
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2')
}

export const formatCPF = (value: string) => {
  const cleanedValue = value.replace(/\D/g, '') // remove caracteres não numéricos

  // CPF
  return cleanedValue
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export const formatRG = (value: string) => {
  const cleanedValue = value.replace(/\D/g, '') // remove caracteres não numéricos

  // RG
  return cleanedValue
    .replace(/(\d{2})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d)/, '$1.$2')
    .replace(/(\d{3})(\d{1,2})$/, '$1-$2')
}

export function formatCEP(cep: string) {
  // Remove todos os caracteres que não são dígitos
  const cleanedCep = cep.replace(/\D/g, '')

  // Formata o CEP no padrão XXXXX-XXX
  if (cleanedCep.length > 5) {
    return cleanedCep.slice(0, 5) + '-' + cleanedCep.slice(5, 8)
  }
  return cleanedCep
}

export const formatDate = (value: string) => {
  const cleanedValue = value.replace(/\D/g, '') // remove caracteres não numéricos

  // CNPJ
  return cleanedValue
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{2})(\d)/, '$1/$2')
    .replace(/(\d{4})(\d)/, '$1')
}

export function formatPhone(value: string) {
  const cleaned = value.replace(/\D/g, '')

  if (cleaned === '' || cleaned.length < 2) {
    return ''
  }

  let formatted = `(${cleaned.substring(0, 2)})`
  if (cleaned.length > 2) {
    formatted += ` ${cleaned.substring(2, 7)}`
  }
  if (cleaned.length > 7) {
    formatted += `-${cleaned.substring(7, 11)}`
  }

  return formatted
}

export function getInitialsFromFullName(fullname: string) {
  const nameParts = fullname.split(' ')
  const firstLetter = nameParts[0][0]
  const lastLetter = nameParts[nameParts.length - 1][0]

  return `${firstLetter}${lastLetter}`
}

export function formatterCEP(value: string) {
  return value.replace(/\D/g, '')
}

export function transformArrayToEnum<T = string>(
  array: T[]
): Record<string, T> {
  return array.reduce<Record<string, T>>((obj, level) => {
    obj[level as string] = level
    return obj
  }, {})
}

export function formatToBRL(amountInCents: number): string {
  const amountInReais = amountInCents / 100
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(amountInReais)
}
