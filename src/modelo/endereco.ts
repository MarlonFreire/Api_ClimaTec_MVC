export class Endereco {
  private constructor(
    private readonly _id: number,
    private readonly _idCliente: number,
    private readonly _rua: string,
    private readonly _numero: string,
    private readonly _bairro: string,
    private readonly _cidade: string,
    private readonly _uf: string,
    private readonly _cep: string,
    private readonly _complemento?: string,
  ) {}

  static criar(
    id: number,
    idCliente: number,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep: string,
    complemento?: string,
  ): Endereco {
    return new Endereco(id, idCliente, rua, numero, bairro, cidade, uf, cep, complemento)
  }

  static novo(
    idCliente: number,
    rua: string,
    numero: string,
    bairro: string,
    cidade: string,
    uf: string,
    cep: string,
    complemento?: string,
  ): Omit<Endereco, "_id"> {
    return {
      _idCliente: idCliente,
      _rua: rua,
      _numero: numero,
      _bairro: bairro,
      _cidade: cidade,
      _uf: uf,
      _cep: cep,
      _complemento: complemento,
    } as any
  }

  get id(): number {
    return this._id
  }

  get idCliente(): number {
    return this._idCliente
  }

  get rua(): string {
    return this._rua
  }

  get numero(): string {
    return this._numero
  }

  get bairro(): string {
    return this._bairro
  }

  get cidade(): string {
    return this._cidade
  }

  get uf(): string {
    return this._uf
  }

  get cep(): string {
    return this._cep
  }

  get complemento(): string | undefined {
    return this._complemento
  }
}
