import express from "express"
import { TecnicoControle } from "./controle/tecnicoControle"

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

app.listen(3000, () => {
  console.log(`Servidor rodando na porta http://localhost:3000`)
  console.log(`\nEndpoints disponíveis:`)
  console.log(`  POST   http://localhost:3000/tecnicos - Cadastrar técnico`)
  console.log(`  POST   http://localhost:3000/tecnicos/login - Login de técnico`)
  console.log(`  GET    http://localhost:3000/tecnicos - Listar técnicos`)
  console.log(`  GET    http://localhost:3000/tecnicos/:id - Buscar técnico por ID`)
  console.log(`  PUT    http://localhost:3000/tecnicos/:id - Atualizar técnico`)
  console.log(`  DELETE http://localhost:3000/tecnicos/:id - Deletar técnico`)
})
