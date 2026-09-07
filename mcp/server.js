// mcp/server.js
const express = require('express');
const cors = require('cors');
const path = require('path');

// Importa as funções dos comandos (reutilizando a lógica)
const { executar: trilha } = require('../commands/trilha');
const { executar: desafio } = require('../commands/desafio');
const { executar: certificado } = require('../commands/certificado');

const app = express();
const PORT = 3000;

// Middlewares
app.use(cors());
app.use(express.json());

// Rota raiz (health check)
app.get('/', (req, res) => {
  res.json({ 
    status: 'online', 
    service: 'Geo-Explorer MCP Server',
    version: '1.0.0',
    endpoints: [
      '/trilha?tecnologia=Python',
      '/desafio?nivel=Avançado&tecnologia=Python',
      '/certificado?nome=Flavio+Frois&id=31'
    ]
  });
});

// Endpoint: /trilha
app.get('/trilha', (req, res) => {
  const tecnologia = req.query.tecnologia;
  if (!tecnologia) {
    return res.status(400).json({ error: 'Parâmetro "tecnologia" é obrigatório.' });
  }
  
  let output = [];
  const originalLog = console.log;
  console.log = (msg) => output.push(msg);

  try {
    trilha(tecnologia);
    res.json({ tecnologia, plano: output.join('\n') });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    console.log = originalLog;
  }
});

// Endpoint: /desafio
app.get('/desafio', (req, res) => {
  const nivel = req.query.nivel || '';
  const tecnologia = req.query.tecnologia || '';

  let output = [];
  const originalLog = console.log;
  console.log = (msg) => output.push(msg);

  try {
    desafio(nivel, tecnologia);
    res.json({ nivel, tecnologia, desafio: output.join('\n') });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    console.log = originalLog;
  }
});

// Endpoint: /certificado
app.get('/certificado', (req, res) => {
  const nome = req.query.nome;
  const id = req.query.id;

  if (!nome || !id) {
    return res.status(400).json({ error: 'Parâmetros "nome" e "id" são obrigatórios.' });
  }

  let output = [];
  const originalLog = console.log;
  console.log = (msg) => output.push(msg);

  try {
    certificado(nome, id);
    res.json({ nome, id, resultado: output.join('\n') });
  } catch (error) {
    res.status(500).json({ error: error.message });
  } finally {
    console.log = originalLog;
  }
});

// Inicia o servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor MCP rodando em http://localhost:${PORT}`);
  console.log(`📚 Endpoints disponíveis:`);
  console.log(`  GET /trilha?tecnologia=Python`);
  console.log(`  GET /desafio?nivel=Avançado&tecnologia=Python`);
  console.log(`  GET /certificado?nome=Flavio+Frois&id=31`);
});