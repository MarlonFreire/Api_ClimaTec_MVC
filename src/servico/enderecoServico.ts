import { EnderecoDao } from "../dao/enderecoDao"
import { ClienteDao } from "../dao/clienteDao"
import { Endereco } from "../modelo/endereco"
import type { EnderecoCadastroDto, EnderecoAtualizacaoDto, EnderecoRespostaDto } from "../dto/enderecoDto"

export class EnderecoServico {
  private enderecoDao: EnderecoDao
  private clienteDao: ClienteDao

  constructor() {
    this.enderecoDao = new EnderecoDao()
    this.clienteDao = new ClienteDao()
  }

  async cadastrarEndereco(dados: EnderecoCadastroDto): Promise<EnderecoRespostaDto> {
    // Validações
    if (!dados.idCliente) {
      throw new Error("ID do cliente é obrigatório")
    }

    // Verificar se cliente existe
    const clienteExistente = await this.clienteDao.buscarPorId(dados.idCliente.toString())
    if (!clienteExistente) {
      throw new Error("Cliente não encontrado")
    }

    if (!dados.rua || dados.rua.trim().length === 0) {
      throw new Error("Rua é obrigatória")
    }

    if (!dados.numero || dados.numero.trim().length === 0) {
      throw new Error("Número é obrigatório")
    }

    if (!dados.bairro || dados.bairro.trim().length === 0) {
      throw new Error("Bairro é obrigatório")
    }

    if (!dados.cidade || dados.cidade.trim().length === 0) {
      throw new Error("Cidade é obrigatória")
    }

    if (!dados.uf || dados.uf.trim().length === 0) {
      throw new Error("UF é obrigatória")
    }

    if (!dados.cep || dados.cep.trim().length === 0) {
      throw new Error("CEP é obrigatório")
    }

    const novoEndereco = Endereco.novo(
      dados.idCliente,
      dados.rua,
      dados.numero,
      dados.bairro,
      dados.cidade,
      dados.uf,
      dados.cep,
      dados.complemento,
    )

    const enderecoCriado = await this.enderecoDao.inserir(novoEndereco)

    return {
      id: enderecoCriado.id,
      idCliente: enderecoCriado.idCliente,
      rua: enderecoCriado.rua,
      numero: enderecoCriado.numero,
      bairro: enderecoCriado.bairro,
      cidade: enderecoCriado.cidade,
      uf: enderecoCriado.uf,
      cep: enderecoCriado.cep,
      complemento: enderecoCriado.complemento,
    }
  }

  async buscarEnderecoPorId(id: string): Promise<EnderecoRespostaDto | null> {
    const endereco = await this.enderecoDao.buscarPorId(id)

    if (!endereco) {
      return null
    }

    return {
      id: endereco.id,
      idCliente: endereco.idCliente,
      rua: endereco.rua,
      numero: endereco.numero,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      uf: endereco.uf,
      cep: endereco.cep,
      complemento: endereco.complemento,
    }
  }

  async buscarEnderecosPorCliente(idCliente: string): Promise<EnderecoRespostaDto[]> {
    const enderecos = await this.enderecoDao.buscarPorCliente(idCliente)

    return enderecos.map((endereco) => ({
      id: endereco.id,
      idCliente: endereco.idCliente,
      rua: endereco.rua,
      numero: endereco.numero,
      bairro: endereco.bairro,
      cidade: endereco.cidade,
      uf: endereco.uf,
      cep: endereco.cep,
      complemento: endereco.complemento,
    }))
  }

  async atualizarEndereco(id: string, dados: EnderecoAtualizacaoDto): Promise<EnderecoRespostaDto | null> {
    const enderecoExistente = await this.enderecoDao.buscarPorId(id)

    if (!enderecoExistente) {
      throw new Error("Endereço não encontrado")
    }

    const resultado = await this.enderecoDao.atualizar(id, dados as any)

    if (!resultado) {
      return null
    }

    return {
      id: resultado.id,
      idCliente: resultado.idCliente,
      rua: resultado.rua,
      numero: resultado.numero,
      bairro: resultado.bairro,
      cidade: resultado.cidade,
      uf: resultado.uf,
      cep: resultado.cep,
      complemento: resultado.complemento,
    }
  }

  async deletarEndereco(id: string): Promise<boolean> {
    const enderecoExistente = await this.enderecoDao.buscarPorId(id)

    if (!enderecoExistente) {
      throw new Error("Endereço não encontrado")
    }

    return await this.enderecoDao.deletar(id)
  }
}
