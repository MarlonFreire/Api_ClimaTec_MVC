export interface EnderecoCadastroDto {
  idCliente: number
  rua: string
  numero: string
  bairro: string
  cidade: string
  uf: string
  cep: string
  complemento?: string
}

export interface EnderecoAtualizacaoDto {
  rua?: string
  numero?: string
  bairro?: string
  cidade?: string
  uf?: string
  cep?: string
  complemento?: string
}

export interface EnderecoRespostaDto {
  id: number
  idCliente: number
  rua: string
  numero: string
  bairro: string
  cidade: string
  uf: string
  cep: string
  complemento?: string
}
