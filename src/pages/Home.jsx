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

// Home page with search and recipe listing
function Home() {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [randomRecipe, setRandomRecipe] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  // Load categories and recipe of the day on component mount
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

        // Load recipes from the first category
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

  // Search recipes by name
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

  // Filter recipes by category
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
      {/* Search section */}
      <section className="home-search">
        <h1>Find your next recipe</h1>
        <SearchBar onSearch={handleSearch} />
      </section>

      {/* Recipe of the day */}
      {randomRecipe && !searchTerm && (
        <section className="home-featured">
          <h2>Recipe of the Day</h2>
          <div className="featured-recipe">
            <RecipeCard recipe={randomRecipe} />
          </div>
        </section>
      )}

      {/* Categories */}
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

      {/* Results */}
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
