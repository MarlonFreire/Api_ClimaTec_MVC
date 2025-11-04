import express from "express";

const app = express();

app.listen(3000, () => {
  console.log('Servidor iniciado em http://localhost:3000');
});

app.get("/", (req, res) => {
  res.send("Servidor rodando com TypeScript");
});
