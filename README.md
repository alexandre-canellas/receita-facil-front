# ReceitaFacil Frontend

Aplicacao web moderna para busca e descoberta de receitas, construida com React e Vite.
Permite buscar receitas, salvar favoritos e gerenciar lista de compras.

## Funcionalidades

### Busca de Receitas
- Buscar receitas por nome
- Navegar por categorias (Beef, Chicken, Dessert, etc.)
- Visualizar receita do dia (aleatoria)
- Ver detalhes completos com ingredientes e instrucoes
- Videos do YouTube integrados

### Favoritos
- Adicionar/remover receitas dos favoritos
- Visualizar lista de receitas favoritas
- Indicador visual de receita favorita

### Lista de Compras
- Adicionar ingredientes de uma receita com um clique
- Adicionar itens manualmente
- Marcar itens como comprados
- Remover itens individualmente
- Limpar lista completa
- Copiar lista para clipboard
- Itens agrupados por receita de origem

### Interface
- Design responsivo (mobile-friendly)
- Feedback visual de acoes (loading, sucesso, erro)
- Navegacao intuitiva

## Tecnologias

- **Framework**: React 19
- **Build Tool**: Vite
- **Roteamento**: React Router DOM
- **Estilizacao**: CSS puro
- **HTTP Client**: Fetch API

## Requisitos

- Node.js 18+
- npm ou yarn
- API ReceitaFacil rodando (backend)

## Instalacao

1. Clone o repositorio:
```bash
git clone https://github.com/alexandre-canellas/receita-facil-front.git
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

### Pre-requisito
Certifique-se de que a API backend esteja rodando:
```bash
cd ../receita-facil-api
source venv/bin/activate
uvicorn app.main:app --reload
```

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

## Paginas

| Rota | Pagina | Descricao |
|------|--------|-----------|
| `/` | Home | Busca, categorias e receita do dia |
| `/recipe/:id` | Detalhes | Informacoes completas da receita |
| `/favorites` | Favoritos | Lista de receitas favoritas |
| `/shopping-list` | Lista de Compras | Gerenciamento de ingredientes |

## Estrutura do Projeto

```
receita-facil-front/
├── public/
├── src/
│   ├── api/
│   │   └── api.js              # Servico de comunicacao com a API
│   ├── components/
│   │   ├── Header.jsx          # Cabecalho com navegacao
│   │   ├── Header.css
│   │   ├── SearchBar.jsx       # Campo de busca
│   │   ├── SearchBar.css
│   │   ├── RecipeCard.jsx      # Card de receita
│   │   ├── RecipeCard.css
│   │   ├── CategoryList.jsx    # Lista de categorias
│   │   └── CategoryList.css
│   ├── pages/
│   │   ├── Home.jsx            # Pagina inicial
│   │   ├── Home.css
│   │   ├── RecipeDetailPage.jsx # Detalhes da receita
│   │   ├── RecipeDetailPage.css
│   │   ├── FavoritesPage.jsx   # Pagina de favoritos
│   │   ├── FavoritesPage.css
│   │   ├── ShoppingPage.jsx    # Lista de compras
│   │   └── ShoppingPage.css
│   ├── App.jsx                 # Componente principal com rotas
│   ├── App.css
│   ├── main.jsx                # Ponto de entrada
│   └── index.css               # Estilos globais
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Funcoes da API (api.js)

### Receitas
| Funcao | Descricao |
|--------|-----------|
| `searchRecipes(name)` | Busca receitas por nome |
| `getCategories()` | Lista categorias |
| `getRecipesByCategory(category)` | Receitas por categoria |
| `getRecipeById(id)` | Detalhes da receita |
| `getRandomRecipe()` | Receita aleatoria |

### Usuarios
| Funcao | Descricao |
|--------|-----------|
| `createUser(userData)` | Cria usuario |
| `getUserById(id)` | Busca usuario |

### Favoritos
| Funcao | Descricao |
|--------|-----------|
| `getFavorites(userId)` | Lista favoritos |
| `addFavorite(data)` | Adiciona favorito |
| `removeFavorite(id)` | Remove favorito |
| `checkFavorite(recipeId, userId)` | Verifica se e favorito |
| `removeFavoriteByRecipe(recipeId, userId)` | Remove por receita |

### Lista de Compras
| Funcao | Descricao |
|--------|-----------|
| `getShoppingList(userId)` | Lista itens |
| `addShoppingItem(data)` | Adiciona item |
| `updateShoppingItem(id, data)` | Atualiza item |
| `removeShoppingItem(id)` | Remove item |
| `addRecipeToShoppingList(recipeId, userId)` | Adiciona receita |
| `clearShoppingList(userId)` | Limpa lista |

## Fluxo de Usuario

1. **Primeiro acesso**: Usuario e criado automaticamente ao adicionar primeiro favorito ou item na lista
2. **ID do usuario**: Armazenado no localStorage do navegador
3. **Persistencia**: Dados salvos no banco de dados via API

## Scripts Disponiveis

| Comando | Descricao |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de producao |
| `npm run preview` | Visualizar build |
| `npm run lint` | Verificar codigo com ESLint |

## Navegadores Suportados

- Chrome (ultima versao)
- Firefox (ultima versao)
- Safari (ultima versao)
- Edge (ultima versao)

## Licenca

MIT
