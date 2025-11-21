# Acervo de Filmes - Frontend

Interface web para gerenciamento de filmes assistidos desenvolvida com TypeScript, HTML5 e CSS3.

## 👥 Componentes do Grupo

- Gustavo Riedel 2210375
- Rodrigo Kauer 211

## 📝 Descrição do Projeto

O Acervo de Filmes Frontend é uma aplicação web Single Page Application (SPA) que permite aos usuários gerenciar sua coleção pessoal de filmes assistidos. A aplicação oferece uma interface intuitiva e responsiva para todas as operações de cadastro de usuários, autenticação e gerenciamento de filmes.

### Escopo do Sistema

- **Autenticação Completa**: Login, registro, troca de senha e recuperação de senha
- **CRUD Completo de Filmes**: Criar, listar, editar e deletar filmes
- **Interface Responsiva**: Design moderno e profissional
- **Gerenciamento de Sessão**: Token-based authentication com localStorage
- **Isolamento de Dados**: Cada usuário visualiza apenas seus próprios filmes

## 🚀 Tecnologias Utilizadas

### Frontend
- **TypeScript** (compilado para ES2018)
- **HTML5** (semântico)
- **CSS3** (com flexbox e grid)
- **Fetch API** (comunicação com backend)
- **LocalStorage** (armazenamento de tokens)
- **AMD Modules** (sistema de módulos)

### Ferramentas de Desenvolvimento
- **TypeScript Compiler** (tsc)
- **NPM** (gerenciador de pacotes)

## 📦 Como Instalar

### Pré-requisitos

- Node.js e npm instalados (para compilar TypeScript)
- Backend da API rodando em http://127.0.0.1:8000/

### Passo 1: Clone o repositório

```bash
git clone https://github.com/guguriedel/FRONT-1407.git
cd AcervoAPP
```

### Passo 2: Instale as dependências

```bash
npm install
```

Isso instalará o TypeScript necessário para compilar o código.

### Passo 3: Compile o TypeScript

```bash
npx tsc
```

Isso irá compilar todos os arquivos `.ts` da pasta `src/` para JavaScript na pasta `public/js/`.

### Passo 4: Configure a URL do backend

Abra o arquivo `src/constantes.ts` e verifique se a URL do backend está correta:

```typescript
export const backendAddress = "http://127.0.0.1:8000/";
```

Se você publicou o backend em outro endereço, atualize essa constante e recompile com `npx tsc`.

### Passo 5: Abra no navegador

#### Opção 1: Servidor Local Simples (Recomendado)

Usando Python:
```bash
cd public
python -m http.server 5000
```

Acesse: **http://localhost:5000/login.html**

Usando Node.js (npx http-server):
```bash
npx http-server public -p 5000
```

Acesse: **http://localhost:8080/login.html**

#### Opção 2: Abrir Diretamente

Você também pode abrir o arquivo `public/login.html` diretamente no navegador, mas alguns navegadores podem ter restrições de CORS.

## 🌐 Links

- **Frontend Local**: http://localhost:8080/
- **Backend API**: http://127.0.0.1:8000/
- **Swagger Backend**: http://127.0.0.1:8000/swagger/
- **Frontend Publicado**: https://guguriedel.pythonanywhere.com/
- **Backend Publicado**: 

## 📖 Manual do Usuário

### Primeiro Acesso

1. **Acesse a página de login**: Abra `login.html` no seu navegador
2. **Não tem conta?** Clique em "Cadastre-se aqui"
3. **Preencha o formulário de registro**:
   - Nome de usuário (obrigatório)
   - Email (obrigatório)
   - Primeiro nome e sobrenome (opcional)
   - Senha e confirmação de senha (obrigatório)
4. **Clique em "Cadastrar"**
5. **Você será automaticamente logado e redirecionado** para a página principal

### Login

1. Na página de login, digite seu **usuário** e **senha**
2. Clique em **"Entrar"**
3. Você será redirecionado para o dashboard de filmes

### Esqueci Minha Senha

1. Na página de login, clique em **"Esqueci minha senha"**
2. Digite seu **email cadastrado**
3. Clique em **"Solicitar Reset de Senha"**
4. Um token será gerado (em produção seria enviado por email)
5. **Copie o token** exibido na tela
6. Clique em **"Clique aqui para usar o token"**
7. Cole o token e digite sua **nova senha**
8. Clique em **"Resetar Senha"**
9. Faça login com a nova senha

### Dashboard Principal

#### Adicionar Filme

1. No topo da página, preencha o formulário:
   - **Nome do Filme**: Ex: "Matrix"
   - **Data que Viu**: Selecione a data
   - **Nota**: 0 a 10 (pode usar decimal, ex: 8.5)
   - **Duração**: Em minutos
2. Clique em **"Adicionar Filme"**
3. O filme aparecerá na tabela abaixo

#### Visualizar Filmes

- Todos os seus filmes aparecem na tabela automaticamente
- A tabela mostra: Nome, Data, Nota, Duração e Ações

#### Editar Filme

1. Na coluna **"Ações"**, clique no botão **"Editar"** (azul)
2. Um modal se abrirá com os dados do filme
3. **Modifique** os campos desejados
4. Clique em **"Salvar Alterações"**
5. O modal fechará e a tabela será atualizada

#### Deletar Filme

1. Na coluna **"Ações"**, clique no botão **"Deletar"** (vermelho)
2. Confirme a exclusão no alerta que aparece
3. O filme será removido da tabela

#### Trocar Senha

1. No header, clique no botão **"Trocar Senha"**
2. Digite sua **senha atual**
3. Digite a **nova senha** e confirme
4. Clique em **"Alterar Senha"**
5. Você receberá um novo token e será redirecionado

#### Logout

1. No header, clique no botão **"Sair"**
2. Você será deslogado e redirecionado para a tela de login


## ✅ O Que Funcionou

### Funcionalidades Testadas e Aprovadas

1. ✅ **Sistema de Login**
   - Login funciona corretamente
   - Token é armazenado no localStorage
   - Redirecionamento automático após login

2. ✅ **Registro de Usuários**
   - Novos usuários podem se cadastrar
   - Validação de senha coincidente no frontend
   - Registro automático faz login após cadastro

3. ✅ **Proteção de Rotas**
   - Usuários não autenticados são redirecionados para login
   - Token é verificado em todas as páginas protegidas

4. ✅ **CRUD Completo de Filmes**
   - **CREATE**: Adicionar novos filmes funciona perfeitamente
   - **READ**: Lista de filmes é carregada automaticamente
   - **UPDATE**: Modal de edição funciona, campos são pré-preenchidos
   - **DELETE**: Confirmação de exclusão e remoção funcionam

5. ✅ **Gerenciamento de Senha**
   - Troca de senha para usuários autenticados funciona
   - Reset de senha com token funciona
   - Validação de senha coincidente funciona

6. ✅ **Interface e Navegação**
   - Header com botões de navegação funciona
   - Links entre páginas funcionam corretamente
   - CSS responsivo e moderno aplicado
   - Modal de edição abre e fecha corretamente

7. ✅ **Validações Frontend**
   - Campos obrigatórios são validados
   - Validação de email no HTML5
   - Validação de números (nota 0-10)
   - Mensagens de erro são exibidas adequadamente

8. ✅ **Persistência de Sessão**
   - Token persiste entre recarregamentos de página
   - Logout remove o token corretamente

9. ✅ **Comunicação com Backend**
   - Todas as requisições HTTP funcionam
   - Headers de autorização são enviados corretamente
   - Tratamento de erros HTTP (401, 404, etc.)

10. ✅ **TypeScript**
    - Código TypeScript compila sem erros
    - Tipos estão corretos
    - Source maps gerados para debug

## ❌ O Que Não Funcionou


### Limitações Conhecidas

1. **Design Simples**: Embora funcional e profissional, não usa frameworks CSS como Bootstrap (por escolha de manter vanilla CSS)

2. **Validação Limitada**: Algumas validações complexas são feitas apenas no backend

3. **Sem Paginação**: Se o usuário tiver muitos filmes, todos serão carregados de uma vez (poderia ter paginação)

4. **Sem Loading States**: Não há spinners de carregamento durante requisições (UX poderia ser melhorada)

5. **Reset de Senha**: Token é exibido na tela em vez de ser enviado por email (limitação do backend em desenvolvimento)

## 🔧 Compilação e Desenvolvimento

### Estrutura do Projeto

```
AcervoAPP/
├── src/                    # Código-fonte TypeScript
│   ├── app.ts             # Entry point (não usado diretamente)
│   ├── constantes.ts      # Constantes (URL do backend)
│   ├── index.ts           # Dashboard principal
│   ├── login.ts           # Página de login
│   ├── register.ts        # Página de registro
│   ├── change-password.ts # Troca de senha
│   ├── forgot-password.ts # Esqueci senha
│   └── reset-password.ts  # Reset de senha
├── public/                # Arquivos públicos (servidos)
│   ├── index.html         # Dashboard principal
│   ├── login.html         # Página de login
│   ├── register.html      # Página de registro
│   ├── change-password.html
│   ├── forgot-password.html
│   ├── reset-password.html
│   └── js/                # JavaScript compilado
│       ├── app.js         # Bundle JavaScript (32KB)
│       └── app.js.map     # Source map
├── tsconfig.json          # Configuração TypeScript
├── package.json           # Dependências npm
└── node_modules/          # Módulos instalados
```

### Comandos Úteis

**Compilar TypeScript:**
```bash
npx tsc
```

**Compilar em modo watch (recompila ao salvar):**
```bash
npx tsc --watch
```

**Limpar e recompilar:**
```bash
rm -rf public/js/*
npx tsc
```

### Configuração do TypeScript (tsconfig.json)

- **Target**: ES2018
- **Module System**: AMD (todos os módulos em um único arquivo)
- **Output**: `public/js/app.js` (bundle único)
- **Source Maps**: Habilitados para debug
- **Strict Mode**: Habilitado (máxima segurança de tipos)


### Preparação para Deploy

1. **Atualize a URL do backend** em `src/constantes.ts`:
   ```typescript
   export const backendAddress = "https://backend.com/";
   ```

2. **Recompile**:
   ```bash
   npx tsc
   ```

3. **Faça upload apenas da pasta `public/`**

---

**Desenvolvido como parte do trabalho de Programação para Web - PUC 2025/2**
