import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import { getFavorites, removeFavorite } from '../api/api';
import './FavoritesPage.css';

function FavoritesPage() {
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  useEffect(() => {
    if (userId) {
      loadFavorites();
    } else {
      setLoading(false);
    }
  }, [userId]);

  async function loadFavorites() {
    try {
      setLoading(true);
      setError(null);
      const data = await getFavorites(userId);
      setFavorites(data || []);
    } catch (err) {
      console.error(err);
      if (err.message.includes('404')) {
        setFavorites([]);
      } else {
        setError('Error loading favorites.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleRemoveFavorite(favoriteId) {
    try {
      await removeFavorite(favoriteId);
      setFavorites(favorites.filter(f => f.id !== favoriteId));
    } catch (err) {
      console.error(err);
      setError('Error removing favorite.');
    }
  }

  // Convert favorite to recipe format for RecipeCard
  function favoriteToRecipe(favorite) {
    return {
      idMeal: favorite.receita_id_externa,
      strMeal: favorite.nome_receita,
      strMealThumb: favorite.imagem_url,
      strCategory: favorite.categoria
    };
  }

  if (!userId) {
    return (
      <div className="favorites-page">
        <div className="favorites-header">
          <h1>My Favorites</h1>
        </div>
        <div className="no-user">
          <p>To save favorites, you need to register first.</p>
          <p>Go to a recipe and click "Add to Favorites" to create an account.</p>
          <Link to="/" className="back-link">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="favorites-page">
      <div className="favorites-header">
        <h1>My Favorites</h1>
        <span className="favorites-count">{favorites.length} recipes</span>
      </div>

      {error && <div className="error-message">{error}</div>}

      {loading && <div className="loading">Loading...</div>}

      {!loading && favorites.length === 0 && (
        <div className="empty-favorites">
          <p>You don't have any favorite recipes yet.</p>
          <p>Browse recipes and click the heart to save them here.</p>
          <Link to="/" className="browse-link">Browse Recipes</Link>
        </div>
      )}

      {!loading && favorites.length > 0 && (
        <div className="favorites-grid">
          {favorites.map((favorite) => (
            <div key={favorite.id} className="favorite-item">
              <RecipeCard recipe={favoriteToRecipe(favorite)} />
              <button
                onClick={() => handleRemoveFavorite(favorite.id)}
                className="remove-favorite-btn"
                title="Remove from favorites"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
}

export default FavoritesPage;
