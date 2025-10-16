// Configuração das classes
const configClasses = {
  "Jovens": {
    nome: "Jovens por Cristo",
    alunos: [
      "ANA CAROLINA",
      "CLARA REGINA G. DA SILVA",
      "DARLENE ALVES DA SILVA",
      "DOUGLAS SANTOS DA SILVA",
      "FELIPE RACCHANICCI",
      "GERSON BENTO VIEIRA",
      "IAGO AUGUSTO",
      "YOHAN GABRIEL",
      "JÉSSICA GOMES DE OLIVEIRA",
      "JÉSSIKA DE JESUS SANTOS",
      "LUCAS",
      "MARCOS MAIA",
      "MARIANA RODRIGUES TRINDADE",
      "NICOLE LOUZADA DE ALMEIDA",
      "PAMELA",
      "RODRIGO BRASILEIRO",
      "SAMUEL PEREIRA FERREIRA DE LIMA",
      "TIAGO MUSSATO",
      "URIAS RODRIGUES TRINDADE",
      "VALESKA DA SILVA",
      "VITÓRIA KELLY"
    ]
  },
  "Evangelista": {
    nome: "Classe Evangelista",
    alunos: [
      "ALUNO 1 EVANGELISTA",
      "ALUNO 2 EVANGELISTA",
      "ALUNO 3 EVANGELISTA"
      // Adicione os nomes reais aqui
    ]
  },
  "Irmãos": {
    nome: "Classe Irmãos",
    alunos: [
      "Anderson Silva", 
      "Aloisio",
      "Claudio Ferreira",
      "Edson Silva",
      "Denilson Amadeu",
      "Lucio Trindade",
      "Jose Gomes",
      "Rubens Maciel",
      "Josué Viturino",
      "Renato Santos",
      "Sidney Vieira",
      "Adriano Silva"
      // Adicione os nomes reais aqui
    ]
  },
  "Irmãs": {
    nome: "Classe Irmãs", 
    alunos: [
      "Claudia Silva",
      "Ana Beatriz",
      "Fernanda Lima",
      "Juliana Souza",
      "Vanda Silva",
      "Tatiane Oliveira",
      "Esther Gomes",
      "Josefa Santos",
      "Jacira Lima",
      "Marcia Pereira",
      "Sonia Maria",
      "Rosana Silva"
      // Adicione os nomes reais aqui
    ]
  }
};

// Variáveis globais
let classeAtual = null;
let visitantes = [];

// Elementos da página
const paginaSelecao = document.getElementById('pagina-selecao');
const paginaApp = document.getElementById('pagina-app');

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
  // Eventos para seleção de classes
  document.querySelectorAll('.classe-card').forEach(card => {
    card.addEventListener('click', function() {
      const classe = this.getAttribute('data-classe');
      iniciarApp(classe);
    });
  });

  // Evento do botão voltar
  document.getElementById('btnVoltar').addEventListener('click', function(e) {
    e.preventDefault();
    voltarParaSelecao();
  });

  mostrarDataAtual();
});

// Função para iniciar o app com uma classe específica
function iniciarApp(classe) {
  classeAtual = classe;
  const config = configClasses[classe];
  
  if (!config) {
    alert('Classe não encontrada!');
    return;
  }

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
}

// Evento do botão exportar
document.getElementById("btnExportar").addEventListener("click", exportarParaExcel);

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