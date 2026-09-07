const fs = require('fs');
const path = require('path');

function executar(tecnologia) {
  const caminhoArquivo = path.join(__dirname, '..', 'data', 'trilhas_dio.json');
  if (!fs.existsSync(caminhoArquivo)) {
    console.log('❌ Arquivo de trilhas não encontrado.');
    return;
  }
  const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
  const json = JSON.parse(dados);
  const trilhas = json.trilhas_dio || [];

  const resultados = trilhas.filter(t =>
    t.tecnologia.toLowerCase().includes(tecnologia.toLowerCase())
  );

  if (resultados.length === 0) {
    console.log(`❌ Nenhuma trilha encontrada com a tecnologia "${tecnologia}".`);
    return;
  }

  console.log(`\n📚 === PLANO DE ESTUDOS PARA "${tecnologia.toUpperCase()}" === 📚\n`);
  resultados.forEach((trilha) => {
    console.log(`📌 Nome: ${trilha.nome}`);
    console.log(`📊 Nível: ${trilha['nível']}`);
    console.log(`📦 Módulos: ${trilha.numeroModulos}`);
    console.log(`⭐ XP Total: ${trilha.xpTotal}`);
    console.log(`🎖️ Badges: ${trilha.badgesDisponíveis.join(', ')}`);
    console.log('---');
  });
}

module.exports = { executar };