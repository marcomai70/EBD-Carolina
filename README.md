# 📖 Sistema de Frequência – Escola Bíblica Dominical (EBD)

Aplicação web simples e funcional desenvolvida para registrar a presença dos alunos da Escola Bíblica Dominical (EBD), bem como informações complementares de cada domingo (visitantes, revistas, Bíblias e ofertas).
Os relatórios são armazenados localmente e podem ser exportados para **Excel (XLSX)** ou **CSV** para análise trimestral.

---

## 🚀 Funcionalidades principais

* ✅ Registro de presença individual por aluno (checkbox)
* 🔢 Contagem automática de presentes e visitantes
* 🕒 Definição automática da data para o próximo domingo
* 💾 Armazenamento local de relatórios (LocalStorage)
* 📊 Exportação dos dados para **Excel (XLSX)** e **CSV**
* 🗂️ Histórico de domingos registrados
* ✏️ Campos adicionais:

  * Total de matriculados
  * Presentes
  * Visitantes
  * Revistas
  * Bíblias
  * Oferta (R$)

---

## 🧩 Estrutura do projeto

```
projetoPiloto/
│
├── index.html          # Página principal
├── style.css           # Estilos visuais
├── script.js           # Lógica do sistema
├── alunos.json         # (Opcional) Lista de alunos
├── README.md           # Este arquivo
└── /assets             # Imagens e ícones
```

---

## 🧰 Tecnologias utilizadas

* **HTML5**
* **CSS3**
* **JavaScript Puro (Vanilla JS)**
* **LocalStorage API**
* **SheetJS (xlsx)** – para exportar para planilha Excel

---

## 🧮 Como usar

1. Acesse a aplicação (pelo navegador desktop ou celular).
2. Marque a presença dos alunos com os checkboxes.
3. Preencha os campos:

   * Visitantes
   * Revistas
   * Bíblias
   * Oferta (R$)
4. O total de **presentes** será atualizado automaticamente.
5. Clique em **Salvar relatório** — os dados ficam guardados localmente.
6. Vá em **Exportar Excel/CSV** para gerar o arquivo trimestral.

---

## 💾 Exportar relatórios para Excel

A aplicação gera um arquivo `.xlsx` ou `.csv` contendo:

* Data
* Classe
* Trimestre
* Quantidades (presentes, visitantes, revistas, bíblias, oferta)
* Lista completa de alunos e presença individual

O arquivo será baixado automaticamente e pode ser aberto no Excel, Google Sheets ou LibreOffice.

---

## 🌐 Publicar no GitHub Pages

1. Suba o projeto no GitHub (branch `main`).
2. Vá em **Settings → Pages**.
3. Escolha:

   * Branch: `main`
   * Folder: `/ (root)`
4. Clique em **Save**.
5. Acesse a URL gerada:

   ```
   https://<seu-usuario>.github.io/<nome-do-repo>/
   ```

---

## 👨‍💻 Autor

**Marcos Antonio Maia**
Analista de QA | Desenvolvedor Front-end
📧 [bateramarcomai@hotmail.com](mailto:bateramarcomai@hotmail.com)

---

## 🏷️ Licença

Este projeto é de uso livre para fins educacionais e ministeriais.
Distribuição e adaptações são permitidas mediante citação do autor original.
