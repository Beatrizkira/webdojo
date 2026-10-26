# 🧪 Webdojo - Testes Automatizados E2E (Cypress)

Este repositório contém a suíte de testes automatizados End-to-End (E2E) para a aplicação **Webdojo**, desenvolvida utilizando o framework [Cypress](https://www.cypress.io/).

---

## 📌 Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas no seu ambiente de desenvolvimento:

* [Node.js](https://nodejs.org/) (Versão recomendada: 18.x ou superior)
* [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
* Navegador suportado pelo Cypress (Google Chrome, Firefox, Edge ou Electron)

---

## 🚀 Instalação e Configuração

1. **Clone o repositório:**
   ```bash
   git clone <URL_DO_REPOSITORIO>
   cd webdojo
   ```

2. **Instale as dependências do projeto:**
   ```bash
   npm install
   ```

---

## 🛠️ Executando a Aplicação e os Testes

Como a aplicação Webdojo reside no mesmo repositório, é necessário executar o servidor local antes ou simultaneamente à execução dos testes.

### 1. Iniciar a aplicação localmente
Para subir o servidor local da aplicação Webdojo na porta 3000:
```bash
npm run dev
```
> **Nota:** Mantenha este terminal ativo para que a aplicação continue rodando em `http://localhost:3000`.

---

### 2. Executar os Testes Automatizados

Abaixo estão os scripts de execução configurados no `package.json`:

| Script | Descrição |
| :--- | :--- |
| `npm run dev` | Inicia o servidor local da aplicação em `http://localhost:3000`. |
| `npm run test` | Executa **todos** os testes E2E em modo *headless* (viewport: 1440x900). |
| `npm run teste:ui` | Abre a interface gráfica (*Test Runner*) do Cypress para execução interativa. |
| `npm run test:login` | Executa apenas a suíte de **login** em desktop (`viewportWidth=1440, viewportHeight=900`). |
| `npm run test:login:mobile` | Executa a suíte de **login** simulando ambiente **mobile** (`viewportWidth=375, viewportHeight=667`). |

#### Exemplos de Execução:

* **Modo Interativo (UI):**
  ```bash
  npm run teste:ui
  ```

* **Execução Headless Completa (Desktop):**
  ```bash
  npm run test
  ```

* **Execução Headless da funcionalidade de Login (Desktop):**
  ```bash
  npm run test:login
  ```

* **Execução Headless da funcionalidade de Login (Mobile):**
  ```bash
  npm run test:login:mobile
  ```

---

## 📁 Estrutura do Projeto

A estrutura de arquivos e pastas dentro de `cypress/` está organizada da seguinte maneira:

```text
web/
└── cypress/
    ├── e2e/                     # Arquivos de especificações de testes (.cy.js)
    ├── fixtures/                # Dados estáticos/massa de dados para os testes (JSON, imagens, etc.)
    └── support/                 # Arquivos de suporte, reuso e comandos customizados
        ├── actions/             # Funções de ação reutilizáveis para fluxos de telas
        │   ├── consultancy.actions.js
        │   └── utils.js         # Métodos utilitários e rotinas auxiliares
        ├── commands.js          # Comandos customizados do Cypress (Cypress.Commands.add)
        └── e2e.js               # Arquivo global importado antes dos testes de e2e
```

### Detalhamento da Estrutura:
* **`cypress/e2e/`**: Contém todos os cenários de teste automatizados da aplicação.
* **`cypress/fixtures/`**: Armazena dados fixos em JSON ou arquivos mockados para interceptação de requisições de API e suporte aos testes.
* **`cypress/support/actions/`**: Agrupa os arquivos de ações encapsuladas (métodos reutilizáveis) para manipulação dos componentes de tela.
* **`cypress/support/commands.js`**: Utilizado para criar ou sobrescrever comandos nativos do Cypress (`cy.<comando>`).
* **`cypress/support/e2e.js`**: Arquivo de inicialização global executado antes de cada especificação de teste.

---

## 📄 Licença

Este projeto é de uso interno e educacional/profissional no contexto da aplicação Webdojo.