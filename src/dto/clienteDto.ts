export interface ClienteCadastroDto {
  nome: string
  telefone: string
}

export interface ClienteAtualizacaoDto {
  nome?: string
  telefone?: string
}

export interface ClienteRespostaDto {
  id: number
  nome: string
  telefone: string
  dataCadastro: Date
}
