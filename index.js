import express from "express";

const app = express();

app.get("/:valor", (req, res) => {
  // Obtém o timestamp da URL
  const timestamp = req.params.valor;

  // Tenta converter o valor para um número inteiro
  const ts = parseInt(timestamp);

  // Verifica se o timestamp é um número válido
  if (isNaN(ts)) {
    return res.status(400).send({ error: "Timestamp inválido." });
  }

  // Converte o timestamp de segundos para milissegundos
  const data = new Date(ts * 1000);

  // Verifica se a data resultante é válida
  if (isNaN(data.getTime())) {
    return res.status(400).send({ error: "Data inválida." });
  }

  // Formata a data e a hora em strings legíveis
  const formattedDate = data.toLocaleDateString("pt-BR", { timeZone: "UTC" });
  const formattedTime = data.toLocaleTimeString("pt-BR", { timeZone: "UTC" });

  // Envia a resposta com a data e a hora separadas
  res.send({
    timestamp: ts,
    data: formattedDate,
    hora: formattedTime,
  });
});

app.listen(3000, () => {
  console.log("Em funcionamento.");
});
