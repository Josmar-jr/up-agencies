export const SEXO = {
  MALE: 'Masculino',
  FEMALE: 'Feminino',
}

export const PERSON_TYPES = {
  PASSENGER: 'Passageiro',
  CLIENT: 'Cliente',
  SUPPLIER: 'Fornecedor',
  REPRESENTATIVE: 'Representante',
} as const

export enum PersonType {
  CLIENT = 'CLIENT',
  PASSENGER = 'PASSENGER',
  SUPPLIER = 'SUPPLIER',
  REPRESENTATIVE = 'REPRESENTATIVE',
}
