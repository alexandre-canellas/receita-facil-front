import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import CategoryList from '../components/CategoryList';
import RecipeCard from '../components/RecipeCard';
import {
  searchRecipes,
  getCategories,
  getRecipesByCategory,
  getRandomRecipe
} from '../api/api';
import './Home.css';

// Página inicial
function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // Carregando receita do dia e demais receitas
  useEffect(() => {
    async function loadInitialData() {
      try {
        setLoading(true);
        setError(null);

        const [categoriesData, randomData] = await Promise.all([
          getCategories(),
          getRandomRecipe()
        ]);

        setCategories(categoriesData.categories || []);
        setRandomRecipe(randomData.meal || null);

        // Carrega linearmente por categoria
        if (categoriesData.categories?.length > 0) {
          const firstCategory = categoriesData.categories[0].strCategory;
          const recipesData = await getRecipesByCategory(firstCategory);
          setRecipes(recipesData.meals || []);
          setSelectedCategory(firstCategory);
        }
      } catch (err) {
        setError('Error loading data. Check if the API is running.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadInitialData();
  }, []);

  // Procurar receitas por nome
  const handleSearch = async (term) => {
    try {
      setLoading(true);
      setError(null);
      setSearchTerm(term);
      setSelectedCategory(null);

      const data = await searchRecipes(term);
      setRecipes(data.meals || []);

      if (!data.meals || data.meals.length === 0) {
        setError(`No recipes found for "${term}"`);
      }
    } catch (err) {
      setError('Error searching recipes.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Filtrar por categoria
  const handleCategorySelect = async (category) => {
    try {
      setLoading(true);
      setError(null);
      setSearchTerm('');
      setSelectedCategory(category);

      if (category) {
        const data = await getRecipesByCategory(category);
        setRecipes(data.meals || []);
      }
    } catch (err) {
      setError('Error loading category.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      {/* Busca */}
      <section className="home-search">
        <h1>Find your next recipe</h1>
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Receita do Dia */}
      {randomRecipe && !searchTerm && (
        <section className="home-featured">
          <h2>Recipe of the Day</h2>
          <div className="featured-recipe">
            <RecipeCard recipe={randomRecipe} />
          </div>
        </section>
      )}

      {/* Categorias */}
      {!searchTerm && categories.length > 0 && (
        <section className="home-categories">
          <h2>Categories</h2>
          <CategoryList
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
          />
        </section>
      )}

      {/* Resultados */}
      <section className="home-results">
        {searchTerm && (
          <h2>Results for "{searchTerm}"</h2>
        )}
        {selectedCategory && !searchTerm && (
          <h2>{selectedCategory} Recipes</h2>
        )}

        {loading && (
          <div className="loading">Loading...</div>
        )}

        {error && !loading && (
          <div className="error-message">{error}</div>
        )}

        {!loading && !error && recipes.length > 0 && (
          <div className="recipe-grid">
            {recipes.map((recipe) => (
              <RecipeCard key={recipe.idMeal} recipe={recipe} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default Home;
