# ReceitaFacil Frontend

Aplicação web moderna para busca e descoberta de receitas, construida com React e Vite.
Permite buscar receitas, salvar favoritos e gerenciar lista de compras.

## Funcionalidades

### Busca de Receitas
- Buscar receitas por nome
- Navegar por categorias (Beef, Chicken, Dessert, etc.)
- Visualizar receita do dia (aleatória)
- Ver detalhes completos com ingredientes e instruções
- Vídeos do YouTube integrados

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
- Feedback visual de ações (loading, sucesso, erro)
- Navegação intuitiva

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

## Instalação

1. Clone o repositório:
```bash
git clone https://github.com/alexandre-canellas/receita-facil-front.git
cd receita-facil-front
```

2. Instale as dependências:
```bash
npm install
```

3. (Opcional) Crie um arquivo `.env` para configurar a URL da API:
```env
VITE_API_URL=http://localhost:8000
```

## Executando a Aplicação

### Pré-requisito
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

A aplicação estará disponível em `http://localhost:5173`.

### Build de Produção

Crie o build de produção:
```bash
npm run build
```

Visualize o build de produção:
```bash
npm run preview
```

## Executando com Docker

### Pre-requisitos
- Docker instalado
- Docker Compose instalado
- Repositorio da API clonado como pasta irmã

### Estrutura esperada
```
projeto/
├── receita-facil-front/   (este repositório)
│   └── docker-compose.yml
└── receita-facil-api/     (repositório da API)
```

### Executando
```bash
# Na pasta do frontend
cd receita-facil-front

# Subir os containers (com build)
docker-compose up -d --build

# Ou sem rebuild
docker-compose up -d
```

### URLs
- **Frontend**: http://localhost:3000
- **API**: http://localhost:8000
- **Swagger**: http://localhost:8000/docs

### Comandos úteis
```bash
# Ver containers rodando
docker-compose ps

# Ver logs em tempo real
docker-compose logs -f

# Parar containers
docker-compose down

# Parar e remover volumes (limpa banco de dados)
docker-compose down -v

# Rebuild apos alterações no código
docker-compose up -d --build
```

## Paginas

| Rota | Página | Descrição |
|------|--------|-----------|
| `/` | Home | Busca, categorias e receita do dia |
| `/recipe/:id` | Detalhes | Informações completas da receita |
| `/favorites` | Favoritos | Lista de receitas favoritas |
| `/shopping-list` | Lista de Compras | Gerenciamento de ingredientes |

## Estrutura do Projeto

```
receita-facil-front/
├── public/
├── src/
│   ├── api/
│   │   └── api.js                          # Serviço de comunicação com a API
│   ├── components/
│   │   ├── Header.jsx                      # Cabeçalho com navegação
│   │   ├── Header.css
│   │   ├── SearchBar.jsx                   # Campo de busca
│   │   ├── SearchBar.css
│   │   ├── RecipeCard.jsx                  # Card de receita
│   │   ├── RecipeCard.css
│   │   ├── CategoryList.jsx                # Lista de categorias
│   │   └── CategoryList.css
│   ├── pages/
│   │   ├── Home.jsx                        # Página inicial
│   │   ├── Home.css
│   │   ├── RecipeDetailPage.jsx            # Detalhes da receita
│   │   ├── RecipeDetailPage.css
│   │   ├── FavoritesPage.jsx               # Página de favoritos
│   │   ├── FavoritesPage.css
│   │   ├── ShoppingPage.jsx                # Lista de compras
│   │   └── ShoppingPage.css
│   ├── App.jsx                             # Componente principal com rotas
│   ├── App.css
│   ├── main.jsx                            # Ponto de entrada
│   └── index.css                           # Estilos globais
├── docker-compose.yml                      # Orquestração dos containers
├── Dockerfile                              # Build da imagem do frontend
├── nginx.conf                              # Configuração do Nginx
├── index.html
├── package.json
├── vite.config.js
└── README.md
```

## Funções da API (api.js)

### Receitas
| Função | Descrição |
|--------|-----------|
| `searchRecipes(name)` | Busca receitas por nome |
| `getCategories()` | Lista categorias |
| `getRecipesByCategory(category)` | Receitas por categoria |
| `getRecipeById(id)` | Detalhes da receita |
| `getRandomRecipe()` | Receita aleatória |

### Usuarios
| Função | Descrição |
|--------|-----------|
| `createUser(userData)` | Cria usuário |
| `getUserById(id)` | Busca usuário |

### Favoritos
| Função | Descrição |
|--------|-----------|
| `getFavorites(userId)` | Lista favoritos |
| `addFavorite(data)` | Adiciona favorito |
| `removeFavorite(id)` | Remove favorito |
| `checkFavorite(recipeId, userId)` | Verifica se e favorito |
| `removeFavoriteByRecipe(recipeId, userId)` | Remove por receita |

### Lista de Compras
| Função | Descrição |
|--------|-----------|
| `getShoppingList(userId)` | Lista itens |
| `addShoppingItem(data)` | Adiciona item |
| `updateShoppingItem(id, data)` | Atualiza item |
| `removeShoppingItem(id)` | Remove item |
| `addRecipeToShoppingList(recipeId, userId)` | Adiciona receita |
| `clearShoppingList(userId)` | Limpa lista |

## Fluxo de Usuário

1. **Primeiro acesso**: Usuário e criado automaticamente ao adicionar primeiro favorito ou item na lista
2. **ID do usuário**: Armazenado no localStorage do navegador
3. **Persistência**: Dados salvos no banco de dados via API

## Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Servidor de desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Visualizar build |
| `npm run lint` | Verificar código com ESLint |

## Navegadores Suportados

- Chrome (ultima versão)
- Firefox (ultima versão)
- Safari (ultima versão)
- Edge (ultima versão)
