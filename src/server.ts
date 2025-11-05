import express from "express"
import { TecnicoControle } from "./controle/tecnicoControle"
import { ClienteControle } from "./controle/clienteControle"
import { EnderecoControle } from "./controle/enderecoControle"

const app = express()

app.use(express.json())

// Técnicos - Sistema de Agendamento de Ar Condicionado

// Cadastro de técnico
app.post("/tecnicos", (req, res) => {
  const tecnicoControle = new TecnicoControle()
  return tecnicoControle.cadastrar(req, res)
})

// Login de técnico
app.post("/tecnicos/login", (req, res) => {
  const tecnicoControle = new TecnicoControle()
  return tecnicoControle.login(req, res)
})

// Listar todos os técnicos
app.get("/tecnicos", (req, res) => {
  const tecnicoControle = new TecnicoControle()
  return tecnicoControle.listar(req, res)
})

// Buscar técnico por ID
app.get("/tecnicos/:id", (req, res) => {
  const tecnicoControle = new TecnicoControle()
  return tecnicoControle.buscarPorId(req, res)
})

// Atualizar técnico
app.put("/tecnicos/:id", (req, res) => {
  const tecnicoControle = new TecnicoControle()
  return tecnicoControle.atualizar(req, res)
})

// Deletar técnico
app.delete("/tecnicos/:id", (req, res) => {
  const tecnicoControle = new TecnicoControle()
  return tecnicoControle.deletar(req, res)
})

// Cadastro de cliente
app.post("/clientes", (req, res) => {
  const clienteControle = new ClienteControle()
  return clienteControle.cadastrar(req, res)
})

// Listar todos os clientes
app.get("/clientes", (req, res) => {
  const clienteControle = new ClienteControle()
  return clienteControle.listarTodos(req, res)
})

// Buscar cliente por ID
app.get("/clientes/:id", (req, res) => {
  const clienteControle = new ClienteControle()
  return clienteControle.buscarPorId(req, res)
})

// Buscar cliente por telefone
app.get("/clientes/telefone/:telefone", (req, res) => {
  const clienteControle = new ClienteControle()
  return clienteControle.buscarPorTelefone(req, res)
})

// Atualizar cliente
app.put("/clientes/:id", (req, res) => {
  const clienteControle = new ClienteControle()
  return clienteControle.atualizar(req, res)
})

// Deletar cliente
app.delete("/clientes/:id", (req, res) => {
  const clienteControle = new ClienteControle()
  return clienteControle.deletar(req, res)
})

// Cadastro de endereço
app.post("/enderecos", (req, res) => {
  const enderecoControle = new EnderecoControle()
  return enderecoControle.cadastrar(req, res)
})

// Buscar endereço por ID
app.get("/enderecos/:id", (req, res) => {
  const enderecoControle = new EnderecoControle()
  return enderecoControle.buscarPorId(req, res)
})

// Buscar endereços por cliente
app.get("/enderecos/cliente/:idCliente", (req, res) => {
  const enderecoControle = new EnderecoControle()
  return enderecoControle.buscarPorCliente(req, res)
})

// Atualizar endereço
app.put("/enderecos/:id", (req, res) => {
  const enderecoControle = new EnderecoControle()
  return enderecoControle.atualizar(req, res)
})

// Deletar endereço
app.delete("/enderecos/:id", (req, res) => {
  const enderecoControle = new EnderecoControle()
  return enderecoControle.deletar(req, res)
})

app.listen(3000, () => {
  console.log(`Servidor rodando na porta http://localhost:3000`)
  console.log(`\nEndpoints disponíveis:`)
  console.log(`\n=== TÉCNICOS ===`)
  console.log(`  POST   http://localhost:3000/tecnicos - Cadastrar técnico`)
  console.log(`  POST   http://localhost:3000/tecnicos/login - Login de técnico`)
  console.log(`  GET    http://localhost:3000/tecnicos - Listar técnicos`)
  console.log(`  GET    http://localhost:3000/tecnicos/:id - Buscar técnico por ID`)
  console.log(`  PUT    http://localhost:3000/tecnicos/:id - Atualizar técnico`)
  console.log(`  DELETE http://localhost:3000/tecnicos/:id - Deletar técnico`)
  console.log(`\n=== CLIENTES ===`)
  console.log(`  POST   http://localhost:3000/clientes - Cadastrar cliente`)
  console.log(`  GET    http://localhost:3000/clientes - Listar clientes`)
  console.log(`  GET    http://localhost:3000/clientes/:id - Buscar cliente por ID`)
  console.log(`  GET    http://localhost:3000/clientes/telefone/:telefone - Buscar cliente por telefone`)
  console.log(`  PUT    http://localhost:3000/clientes/:id - Atualizar cliente`)
  console.log(`  DELETE http://localhost:3000/clientes/:id - Deletar cliente`)
  console.log(`\n=== ENDEREÇOS ===`)
  console.log(`  POST   http://localhost:3000/enderecos - Cadastrar endereço`)
  console.log(`  GET    http://localhost:3000/enderecos/:id - Buscar endereço por ID`)
  console.log(`  GET    http://localhost:3000/enderecos/cliente/:idCliente - Buscar endereços por cliente`)
  console.log(`  PUT    http://localhost:3000/enderecos/:id - Atualizar endereço`)
  console.log(`  DELETE http://localhost:3000/enderecos/:id - Deletar endereço`)
})
