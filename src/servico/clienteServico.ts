import { ClienteDao } from "../dao/clienteDao"
import { Cliente } from "../modelo/cliente"
import type { ClienteCadastroDto, ClienteAtualizacaoDto, ClienteRespostaDto } from "../dto/clienteDto"

export class ClienteServico {
  private clienteDao: ClienteDao

  constructor() {
    this.clienteDao = new ClienteDao()
  }

  async cadastrarCliente(dados: ClienteCadastroDto): Promise<ClienteRespostaDto> {
    // Validações
    if (!dados.nome || dados.nome.trim().length === 0) {
      throw new Error("Nome é obrigatório")
    }

    if (!dados.telefone || dados.telefone.trim().length === 0) {
      throw new Error("Telefone é obrigatório")
    }

    // Verificar se telefone já existe
    const clienteExistente = await this.clienteDao.buscarPorTelefone(dados.telefone)
    if (clienteExistente) {
      throw new Error("Telefone já cadastrado")
    }

    const novoCliente = Cliente.novo(dados.nome, dados.telefone)
    const clienteCriado = await this.clienteDao.inserir(novoCliente)

    return {
      id: clienteCriado.id,
      nome: clienteCriado.nome,
      telefone: clienteCriado.telefone,
      dataCadastro: clienteCriado.dataCadastro,
    }
  }

  async buscarClientePorId(id: string): Promise<ClienteRespostaDto | null> {
    const cliente = await this.clienteDao.buscarPorId(id)

    if (!cliente) {
      return null
    }

    return {
      id: cliente.id,
      nome: cliente.nome,
      telefone: cliente.telefone,
      dataCadastro: cliente.dataCadastro,
    }
  }

  async buscarClientePorTelefone(telefone: string): Promise<ClienteRespostaDto | null> {
    const cliente = await this.clienteDao.buscarPorTelefone(telefone)

    if (!cliente) {
      return null
    }

    return {
      id: cliente.id,
      nome: cliente.nome,
      telefone: cliente.telefone,
      dataCadastro: cliente.dataCadastro,
    }
  }

  async listarTodosClientes(): Promise<ClienteRespostaDto[]> {
    const clientes = await this.clienteDao.listarTodos()

    return clientes.map((cliente) => ({
      id: cliente.id,
      nome: cliente.nome,
      telefone: cliente.telefone,
      dataCadastro: cliente.dataCadastro,
    }))
  }

  async atualizarCliente(id: string, dados: ClienteAtualizacaoDto): Promise<ClienteRespostaDto | null> {
    const clienteExistente = await this.clienteDao.buscarPorId(id)

    if (!clienteExistente) {
      throw new Error("Cliente não encontrado")
    }

    // Se está atualizando telefone, verificar se já existe
    if (dados.telefone && dados.telefone !== clienteExistente.telefone) {
      const telefoneEmUso = await this.clienteDao.buscarPorTelefone(dados.telefone)
      if (telefoneEmUso) {
        throw new Error("Telefone já cadastrado")
      }
    }

    let clienteAtualizado = clienteExistente

    if (dados.nome) {
      clienteAtualizado = clienteAtualizado.comNome(dados.nome)
    }

    if (dados.telefone) {
      clienteAtualizado = clienteAtualizado.comTelefone(dados.telefone)
    }

    const resultado = await this.clienteDao.atualizar(id, clienteAtualizado)

    if (!resultado) {
      return null
    }

    return {
      id: resultado.id,
      nome: resultado.nome,
      telefone: resultado.telefone,
      dataCadastro: resultado.dataCadastro,
    }
  }

  async deletarCliente(id: string): Promise<boolean> {
    const clienteExistente = await this.clienteDao.buscarPorId(id)

    if (!clienteExistente) {
      throw new Error("Cliente não encontrado")
    }

    return await this.clienteDao.deletar(id)
  }
}
