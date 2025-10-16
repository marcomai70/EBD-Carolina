// Lista de alunos
const alunos = [
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
];

// Array para armazenar os visitantes
let visitantes = [];

// Monta tabela de presença
const tabela = document.getElementById("tabelaAlunos");
alunos.forEach(aluno => {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${aluno}</td>
    <td><input type="checkbox" class="chk-pres"></td>
  `;
  tabela.appendChild(row);
});

// Elementos de resumo
const totalMatriculadosInput = document.getElementById("totalMatriculados");
const presentesInput = document.getElementById("presentes");
const visitantesInput = document.getElementById("visitantes");

// Atualiza automaticamente
function atualizarPresentes() {
  const checkboxes = document.querySelectorAll(".chk-pres");
  const presentesMarcados = Array.from(checkboxes).filter(chk => chk.checked).length;
  const totalPresentes = presentesMarcados + visitantes.length;
  presentesInput.value = totalPresentes;
  visitantesInput.value = visitantes.length;
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
  atualizarListaVisitantes();
  atualizarPresentes();
}

// Função para remover visitante
function removerVisitante(index) {
  visitantes.splice(index, 1);
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

// Atualiza ao carregar
window.addEventListener("load", function() {
  atualizarPresentes();
  mostrarDataAtual();
});

// Função para coletar dados e exportar para Excel
function exportarParaExcel() {
  const dataAtual = new Date().toLocaleDateString("pt-BR");

  // Coleta as informações do resumo
  const totalMatriculados = document.getElementById("totalMatriculados").value;
  const presentes = document.getElementById("presentes").value;
  const visitantesCount = visitantes.length;
  const revistas = document.getElementById("revistas").value;
  const biblias = document.getElementById("biblias").value;
  const oferta = document.getElementById("oferta").value;

  // Coleta a lista de alunos e presença
  const linhas = [["Nome do Aluno", "Presença"]];
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

  // Nome do arquivo com a data
  const nomeArquivo = `frequencia_${dataAtual.replace(/\//g, "-")}.xlsx`;

  // Faz o download
  XLSX.writeFile(wb, nomeArquivo);
}

// Evento do botão
document.getElementById("btnExportar").addEventListener("click", exportarParaExcel);

// === Exibir data atual no cabeçalho ===
function mostrarDataAtual() {
  const elemento = document.getElementById("dataAtual");
  const hoje = new Date();

  // Formata a data em dd/mm/aaaa
  const dataFormatada = hoje.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  });

  // Descobre o dia da semana
  const dias = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
  const diaSemana = dias[hoje.getDay()];

  elemento.textContent = `📅 Data: ${dataFormatada} (${diaSemana})`;
}