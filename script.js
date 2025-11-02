// Configuração das classes - CORRIGIDO
const configClasses = {
  "Jovens": {
    nome: "Jovens por Cristo",
    alunos: [
      "ANA CAROLINA",
      "CLARA REGINA G. DA SILVA",
      "DARLENE ALVES DA SILVA",
      "EMANUEL BERNADRO",
      "FELIPE RACHANICCI",
      "GERSON BENTO VIEIRA",
      "GERSON DE O. BENTO VIEIRA FILHO",
      "IAGO AUGUSTO",
      "YOHAN GABRIEL",
      "JÉSSICA GOMES DE OLIVEIRA",
      "KAIO SAMPAIO",
      "LUCAS PASSOS",
      "MARCOS MAIA",
      "MARIANA RODRIGUES TRINDADE",
      "NICOLE LOUZADA DE ALMEIDA",
      "RODRIGO BRASILEIRO",
      "SAMUEL PEREIRA FERREIRA DE LIMA",
      "STEPHANIE MELO",
      "TIAGO MUSSATO",
      "URIAS RODRIGUES TRINDADE",
      "VALESKA DA SILVA"
    ]
  },
  "Adolescentes": {
    nome: "Classe Adolescentes",
    alunos: [
      "AGATHA GONÇALVES VIEIRA",
      "ARTHUR PEREIRA FERREIRA DE LIMA",
      "FELIPE CARDOSO VIEIRA",
      "GABRIEL PEREIRA FERREIRA DE LIMA",
      "IGOR OLIVEIRA SANTANA",
      "ISABELLA CONCEIÇÃO DA SILVA",
      "JOÃO PEDRO LINS DE ANDRADE",
      "KAUÊ AGUIAR RANGEL",
      "LUCAS SOARES AS SILVA",
      "MARIA CLARA ALVES DA COSTA",
      "MARIA EDUARDA ROSA",
      "PEDRO HENRIQUE L. DE ANDRADE",
      "PRISCILA BENTO VIEIRA",
      "TIAGO BENTO VIEIRA",
      "VANESSA ROCHA DE SOUZA SIQUEIRA",
      "VICTOR LUCAS MELO AMADEU"
    ]
  },
  "Irmãos": {
    nome: "Classe Daniel",
    alunos: [
      "ADRIANO DA SILVA",
      "ADRIANO GONÇALVES ROSA",
      "ALUISIO FRANCISCO DE MOURA",
      "ANDERSON COSTA",
      "CICERO CARLOS DA SILVA",
      "DENILSON PAES AMADEU",
      "EDELUCIO TRINDADE",
      "EDUARDO CANDIDO PINTO",
      "EMERSON BENTO VIEIRA",
      "JANILTON PEREIRA FERREIRA",
      "JOSE GOMES",
      "LUIS CARLOS FERREIRA",
      "MOISÉS VALENTIM DOS SANTOS",
      "OSEAS CUSTÓDIO",
      "PAULO MACIEL",
      "RENATO SANTOS SIQUEIRA",
      "RODRIGO BATISTA FERNANDES",
      "SAMUEL GONÇALVES F. DE SOUZA",
      "SIDNEI DONIZETE BENTO VIEIRA"
    ]
  },
  "Irmãs": {
    nome: "Classe Noemi", 
    alunos: [
      "ARLEIDE RIBEIRO RAMOS",
      "CLÁUDIA MARIA DE OLIVEIRA SILVA",
      "CRISTINA CLAUDIA FERREIRA",
      "JACIARA MARINHO DOS SANTOS",
      "JACIRA DA S. GOMES OLIVEIRA",
      "JAQUELINE VITAL",
      "JULIANE DE SOUZA BENTO VIEIRA",
      "ISABEL ALVES",
      "LAODICEIA R. DE PAIVA",
      "LEONILDE G. TAVARES DA SILVA",
      "MARIA CARMELINA FERREIRA SILVA",
      "MARIA ERMELINDA FRIZANCO VIEIRA",
      "MARIA ISABEL SILVEIRA VIEIRA",
      "MARIA SULAMITA AGUIAR",
      "NEIDE MOURA",
      "PRISCILA GOMES",
      "SIMONE CONCEIÇÃO DE ASSIS",
      "SOLEMAR PORTELA S. FERNANDES",
      "THAIS ALVES DA SILVA",
      "VALÉRIA CRISTINA LEANDRO",
      "VIVIANE PATRÍCIA DOS S. SOARES"
    ]
  },
  "JardimInfancia": {
    nome: "Jardim de Infância (04 e 06 anos)",
    alunos: [
      "ARTHUR TADEU",
      "AYLA",
      "ESTER PEREIRA",
      "GIOVANA TAVARES",
      "GUILHERME",
      "HEITOR",
      "ISAAC",
      "JOÃO MIGUEL",
      "LETICIA ZEGALI VIEIRA",
      "LUCCA",
      "LUIS OTÁVIO",
      "MAJU",
      "MANUELA LOURENÇO",
      "SOPHIA"
    ]
  },
  "Juniores": {
    nome: "Juniores (09 e 10 anos)",
    alunos: [
      "ARTHUR MACIEL",
      "DANIEL",
      "HELENA LINS",
      "ISABELLI NERI",
      "ISRAEL ALVES COSTA",
      "MARIA EDUARDA RACANICCHI",
      "MILENA",
      "PIETRO MACIEL",
      "RAUL DE MOURA",
      "SOPHIE",
      "VANESSA GABRIELA"
    ]
  }
};


// Variáveis globais
let classeAtual = null;
let visitantes = [];

// Elementos da página
const paginaSelecao = document.getElementById('pagina-selecao');
const paginaApp = document.getElementById('pagina-app');
const modalConfirmacao = document.getElementById('modalConfirmacao');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  console.log('Página carregada - Inicializando...');
  
  // Eventos para seleção de classes
  document.querySelectorAll('.classe-card').forEach(card => {
    card.addEventListener('click', function() {
      const classe = this.getAttribute('data-classe');
      console.log('Classe selecionada:', classe);
      iniciarApp(classe);
    });
  });

  // Evento do botão voltar
  document.getElementById('btnVoltar').addEventListener('click', function(e) {
    e.preventDefault();
    console.log('Voltando para seleção...');
    voltarParaSelecao();
  });

  // Eventos do modal
  document.querySelector('.close').addEventListener('click', fecharModalELimpar);
  document.getElementById('btnFecharModal').addEventListener('click', fecharModalELimpar);
  
  // Evento do formulário de visitantes
  document.getElementById("form-visitante").addEventListener("submit", function(e) {
    e.preventDefault();
    const nomeInput = document.getElementById("nomeVisitante");
    const nome = nomeInput.value.trim();
    
    if (nome) {
      adicionarVisitante(nome);
      nomeInput.value = '';
    }
  });

  // Evento do botão exportar
  document.getElementById("btnExportar").addEventListener("click", exportarParaExcel);

// NOVO: Eventos para limpar zeros ao focar nos campos
  document.getElementById('revistas').addEventListener('focus', limparZero);
  document.getElementById('biblias').addEventListener('focus', limparZero);
  document.getElementById('oferta').addEventListener('focus', limparZeroOferta);

  // NOVO: Eventos para restaurar zero se campo ficar vazio
  document.getElementById('revistas').addEventListener('blur', restaurarZero);
  document.getElementById('biblias').addEventListener('blur', restaurarZero);
  document.getElementById('oferta').addEventListener('blur', restaurarZeroOferta);


  mostrarDataAtual();
  console.log('Inicialização concluída');
});


// NOVAS FUNÇÕES PARA MELHORAR USABILIDADE

// Limpa o zero quando o campo recebe foco
function limparZero(event) {
  const input = event.target;
  if (input.value === '0' || input.value === '0.00') {
    input.value = '';
  }
}

// Limpa o zero específico para oferta (formato decimal)
function limparZeroOferta(event) {
  const input = event.target;
  if (input.value === '0.00') {
    input.value = '';
  }
}

// Restaura zero se campo ficar vazio
function restaurarZero(event) {
  const input = event.target;
  if (input.value === '' || input.value === '0') {
    input.value = '0';
  }
}

// Restaura zero específico para oferta
function restaurarZeroOferta(event) {
  const input = event.target;
  if (input.value === '' || input.value === '0') {
    input.value = '0.00';
  }
}

// Função para iniciar o app com uma classe específica
function iniciarApp(classe) {
  classeAtual = classe;
  const config = configClasses[classe];
  
  if (!config) {
    alert('Classe não encontrada!');
    return;
  }

  console.log('Iniciando app para classe:', config.nome);

  // Atualizar interface
  document.getElementById('nomeClasse').textContent = `Classe: ${config.nome}`;
  document.title = `${config.nome} - Controle de Frequência`;

  // Carregar dados da classe
  carregarDadosClasse();
  
  // Montar tabela de alunos
  montarTabelaAlunos(config.alunos);
  
  // Mostrar app e esconder seleção
  paginaSelecao.style.display = 'none';
  paginaApp.style.display = 'block';
  
  console.log('App iniciado com sucesso');
}

// Função para voltar para seleção
function voltarParaSelecao() {
  paginaApp.style.display = 'none';
  paginaSelecao.style.display = 'block';
  document.title = 'Controle de Frequência - EBD';
  
  // Limpar dados temporários
  classeAtual = null;
  visitantes = [];
}

// Monta tabela de presença
function montarTabelaAlunos(alunos) {
  const tabela = document.getElementById("tabelaAlunos");
  tabela.innerHTML = '';

  alunos.forEach(aluno => {
    const row = document.createElement("tr");
    const presente = obterPresencaSalva(aluno);
    
    row.innerHTML = `
      <td>${aluno}</td>
      <td><input type="checkbox" class="chk-pres" ${presente ? 'checked' : ''} data-aluno="${aluno}"></td>
    `;
    tabela.appendChild(row);
  });

  // Configurar total de matriculados
  document.getElementById("totalMatriculados").value = alunos.length;
  
  // Atualizar presenças
  atualizarPresentes();
}

// Carregar dados da classe do localStorage
function carregarDadosClasse() {
  if (!classeAtual) return;
  
  // Carregar visitantes
  visitantes = JSON.parse(localStorage.getItem(`visitantes_${classeAtual}`)) || [];
  atualizarListaVisitantes();
  
  // Carregar outros dados
  const dados = JSON.parse(localStorage.getItem(`dados_${classeAtual}`)) || {};
  document.getElementById('revistas').value = dados.revistas || 0;
  document.getElementById('biblias').value = dados.biblias || 0;
  document.getElementById('oferta').value = dados.oferta || '0.00';
}

// Obter presença salva
function obterPresencaSalva(aluno) {
  if (!classeAtual) return false;
  const presencas = JSON.parse(localStorage.getItem(`presencas_${classeAtual}`)) || {};
  return presencas[aluno] || false;
}

// Salvar presenças no localStorage
function salvarPresencas() {
  if (!classeAtual) return;
  
  const presencas = {};
  document.querySelectorAll('.chk-pres').forEach(checkbox => {
    const aluno = checkbox.getAttribute('data-aluno');
    presencas[aluno] = checkbox.checked;
  });
  localStorage.setItem(`presencas_${classeAtual}`, JSON.stringify(presencas));
}

// Atualiza automaticamente
function atualizarPresentes() {
  const checkboxes = document.querySelectorAll(".chk-pres");
  const presentesMarcados = Array.from(checkboxes).filter(chk => chk.checked).length;
  const totalPresentes = presentesMarcados + visitantes.length;
  
  document.getElementById("presentes").value = totalPresentes;
  document.getElementById("visitantes").value = visitantes.length;
  
  salvarPresencas();
}

// Monitora mudanças em presenças
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("chk-pres")) {
    atualizarPresentes();
  }
});

// Função para adicionar visitante
function adicionarVisitante(nome) {
  visitantes.push(nome);
  if (classeAtual) {
    localStorage.setItem(`visitantes_${classeAtual}`, JSON.stringify(visitantes));
  }
  atualizarListaVisitantes();
  atualizarPresentes();
}

// Função para remover visitante
function removerVisitante(index) {
  visitantes.splice(index, 1);
  if (classeAtual) {
    localStorage.setItem(`visitantes_${classeAtual}`, JSON.stringify(visitantes));
  }
  atualizarListaVisitantes();
  atualizarPresentes();
}

// Atualiza a lista de visitantes na interface
function atualizarListaVisitantes() {
  const lista = document.getElementById("lista-visitantes");
  lista.innerHTML = '';
  
  visitantes.forEach((visitante, index) => {
    const item = document.createElement("div");
    item.className = "visitante-item";
    item.innerHTML = `
      <span>${visitante}</span>
      <button class="btn-remover" data-index="${index}">Remover</button>
    `;
    lista.appendChild(item);
  });
  
  // Adiciona eventos aos botões de remover
  document.querySelectorAll(".btn-remover").forEach(btn => {
    btn.addEventListener("click", function() {
      const index = parseInt(this.getAttribute("data-index"));
      removerVisitante(index);
    });
  });
}

// Salvar outros dados no localStorage
document.getElementById('revistas').addEventListener('change', salvarDados);
document.getElementById('biblias').addEventListener('change', salvarDados);
document.getElementById('oferta').addEventListener('change', salvarDados);

function salvarDados() {
  if (!classeAtual) return;
  
  const dados = {
    revistas: document.getElementById('revistas').value,
    biblias: document.getElementById('biblias').value,
    oferta: document.getElementById('oferta').value
  };
  localStorage.setItem(`dados_${classeAtual}`, JSON.stringify(dados));
}

// Função para coletar dados e exportar para Excel
function exportarParaExcel() {
  if (!classeAtual) return;
  
  const dataAtual = new Date().toLocaleDateString("pt-BR");
  const config = configClasses[classeAtual];

  // Coleta as informações do resumo
  const totalMatriculados = document.getElementById("totalMatriculados").value;
  const presentes = document.getElementById("presentes").value;
  const visitantesCount = visitantes.length;
  const revistas = document.getElementById("revistas").value;
  const biblias = document.getElementById("biblias").value;
  const oferta = document.getElementById("oferta").value;

  // Coleta a lista de alunos e presença
  const linhas = [[`${config.nome} - Lista de Alunos`, "Presença"]];
  document.querySelectorAll("#tabelaAlunos tr").forEach(tr => {
    const nome = tr.children[0].innerText;
    const presente = tr.querySelector("input").checked ? "Presente" : "Ausente";
    linhas.push([nome, presente]);
  });

  // Adiciona linha em branco
  linhas.push([]);
  
  // Adiciona a lista de visitantes
  linhas.push(["Visitantes", ""]);
  visitantes.forEach(visitante => {
    linhas.push([visitante, "Presente"]);
  });
  
  // Adiciona o resumo no final
  linhas.push([]);
  linhas.push(["Data", dataAtual]);
  linhas.push(["Classe", config.nome]);
  linhas.push(["Total Matriculados", totalMatriculados]);
  linhas.push(["Presentes", presentes]);
  linhas.push(["Visitantes", visitantesCount]);
  linhas.push(["Revistas", revistas]);
  linhas.push(["Bíblias", biblias]);
  linhas.push(["Oferta (R$)", oferta]);

  // Cria a planilha
  const ws = XLSX.utils.aoa_to_sheet(linhas);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, "Frequência");

  // Nome do arquivo com a data e classe
  const nomeArquivo = `frequencia_${classeAtual}_${dataAtual.replace(/\//g, "-")}.xlsx`;

  // Faz o download
  XLSX.writeFile(wb, nomeArquivo);
  
  // Mostrar modal de confirmação simples
  mostrarModalConfirmacao();
}

// Mostrar modal de confirmação
function mostrarModalConfirmacao() {
  modalConfirmacao.style.display = 'block';
}

// Fechar modal e limpar campos
function fecharModalELimpar() {
  modalConfirmacao.style.display = 'none';
  limparCampos();
}

// Limpar todos os campos para novo registro
function limparCampos() {
  if (!classeAtual) return;
  
  // Limpar checkboxes de presença
  document.querySelectorAll('.chk-pres').forEach(checkbox => {
    checkbox.checked = false;
  });
  
  // Limpar visitantes
  visitantes = [];
  localStorage.removeItem(`visitantes_${classeAtual}`);
  atualizarListaVisitantes();
  
  // Limpar campos numéricos
  document.getElementById('revistas').value = 0;
  document.getElementById('biblias').value = 0;
  document.getElementById('oferta').value = '0.00';
  
  // Limpar dados do localStorage
  localStorage.removeItem(`dados_${classeAtual}`);
  localStorage.removeItem(`presencas_${classeAtual}`);
  
  // Atualizar totais
  atualizarPresentes();
}

// === Exibir data atual no cabeçalho ===
function mostrarDataAtual() {
  const elemento = document.getElementById("dataAtual");
  const hoje = new Date();

  const dataFormatada = hoje.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const diaSemana = dias[hoje.getDay()];

  elemento.textContent = `📅 Data: ${dataFormatada} (${diaSemana})`;
}