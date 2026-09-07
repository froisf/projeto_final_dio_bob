const fs = require('fs');
const path = require('path');

function executar(nomeUsuario, idTrilha) {
  const caminhoArquivo = path.join(__dirname, '..', 'data', 'trilhas_dio.json');
  if (!fs.existsSync(caminhoArquivo)) {
    console.log('❌ Arquivo de trilhas não encontrado.');
    return;
  }
  const dados = fs.readFileSync(caminhoArquivo, 'utf-8');
  const json = JSON.parse(dados);
  const trilha = json.trilhas_dio.find(t => t.id === parseInt(idTrilha));

  if (!trilha) {
    console.log(`❌ Trilha com ID ${idTrilha} não encontrada.`);
    return;
  }

  const dataAtual = new Date().toLocaleDateString('pt-BR');
  const certificado = `
# 🏆 CERTIFICADO DE CONCLUSÃO

## DIO - Digital Innovation One

Certificamos que **${nomeUsuario}** concluiu com sucesso a trilha:

---

### 📚 ${trilha.nome}

- **Tecnologia:** ${trilha.tecnologia}
- **Nível:** ${trilha['nível']}
- **Módulos:** ${trilha.numeroModulos}
- **XP Total:** ${trilha.xpTotal} XP

---

### 📅 Data de conclusão: ${dataAtual}

---

*Este certificado é uma simulação gerada automaticamente pelo projeto Geo-Explorer.*
`;

  // Limpa o nome do usuário para usar no nome do arquivo
  const nomeLimpo = nomeUsuario.replace(/["']/g, '').replace(/\s/g, '_');
  const nomeArquivo = `certificado-${nomeLimpo}-${trilha.id}.md`;
  const caminhoSalvar = path.join(__dirname, '..', 'docs', nomeArquivo); // ← aqui estava o erro (aspas)

  // Garante que a pasta docs existe
  if (!fs.existsSync(path.join(__dirname, '..', 'docs'))) {
    fs.mkdirSync(path.join(__dirname, '..', 'docs'), { recursive: true });
  }

  fs.writeFileSync(caminhoSalvar, certificado, 'utf-8');

  console.log(`✅ Certificado gerado com sucesso!`);
  console.log(`📁 Salvo em: docs/${nomeArquivo}`);
  console.log(`\n${certificado}`);
}

module.exports = { executar };