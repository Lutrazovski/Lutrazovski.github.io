# 🎨 Portfólio - Documentação do Site

Um portfólio moderno e responsivo que carrega automaticamente seus repositórios do GitHub e permite que visitantes enviem mensagens.

---

## 📂 Estrutura de Arquivos

```
Core Engine/
├── index.html          # Arquivo principal (estrutura HTML)
├── css/
│   └── style.css      # Estilos (tema escuro, layout, animações)
├── js/
│   └── script.js      # Lógica JavaScript (GitHub API, formulário)
├── assets/
│   └── img/           # Pasta para sua foto de perfil
└── .gitignore         # Arquivos a ignorar no Git
```

---

## 🏗️ Como Funciona

### 1. **index.html** - Estrutura do Site

Contém todas as seções do portfólio:

- **Navbar**: Menu de navegação fixa no topo
- **Hero Section**: Banner de boas-vindas com seu nome (roxo gradiente)
- **Sobre Mim**: Foto de perfil + 3 parágrafos sobre você
- **Minhas Skills**: 4 cards com suas habilidades (Frontend, Backend, BD, Ferramentas)
- **Meus Projetos**: Grid que carrega repositórios do GitHub automaticamente
- **Entre em Contato**: Formulário para receber mensagens + links de redes sociais
- **Footer**: Rodapé com copyright

#### Informações que você pode editar:
```html
<h1>Olá, eu sou Gustavo, um Desenvolvedor</h1>  <!-- Seu nome -->
<p>Sou um desenvolvedor apaixonado...</p>         <!-- Sua descrição -->
<a href="mailto:Lutrazovski@gmail.com">          <!-- Seu email -->
<a href="https://github.com/Lutrazovski">        <!-- Seu GitHub -->
```

---

### 2. **css/style.css** - Visual e Design

Define todas as cores, fontes e animações:

#### Cores principais:
- **Roxo claro**: `#c792f1` (headers, botões)
- **Roxo escuro**: `#52079c` (gradientes)
- **Fundo**: `#0f0f0f` (muito preto)
- **Cards**: `#1a1a1a` (preto um pouco mais claro)
- **Texto**: `#e0e0e0` (cinza claro)

#### O que está estilizado:
- **Navbar**: Fixa no topo, escura, fica com sombra ao rolar
- **Hero Section**: Gradiente roxo com animações de entrada
- **Cards de Skills**: Fundo escuro, bordas roxas, hover com elevation
- **Cards de Projetos**: Mostram linguagem e stars do GitHub, roxo no hover
- **Formulário**: Inputs escuros, botão roxo que muda ao hover
- **Responsividade**: Adapta para celular, tablet e desktop

#### Animações:
```css
@keyframes slideInDown   /* Título desce suavemente */
@keyframes slideInUp     /* Conteúdo sobe suavemente */
@keyframes fadeIn        /* Fade de opacidade */
```

---

### 3. **js/script.js** - Lógica e Funcionalidades

Faz as coisas dinâmicas funcionarem:

#### A. **Carregar Repositórios do GitHub**
```javascript
const GITHUB_USERNAME = 'Lutrazovski';  // ← Seu username
```
- Busca seus 6 últimos repositórios na API do GitHub
- Remove forks (repositórios copiados)
- Mostra: nome, descrição, linguagem, número de stars
- Cada card tem link direto para o repo no GitHub

Como funciona:
1. Página carrega
2. JavaScript faz requisição para `api.github.com/users/Lutrazovski/repos`
3. GitHub retorna dados dos seus repos
4. JavaScript renderiza cards HTML com as informações
5. As cards aparecem na seção "Meus Projetos"

#### B. **Formulário de Contato**
Quando alguém enche e envia o formulário:
1. Valida se todos os campos estão preenchidos
2. Mostra "Enviando..." no botão
3. Envia dados para **Formspree** (`https://formspree.io/f/xjgplbkk`)
4. Se sucesso: aviso "Mensagem enviada com sucesso!"
5. Se erro: aviso "Erro ao enviar. Tente novamente."
6. Limpa o formulário

Os dados do email chegam em: **Lutrazovski@gmail.com**

#### C. **Menu Mobile**
Quando clica em um link do menu em celular, fecha automaticamente

#### D. **Scroll Suave**
Links internos (`<a href="#sobre">`) scrollam suavemente até a seção

#### E. **Efeito na Navbar**
Quando rola a página para baixo, a navbar fica com sombra

---

## 🎯 Fluxograma de Funcionamento

```
┌──────────────────────────────────────┐
│    Visitante abre o site             │
│  (http://localhost:8000 ou GitHub)   │
└──────────────┬───────────────────────┘
               ↓
┌──────────────────────────────────────┐
│  index.html carrega HTML + CSS       │
│  script.js começa a executar         │
└──────────────┬───────────────────────┘
               ↓
┌──────────────────────────────────────┐
│  JavaScript faz 2 coisas:            │
│  1. Carrega repos do GitHub          │
│  2. Configura formulário de contato  │
└──────────────┬───────────────────────┘
               ↓
    ┌──────────┴──────────┐
    ↓                     ↓
┌─────────────────┐   ┌──────────────────┐
│ GitHub API      │   │ Visitante interage│
│ retorna repos   │   │ com o site       │
│ (JSON)          │   │                  │
└────────┬────────┘   └────────┬─────────┘
         ↓                     ↓
    ┌─────────────────────────────────┐
    │ JavaScript renderiza cards de   │
    │ repositórios no HTML            │
    └────────┬────────────────────────┘
             ↓
    ┌─────────────────────────────────┐
    │ Cards aparecem na página        │
    │ com links para GitHub           │
    └─────────────────────────────────┘

    ┌─────────────────────────────────┐
    │ Se clica em "Enviar Mensagem"   │
    └────────┬────────────────────────┘
             ↓
    ┌─────────────────────────────────┐
    │ JavaScript valida + envia para  │
    │ Formspree (/f/xjgplbkk)         │
    └────────┬────────────────────────┘
             ↓
    ┌─────────────────────────────────┐
    │ Email chega no Lutrazovski@...  │
    │ + Formspree armazena mensagem   │
    └─────────────────────────────────┘
```

---

## 🔧 Customizações Principais

### Trocar Username GitHub
Abra `js/script.js` e altere:
```javascript
const GITHUB_USERNAME = 'Lutrazovski';  // Mude para seu username
```

### Editar Sua Descrição
Abra `index.html` e procure por:
```html
<p class="lead mb-3">Sou um desenvolvedor apaixonado...</p>
```
Substitua pelo seu texto.

### Adicionar Foto
1. Coloque uma imagem `profile.png` em `assets/img/`
2. Ela aparecerá na seção "Sobre Mim"

### Mudar Email de Contato
Em `index.html`, procure por:
```html
<a href="mailto:Lutrazovski@gmail.com">
```
Mude para seu email.

### Mudar Cores
Em `css/style.css`, procure por `:root`:
```css
:root {
    --primary-color: #c792f1;  /* Roxo claro */
    --success-color: #198754;  /* Verde */
    --danger-color: #dc3545;   /* Vermelho */
}
```
Altere as cores em hexadecimal (#RRGGBB).

---

## 📱 Responsividade

O site funciona em:
- ✅ **Desktop** (1200px+): Layout completo com sidebar
- ✅ **Tablet** (768px-1199px): 2 colunas, cards ajustados
- ✅ **Celular** (até 767px): 1 coluna, menu retrátil, fonte menor

As mudanças acontecem automaticamente via `@media queries` no CSS.

---

## 🌐 Tecnologias Usadas

| Tecnologia | Para quê |
|-----------|----------|
| **HTML5** | Estrutura do site |
| **CSS3** | Estilos e animações |
| **JavaScript** | Lógica interativa |
| **Bootstrap 5** | Framework CSS (via CDN) |
| **Font Awesome** | Ícones (via CDN) |
| **GitHub API** | Carregar repositórios |
| **Formspree** | Receber emails |

---

## 🚀 Como Usar

### Testar Localmente
```powershell
cd "c:\Users\lutra\OneDrive\Área de Trabalho\Codes\Core Engine"
python -m http.server 8000
```
Depois abra: `http://localhost:8000`

### Deploy no GitHub Pages
1. Crie repositório chamado `Lutrazovski.github.io` no GitHub
2. Clone: `git clone https://github.com/Lutrazovski/Lutrazovski.github.io.git`
3. Copie os arquivos (index.html, css/, js/, assets/)
4. Faça push: `git push origin main`
5. Seu site estará em: `https://Lutrazovski.github.io`

---

## ⚡ Performance

- ✅ Sem dependências locais (tudo via CDN)
- ✅ GitHub API é grátis
- ✅ Formspree permite até 50 emails/mês grátis
- ✅ Carregamento otimizado com animações CSS

---

## 🐛 Troubleshooting

| Problema | Solução |
|----------|---------|
| Repositórios não aparecem | Verifique se `GITHUB_USERNAME` está correto em `js/script.js` |
| Email não chega | Verifique SPAM e configure notificações no Formspree |
| Site lento | Limpe cache do navegador (Ctrl+Shift+Del) |
| Menu não funciona | Verifique se JavaScript está ativado no navegador |

---

## 📞 Resumo de Configuração

**Seu website está configurado para:**
- ✅ Username GitHub: `Lutrazovski`
- ✅ Email: `Lutrazovski@gmail.com`
- ✅ Email de formulário: Formspree (`xjgplbkk`)
- ✅ Tema: Roxo + escuro
- ✅ Responsividade: Mobile-first

**Você pode editar:**
1. Nome e descrição → `index.html`
2. Cores → `css/style.css`
3. Funcionalidades → `js/script.js`
4. Foto → `assets/img/profile.png`

---

Seu portfólio está **pronto para rodar** e **100% funcional**! 🚀
