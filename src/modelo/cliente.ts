export class Cliente {
  private constructor(
    private readonly _id: number,
    private readonly _nome: string,
    private readonly _telefone: string,
    private readonly _dataCadastro: Date,
  ) {}

  static criar(id: number, nome: string, telefone: string, dataCadastro: Date): Cliente {
    return new Cliente(id, nome, telefone, dataCadastro)
  }

  static novo(nome: string, telefone: string): Omit<Cliente, "_id" | "_dataCadastro"> {
    return {
      _nome: nome,
      _telefone: telefone,
    } as any
  }

  get id(): number {
    return this._id
  }

  get nome(): string {
    return this._nome
  }

  get telefone(): string {
    return this._telefone
  }

  get dataCadastro(): Date {
    return this._dataCadastro
  }

  comNome(novoNome: string): Cliente {
    return new Cliente(this._id, novoNome, this._telefone, this._dataCadastro)
  }

  comTelefone(novoTelefone: string): Cliente {
    return new Cliente(this._id, this._nome, novoTelefone, this._dataCadastro)
  }
}
