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
  const visitantes = parseInt(visitantesInput.value) || 0;
  const checkboxes = document.querySelectorAll(".chk-pres");
  const presentesMarcados = Array.from(checkboxes).filter(chk => chk.checked).length;
  const totalPresentes = presentesMarcados + visitantes;
  presentesInput.value = totalPresentes;
}

// Monitora mudanças em presenças e visitantes
document.addEventListener("change", (e) => {
  if (e.target.classList.contains("chk-pres") || e.target.id === "visitantes") {
    atualizarPresentes();
  }
});

// Atualiza ao carregar
window.addEventListener("load", atualizarPresentes);

// Função para coletar dados e exportar para Excel
function exportarParaExcel() {
  const dataAtual = new Date().toLocaleDateString("pt-BR");

  // Coleta as informações do resumo
  const totalMatriculados = document.getElementById("totalMatriculados").value;
  const presentes = document.getElementById("presentes").value;
  const visitantes = document.getElementById("visitantes").value;
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

  // Adiciona o resumo no final
  linhas.push([]);
  linhas.push(["Data", dataAtual]);
  linhas.push(["Total Matriculados", totalMatriculados]);
  linhas.push(["Presentes", presentes]);
  linhas.push(["Visitantes", visitantes]);
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
