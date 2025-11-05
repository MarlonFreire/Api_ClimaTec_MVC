import type { ResultSetHeader, RowDataPacket } from "mysql2"
import { Cliente } from "../modelo/cliente"
import conexao from "../util/conexao"

export class ClienteDao {
  async inserir(cliente: Omit<Cliente, "id" | "dataCadastro">): Promise<Cliente> {
    const sql = "INSERT INTO clientes (nome, telefone, data_cadastro) VALUES (?, ?, NOW())"
    const valores = [(cliente as any)._nome, (cliente as any)._telefone]

    const [resultado] = await conexao.execute<ResultSetHeader>(sql, valores)

    const [rows] = await conexao.execute<RowDataPacket[]>("SELECT * FROM clientes WHERE id_cliente = ?", [
      resultado.insertId,
    ])

    const clienteInserido = rows[0]
    return Cliente.criar(
      clienteInserido.id_cliente,
      clienteInserido.nome,
      clienteInserido.telefone,
      clienteInserido.data_cadastro,
    )
  }

  async buscarPorId(id: string): Promise<Cliente | null> {
    const sql = "SELECT * FROM clientes WHERE id_cliente = ?"
    const [rows] = await conexao.execute<RowDataPacket[]>(sql, [id])

    if (rows.length === 0) {
      return null
    }

    const cliente = rows[0]
    return Cliente.criar(cliente.id_cliente, cliente.nome, cliente.telefone, cliente.data_cadastro)
  }

  async buscarPorTelefone(telefone: string): Promise<Cliente | null> {
    const sql = "SELECT * FROM clientes WHERE telefone = ?"
    const [rows] = await conexao.execute<RowDataPacket[]>(sql, [telefone])

    if (rows.length === 0) {
      return null
    }

    const cliente = rows[0]
    return Cliente.criar(cliente.id_cliente, cliente.nome, cliente.telefone, cliente.data_cadastro)
  }

  async listarTodos(): Promise<Cliente[]> {
    const sql = "SELECT * FROM clientes ORDER BY data_cadastro DESC"
    const [rows] = await conexao.execute<RowDataPacket[]>(sql)

    return rows.map((cliente) =>
      Cliente.criar(cliente.id_cliente, cliente.nome, cliente.telefone, cliente.data_cadastro),
    )
  }

  async atualizar(id: string, dadosAtualizacao: Partial<Cliente>): Promise<Cliente | null> {
    const campos: string[] = []
    const valores: any[] = []

    if ((dadosAtualizacao as any)._nome) {
      campos.push("nome = ?")
      valores.push((dadosAtualizacao as any)._nome)
    }

    if ((dadosAtualizacao as any)._telefone) {
      campos.push("telefone = ?")
      valores.push((dadosAtualizacao as any)._telefone)
    }

    if (campos.length === 0) {
      return this.buscarPorId(id)
    }

    valores.push(id)
    const sql = `UPDATE clientes SET ${campos.join(", ")} WHERE id_cliente = ?`

    await conexao.execute(sql, valores)
    return this.buscarPorId(id)
  }

  async deletar(id: string): Promise<boolean> {
    const sql = "DELETE FROM clientes WHERE id_cliente = ?"
    const [resultado] = await conexao.execute<ResultSetHeader>(sql, [id])
    return resultado.affectedRows > 0
  }
}
