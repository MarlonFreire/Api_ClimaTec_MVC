import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { Endereco } from "../modelo/endereco"
import conexao from "../util/conexao"

export class EnderecoDao {
  async inserir(endereco: Omit<Endereco, "id">): Promise<Endereco> {
    const sql = `INSERT INTO enderecos 
      (id_cliente, rua, numero, bairro, cidade, uf, cep, complemento) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)`

    const valores = [
      (endereco as any)._idCliente,
      (endereco as any)._rua,
      (endereco as any)._numero,
      (endereco as any)._bairro,
      (endereco as any)._cidade,
      (endereco as any)._uf,
      (endereco as any)._cep,
      (endereco as any)._complemento || null,
    ]

    const [resultado] = await conexao.execute<ResultSetHeader>(sql, valores)

    const [rows] = await conexao.execute<RowDataPacket[]>("SELECT * FROM enderecos WHERE id_endereco = ?", [
      resultado.insertId,
    ])

    const enderecoInserido = rows[0]
    return Endereco.criar(
      enderecoInserido.id_endereco,
      enderecoInserido.id_cliente,
      enderecoInserido.rua,
      enderecoInserido.numero,
      enderecoInserido.bairro,
      enderecoInserido.cidade,
      enderecoInserido.uf,
      enderecoInserido.cep,
      enderecoInserido.complemento,
    )
  }

  async buscarPorId(id: string): Promise<Endereco | null> {
    const sql = "SELECT * FROM enderecos WHERE id_endereco = ?"
    const [rows] = await conexao.execute<RowDataPacket[]>(sql, [id])

    if (rows.length === 0) {
      return null
    }

    const endereco = rows[0]
    return Endereco.criar(
      endereco.id_endereco,
      endereco.id_cliente,
      endereco.rua,
      endereco.numero,
      endereco.bairro,
      endereco.cidade,
      endereco.uf,
      endereco.cep,
      endereco.complemento,
    )
  }

  async buscarPorCliente(idCliente: string): Promise<Endereco[]> {
    const sql = "SELECT * FROM enderecos WHERE id_cliente = ?"
    const [rows] = await conexao.execute<RowDataPacket[]>(sql, [idCliente])

    return rows.map((endereco) =>
      Endereco.criar(
        endereco.id_endereco,
        endereco.id_cliente,
        endereco.rua,
        endereco.numero,
        endereco.bairro,
        endereco.cidade,
        endereco.uf,
        endereco.cep,
        endereco.complemento,
      ),
    )
  }

  async atualizar(id: string, dadosAtualizacao: Partial<Endereco>): Promise<Endereco | null> {
    const campos: string[] = []
    const valores: any[] = []

    if ((dadosAtualizacao as any)._rua) {
      campos.push("rua = ?")
      valores.push((dadosAtualizacao as any)._rua)
    }

    if ((dadosAtualizacao as any)._numero) {
      campos.push("numero = ?")
      valores.push((dadosAtualizacao as any)._numero)
    }

    if ((dadosAtualizacao as any)._bairro) {
      campos.push("bairro = ?")
      valores.push((dadosAtualizacao as any)._bairro)
    }

    if ((dadosAtualizacao as any)._cidade) {
      campos.push("cidade = ?")
      valores.push((dadosAtualizacao as any)._cidade)
    }

    if ((dadosAtualizacao as any)._uf) {
      campos.push("uf = ?")
      valores.push((dadosAtualizacao as any)._uf)
    }

    if ((dadosAtualizacao as any)._cep) {
      campos.push("cep = ?")
      valores.push((dadosAtualizacao as any)._cep)
    }

    if ((dadosAtualizacao as any)._complemento !== undefined) {
      campos.push("complemento = ?")
      valores.push((dadosAtualizacao as any)._complemento)
    }

    if (campos.length === 0) {
      return this.buscarPorId(id)
    }

    valores.push(id)
    const sql = `UPDATE enderecos SET ${campos.join(", ")} WHERE id_endereco = ?`

    await conexao.execute(sql, valores)
    return this.buscarPorId(id)
  }

  async deletar(id: string): Promise<boolean> {
    const sql = "DELETE FROM enderecos WHERE id_endereco = ?"
    const [resultado] = await conexao.execute<ResultSetHeader>(sql, [id])
    return resultado.affectedRows > 0
  }
}
