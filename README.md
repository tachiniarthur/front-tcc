# 🛍️ Essence — Front-end

Front-end do projeto **Essence**, desenvolvido com **Vue 3**, **Vite**, **Tailwind CSS** e **Pinia**. Este é o trabalho de conclusão de curso (TCC).

---

## 📋 Pré-requisitos

Antes de começar, você precisa ter instalado na sua máquina:

- **Git** — para clonar o repositório
- **Node.js** (versão 20.19+ ou 22.12+) — ambiente de execução JavaScript
- **npm** — gerenciador de pacotes (já vem junto com o Node.js)

### 1. Instalando o Git

**Windows:**

1. Acesse [https://git-scm.com/downloads](https://git-scm.com/downloads) e baixe o instalador para Windows.
2. Execute o instalador e siga as instruções (pode deixar tudo padrão).
3. Após instalar, abra o **Git Bash** ou o **Prompt de Comando** e verifique:
   ```sh
   git --version
   ```

**Linux (Ubuntu/Debian):**

```sh
sudo apt update
sudo apt install git
```

**macOS:**

```sh
brew install git
```

### 2. Instalando o Node.js e npm

A maneira mais fácil é baixar direto do site oficial:

1. Acesse [https://nodejs.org](https://nodejs.org) e baixe a versão **LTS** (recomendada).
2. Execute o instalador e siga as instruções.
3. Após a instalação, abra o terminal e verifique se deu tudo certo:
   ```sh
   node --version
   npm --version
   ```
   O Node.js deve retornar a versão `20.19+` ou `22.12+` e o npm a versão `10+`.

> **💡 Alternativa:** Se preferir, você pode usar o [nvm (Node Version Manager)](https://github.com/nvm-sh/nvm) para gerenciar múltiplas versões do Node.js:
>
> ```sh
> # Instalar o nvm (Linux/macOS)
> curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
>
> # Instalar a versão recomendada do Node.js
> nvm install 22
> nvm use 22
> ```

---

## 🚀 Passo a passo para rodar o projeto

### 1. Clonar o repositório

Abra o terminal e execute:

```sh
git clone https://github.com/tachiniarthur/front-tcc.git
```

Entre na pasta do projeto:

```sh
cd front-tcc
```

### 2. Instalar as dependências

Dentro da pasta do projeto, execute:

```sh
npm install
```

Esse comando vai baixar todas as bibliotecas necessárias (Vue, Vite, Tailwind CSS, Pinia, Axios, etc.) listadas no `package.json`.

### 3. Configurar as variáveis de ambiente

O projeto usa um arquivo `.env` na raiz para definir a URL da API back-end. Verifique se o arquivo `.env` já existe, caso contrário, crie um:

```sh
cp .env.example .env
```

Ou crie manualmente o arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```properties
VITE_API_URL=http://localhost:8000/api
```

> **⚠️ Importante:** A variável `VITE_API_URL` aponta para o back-end da aplicação. Se o back-end estiver rodando em outra porta ou endereço, altere o valor conforme necessário.

### 4. Rodar o projeto em modo de desenvolvimento

```sh
npm run dev
```

Após executar, o terminal vai mostrar algo como:

```
  VITE v7.x.x  ready in XXX ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: http://xxx.xxx.xxx.xxx:5173/
```

Abra o navegador e acesse **[http://localhost:5173](http://localhost:5173)** para ver a aplicação rodando. 🎉

---

## 📦 Outros comandos úteis

### Compilar para produção

Gera os arquivos otimizados na pasta `dist/`:

```sh
npm run build
```

### Pré-visualizar o build de produção

Após rodar o `npm run build`, você pode pré-visualizar o resultado:

```sh
npm run preview
```

### Verificar e corrigir código com ESLint

```sh
npm run lint
```

### Formatar código com Prettier

```sh
npm run format
```

---

## 🛠️ Tecnologias utilizadas

| Tecnologia                                 | Descrição                                                      |
| ------------------------------------------ | -------------------------------------------------------------- |
| [Vue 3](https://vuejs.org/)                | Framework JavaScript progressivo para construção de interfaces |
| [Vite](https://vite.dev/)                  | Build tool rápido para desenvolvimento front-end               |
| [Tailwind CSS 4](https://tailwindcss.com/) | Framework CSS utilitário                                       |
| [Pinia](https://pinia.vuejs.org/)          | Gerenciamento de estado para Vue                               |
| [Vue Router](https://router.vuejs.org/)    | Roteamento para aplicações Vue                                 |
| [Axios](https://axios-http.com/)           | Cliente HTTP para fazer requisições à API                      |
| [Font Awesome](https://fontawesome.com/)   | Biblioteca de ícones                                           |
| [FilePond](https://pqina.nl/filepond/)     | Componente de upload de arquivos                               |

---

## 🗂️ Estrutura do projeto

```
front-tcc/
├── public/                  # Arquivos públicos estáticos
├── src/
│   ├── assets/              # CSS e recursos estáticos
│   ├── components/          # Componentes reutilizáveis
│   │   ├── auth/            # Componentes de autenticação
│   │   └── home/            # Componentes da página inicial
│   ├── pages/               # Páginas da aplicação
│   │   ├── admin/           # Páginas administrativas
│   │   ├── auth/            # Páginas de login/cadastro
│   │   ├── checkout/        # Página de checkout
│   │   ├── home/            # Página inicial
│   │   ├── orders/          # Página de pedidos
│   │   ├── products/        # Páginas de produtos
│   │   └── profile/         # Página de perfil
│   ├── services/            # Serviços de comunicação com a API
│   │   └── internal/        # Serviços internos (Auth, Cart, Order, Product)
│   ├── stores/              # Stores do Pinia (auth, cart, ui)
│   ├── App.vue              # Componente raiz
│   ├── fontawesome.js       # Configuração dos ícones
│   ├── main.js              # Ponto de entrada da aplicação
│   └── router.js            # Configuração das rotas
├── .env                     # Variáveis de ambiente
├── index.html               # HTML principal
├── package.json             # Dependências e scripts
├── vite.config.js           # Configuração do Vite
└── eslint.config.js         # Configuração do ESLint
```

---

## 💻 IDE recomendada

- [Visual Studio Code](https://code.visualstudio.com/) com a extensão [Vue - Official (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.volar)

> **⚠️** Se você tiver a extensão **Vetur** instalada, desative-a para evitar conflitos com o Volar.

---

## ❓ Problemas comuns

### `npm install` dá erro de versão do Node.js

Certifique-se de que está usando Node.js na versão **20.19+** ou **22.12+**. Verifique com `node --version`.

### A página abre mas não carrega dados

O back-end precisa estar rodando. Verifique se a variável `VITE_API_URL` no arquivo `.env` está apontando para o endereço correto da API.

### Porta 5173 já está em uso

O Vite automaticamente tenta a próxima porta disponível. Caso queira especificar uma porta, rode:

```sh
npm run dev -- --port 3000
```
