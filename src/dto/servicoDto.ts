export interface ServicoCreateDto {
  nome: string
  descricao: string
  preco: number
  tempoEstimado: number
}

export interface ServicoUpdateDto {
  nome?: string
  descricao?: string
  preco?: number
  tempoEstimado?: number
}

export interface ServicoResponseDto {
  id: string
  nome: string
  descricao: string
  preco: number
  tempoEstimado: number
  dataCadastro: Date
}
