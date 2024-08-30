export interface Address {
  cep: string
  state: string
  city: string
  neighborhood: string
  street: string
  number: number
  complement?: string
}

export interface AddressResultMutation {
  bairro: string
  cep: string
  complemento: string
  ddd: string
  gia: string
  ibge: string
  localidade: string
  logradouro: string
  siafi: string
  uf: string
}
