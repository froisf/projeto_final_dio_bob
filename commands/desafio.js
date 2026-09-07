const fs = require('fs');
const path = require('path');

function executar(nivel, tecnologia) {
  const caminhoArquivo = path.join(__dirname, '..', 'data', 'trilhas_dio.json');
  if (!fs.existsSync(caminhoArquivo)) {
    console.log('❌ Arquivo de trilhas não encontrado.');
    return;
  }
  const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
  const json = JSON.parse(dados);
  let trilhas = json.trilhas_dio || [];

  if (nivel) {
    trilhas = trilhas.filter(t => t['nível'].toLowerCase() === nivel.toLowerCase());
  }
  if (tecnologia) {
    trilhas = trilhas.filter(t => t.tecnologia.toLowerCase().includes(tecnologia.toLowerCase()));
  }

  if (trilhas.length === 0) {
    console.log('❌ Nenhuma trilha encontrada com esses critérios.');
    return;
  }

  const aleatorio = trilhas[Math.floor(Math.random() * trilhas.length)];
  const desafios = [
    `Crie uma função em ${aleatorio.tecnologia} que resolva um problema de ${aleatorio.nome.toLowerCase()}.`,
    `Desenvolva um pequeno projeto usando ${aleatorio.tecnologia} aplicando os conceitos de ${aleatorio.nome}.`,
    `Explique como você implementaria um sistema de ${aleatorio.nome} usando ${aleatorio.tecnologia}.`
  ];

  console.log(`\n🎯 === DESAFIO GERADO === 🎯\n`);
  console.log(`📌 Trilha: ${aleatorio.nome}`);
  console.log(`📊 Nível: ${aleatorio['nível']}`);
  console.log(`🛠️ Tecnologia: ${aleatorio.tecnologia}`);
  console.log(`\n📝 Desafio:\n${desafios[Math.floor(Math.random() * desafios.length)]}`);
}

module.exports = { executar };