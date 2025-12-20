// Servico para comunicacao com a API ReceitaFacil

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

/**
 * Função auxiliar para fazer requisições HTTP
 */
async function fetchApi(endpoint, options = {}) {
  const url = `${API_BASE_URL}${endpoint}`;

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Erro ao chamar API: ${endpoint}`, error);
    throw error;
  }
}

// ==================== RECEITAS ====================

/**
 * Busca receitas pelo nome
 */
export async function searchRecipes(name) {
  return fetchApi(`/recipes/search?name=${encodeURIComponent(name)}`);
}

/**
 * Lista todas as categorias
 */
export async function getCategories() {
  return fetchApi('/recipes/categories');
}

/**
 * Lista receitas de uma categoria
 */
export async function getRecipesByCategory(categoryName) {
  return fetchApi(`/recipes/category/${encodeURIComponent(categoryName)}`);
}

/**
 * Busca detalhes de uma receita pelo ID
 */
export async function getRecipeById(id) {
  return fetchApi(`/recipes/${id}`);
}

/**
 * Retorna uma receita aleatória
 */
export async function getRandomRecipe() {
  return fetchApi('/recipes/random');
}

// ==================== USUÁRIOS ====================

/**
 * Cria um novo usuário
 */
export async function createUser(userData) {
  return fetchApi('/users/', {
    method: 'POST',
    body: JSON.stringify(userData),
  });
}

/**
 * Busca usuário pelo ID
 */
export async function getUserById(id) {
  return fetchApi(`/users/${id}`);
}

// ==================== FAVORITOS ====================

/**
 * Lista favoritos do usuário
 */
export async function getFavorites(userId) {
  return fetchApi(`/favorites?user_id=${userId}`);
}

/**
 * Adiciona receita aos favoritos
 */
export async function addFavorite(favoriteData) {
  return fetchApi('/favorites/', {
    method: 'POST',
    body: JSON.stringify(favoriteData),
  });
}

/**
 * Remove receita dos favoritos
 */
export async function removeFavorite(favoriteId) {
  return fetchApi(`/favorites/${favoriteId}`, {
    method: 'DELETE',
  });
}

/**
 * Verifica se uma receita esta nos favoritos
 */
export async function checkFavorite(recipeId, userId) {
  return fetchApi(`/favorites/check/${recipeId}?user_id=${userId}`);
}

/**
 * Remove receita dos favoritos pelo ID da receita
 */
export async function removeFavoriteByRecipe(recipeId, userId) {
  return fetchApi(`/favorites/recipe/${recipeId}?user_id=${userId}`, {
    method: 'DELETE',
  });
}

// ==================== LISTA DE COMPRAS ====================

/**
 * Lista itens da lista de compras
 */
export async function getShoppingList(userId) {
  return fetchApi(`/shopping-list?user_id=${userId}`);
}

/**
 * Adiciona item a lista de compras
 */
export async function addShoppingItem(itemData) {
  return fetchApi('/shopping-list/', {
    method: 'POST',
    body: JSON.stringify(itemData),
  });
}

/**
 * Atualiza item da lista de compras
 */
export async function updateShoppingItem(itemId, itemData) {
  return fetchApi(`/shopping-list/${itemId}`, {
    method: 'PUT',
    body: JSON.stringify(itemData),
  });
}

/**
 * Remove item da lista de compras
 */
export async function removeShoppingItem(itemId) {
  return fetchApi(`/shopping-list/${itemId}`, {
    method: 'DELETE',
  });
}

/**
 * Adiciona todos ingredientes de uma receita a lista
 */
export async function addRecipeToShoppingList(recipeId, userId) {
  return fetchApi(`/shopping-list/add-recipe/${recipeId}?user_id=${userId}`, {
    method: 'POST',
  });
}

/**
 * Limpa toda a lista de compras
 */
export async function clearShoppingList(userId) {
  return fetchApi(`/shopping-list/clear/?user_id=${userId}`, {
    method: 'DELETE',
  });
}
