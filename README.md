# EasyRecipe Frontend

Aplicacao web moderna para busca e descoberta de receitas, construida com React e Vite.

## Funcionalidades

- Buscar receitas por nome
- Navegar por receitas por categoria
- Visualizar informacoes detalhadas com ingredientes e instrucoes
- Receita do Dia
- Videos do YouTube integrados
- Design responsivo

## Tecnologias

- **Framework**: React 19
- **Build Tool**: Vite
- **Roteamento**: React Router DOM
- **Estilizacao**: CSS

## Requisitos

- Node.js 18+
- npm ou yarn

## Instalacao

1. Clone o repositorio:
```bash
gh repo clone alexandre-canellas/receita-facil-front
cd receita-facil-front
```

2. Instale as dependencias:
```bash
npm install
```

3. (Opcional) Crie um arquivo `.env` para configurar a URL da API:
```env
VITE_API_URL=http://localhost:8000
```

## Executando a Aplicacao

### Desenvolvimento

Inicie o servidor de desenvolvimento com hot reload:
```bash
npm run dev
```

A aplicacao estara disponivel em `http://localhost:5173`.

### Build de Producao

Crie o build de producao:
```bash
npm run build
```

Visualize o build de producao:
```bash
npm run preview
```

### Linting

Execute o ESLint para verificar a qualidade do codigo:
```bash
npm run lint
```

## Estrutura do Projeto

```
receita-facil-front/
├── public/
├── src/
│   ├── api/
│   │   └── api.js           # Funcoes de servico da API
│   ├── components/
│   │   ├── Header.jsx       # Cabecalho de navegacao
│   │   ├── Header.css
│   │   ├── SearchBar.jsx    # Componente de busca
│   │   ├── SearchBar.css
│   │   ├── RecipeCard.jsx   # Card de receita
│   │   ├── RecipeCard.css
│   │   ├── CategoryList.jsx # Filtro de categorias
│   │   └── CategoryList.css
│   ├── pages/
│   │   ├── Home.jsx         # Pagina inicial com busca e categorias
│   │   ├── Home.css
│   │   ├── RecipeDetailPage.jsx  # Pagina de detalhes da receita
│   │   ├── RecipeDetailPage.css
│   │   ├── FavoritesPage.jsx     # Pagina de favoritos
│   │   ├── ShoppingPage.jsx      # Pagina de lista de compras
│   │   └── PlaceholderPage.css
│   ├── App.jsx              # App principal com roteamento
│   ├── App.css
│   ├── main.jsx             # Ponto de entrada da aplicacao
│   └── index.css            # Estilos globais
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Integracao com a API

O frontend se comunica com a API EasyRecipe. Certifique-se de que a API esteja rodando antes de iniciar o frontend.

URL padrao da API: `http://localhost:8000`

Para usar uma URL diferente, configure a variavel de ambiente `VITE_API_URL`.

## Scripts Disponiveis

| Comando | Descricao |
|---------|-----------|
| `npm run dev` | Iniciar servidor de desenvolvimento |
| `npm run build` | Build para producao |
| `npm run preview` | Visualizar build de producao |
| `npm run lint` | Executar ESLint |

## Navegadores Suportados

A aplicacao suporta todos os navegadores modernos:
- Chrome (ultima versao)
- Firefox (ultima versao)
- Safari (ultima versao)
- Edge (ultima versao)

## Licenca

MIT
