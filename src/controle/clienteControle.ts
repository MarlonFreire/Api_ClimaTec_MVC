import type { Request, Response } from "express"
import { ClienteServico } from "../servico/clienteServico"

export class ClienteControle {
  private clienteServico: ClienteServico

  constructor() {
    this.clienteServico = new ClienteServico()
  }

  cadastrar = async (req: Request, res: Response): Promise<void> => {
    try {
      const cliente = await this.clienteServico.cadastrarCliente(req.body)
      res.status(201).json({
        mensagem: "Cliente cadastrado com sucesso",
        cliente,
      })
    } catch (erro: any) {
      res.status(400).json({
        mensagem: "Erro ao cadastrar cliente",
        erro: erro.message,
      })
    }
  }

  buscarPorId = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      if (!id) {
        res.status(400).json({
          mensagem: "ID do cliente é obrigatório",
        })
        return
      }

      const cliente = await this.clienteServico.buscarClientePorId(id)

      if (!cliente) {
        res.status(404).json({
          mensagem: "Cliente não encontrado",
        })
        return
      }

      res.status(200).json(cliente)
    } catch (erro: any) {
      res.status(500).json({
        mensagem: "Erro ao buscar cliente",
        erro: erro.message,
      })
    }
  }

  buscarPorTelefone = async (req: Request, res: Response): Promise<void> => {
    try {
      const { telefone } = req.params

      if (!telefone) {
        res.status(400).json({
          mensagem: "Telefone é obrigatório",
        })
        return
      }

      const cliente = await this.clienteServico.buscarClientePorTelefone(telefone)

      if (!cliente) {
        res.status(404).json({
          mensagem: "Cliente não encontrado",
        })
        return
      }

      res.status(200).json(cliente)
    } catch (erro: any) {
      res.status(500).json({
        mensagem: "Erro ao buscar cliente",
        erro: erro.message,
      })
    }
  }

  listarTodos = async (req: Request, res: Response): Promise<void> => {
    try {
      const clientes = await this.clienteServico.listarTodosClientes()
      res.status(200).json(clientes)
    } catch (erro: any) {
      res.status(500).json({
        mensagem: "Erro ao listar clientes",
        erro: erro.message,
      })
    }
  }

  atualizar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      if (!id) {
        res.status(400).json({
          mensagem: "ID do cliente é obrigatório",
        })
        return
      }

      const cliente = await this.clienteServico.atualizarCliente(id, req.body)

      if (!cliente) {
        res.status(404).json({
          mensagem: "Cliente não encontrado",
        })
        return
      }

      res.status(200).json({
        mensagem: "Cliente atualizado com sucesso",
        cliente,
      })
    } catch (erro: any) {
      res.status(400).json({
        mensagem: "Erro ao atualizar cliente",
        erro: erro.message,
      })
    }
  }

  deletar = async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params

      if (!id) {
        res.status(400).json({
          mensagem: "ID do cliente é obrigatório",
        })
        return
      }

      const deletado = await this.clienteServico.deletarCliente(id)

      if (!deletado) {
        res.status(404).json({
          mensagem: "Cliente não encontrado",
        })
        return
      }

      res.status(200).json({
        mensagem: "Cliente deletado com sucesso",
      })
    } catch (erro: any) {
      res.status(400).json({
        mensagem: "Erro ao deletar cliente",
        erro: erro.message,
      })
    }
  }
}
