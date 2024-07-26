export function createConst<T extends string>(type: { [K in T]: K }): {
  [K in T]: K
} {
  const obj = {} as { [K in T]: K }
  for (const key in type) {
    obj[key] = key
  }
  return obj
}

export function generatesSelectable(obj: { [key: string]: string }) {
  return Object.entries(obj).map(([key, value]) => ({
    label: value,
    value: key,
    disabled: false,
  }))
}

export function validateCEP(cep: string): boolean {
  const cepNumeric = cep?.replace(/\D/g, '')

  if (cepNumeric?.length !== 8) {
    return false
  }

  if (parseInt(cepNumeric) === 0) {
    return false
  }

  return true
}

export const validateCPF = (cpf: string) => {
  const cleaned = cpf.replace(/[^\d]+/g, '')
  if (cleaned.length !== 11) return false

  return true
}

export const validateCNPJ = (cnpj: string) => {
  const cleaned = cnpj.replace(/[^\d]+/g, '')
  if (cleaned.length !== 14) return false

  return true
}

export const validateCPForCNPJ = (value: string) => {
  return validateCPF(value) || validateCNPJ(value)
}

export const validateRG = (rg: string) => {
  // Remove todos os caracteres não numéricos (exceto "X", "x", "A", etc.)
  const cleaned = rg.replace(
    /[^\dXxAaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwYyZz]/g,
    ''
  )

  // Verifica se o RG possui entre 7 e 10 caracteres (alguns estados usam 9 ou 10 caracteres, enquanto outros podem usar 8)
  return /^[0-9XxAaBbCcDdEeFfGgHhIiJjKkLlMmNnOoPpQqRrSsTtUuVvWwYyZz]{7,10}$/.test(
    cleaned
  )
}

export const validatePassport = (passport: string) => {
  const cleaned = passport.replace(/\s+/g, '') // Remove espaços em branco

  // Verifica se o passaporte segue o formato AA1234567
  return /^[A-Z]{2}\d{7}$/.test(cleaned)
}

type State = {
  [key: string]: string
}

export function getStateByUF(uf: string): string {
  const states: State = {
    AC: 'Acre',
    AL: 'Alagoas',
    AP: 'Amapá',
    AM: 'Amazonas',
    BA: 'Bahia',
    CE: 'Ceará',
    DF: 'Distrito Federal',
    ES: 'Espírito Santo',
    GO: 'Goiás',
    MA: 'Maranhão',
    MT: 'Mato Grosso',
    MS: 'Mato Grosso do Sul',
    MG: 'Minas Gerais',
    PA: 'Pará',
    PB: 'Paraíba',
    PR: 'Paraná',
    PE: 'Pernambuco',
    PI: 'Piauí',
    RJ: 'Rio de Janeiro',
    RN: 'Rio Grande do Norte',
    RS: 'Rio Grande do Sul',
    RO: 'Rondônia',
    RR: 'Roraima',
    SC: 'Santa Catarina',
    SP: 'São Paulo',
    SE: 'Sergipe',
    TO: 'Tocantins',
  }

  return states[uf] || 'State not found'
}

export function getLuminance(hexColor: string) {
  const rgb = hexToRgb(hexColor)
  const luminance = (0.299 * rgb.r + 0.587 * rgb.g + 0.114 * rgb.b) / 255
  return luminance
}

function hexToRgb(hex: string) {
  // Remove o símbolo de hash se ele estiver presente
  hex = hex.replace(/^#/, '')

  // Converte de três dígitos para seis dígitos
  if (hex.length === 3) {
    hex = hex
      .split('')
      .map((hex) => hex + hex)
      .join('')
  }

  const bigint = parseInt(hex, 16)
  const r = (bigint >> 16) & 255
  const g = (bigint >> 8) & 255
  const b = bigint & 255

  return { r, g, b }
}

export function contrast(color: string) {
  const luminance = getLuminance(color)
  return luminance > 0.5 ? '#18181b' : '#FFFFFF'
}
