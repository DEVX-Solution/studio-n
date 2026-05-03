const express = require("express");
const cors = require("cors");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({ ok: true, project: "Studio N.", status: "online" });
});

app.post("/api/contact", (req, res) => {
  const { name, email, project, message } = req.body;
  console.log("Novo contato Studio N:", { name, email, project, message });
  res.json({ ok: true, message: "Mensagem recebida com sucesso!" });
});

const distPath = path.join(__dirname, "../client/dist");
app.use(express.static(distPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(distPath, "index.html"));
});

app.listen(PORT, () => {
  console.log(`Studio N server rodando em http://localhost:${PORT}`);
});
