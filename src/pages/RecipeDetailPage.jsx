import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  getRecipeById,
  addRecipeToShoppingList,
  createUser,
  addFavorite,
  checkFavorite,
  removeFavoriteByRecipe
} from '../api/api';
import './RecipeDetailPage.css';

function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [addingToList, setAddingToList] = useState(false);
  const [addSuccess, setAddSuccess] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [favoriteLoading, setFavoriteLoading] = useState(false);

  useEffect(() => {
    async function loadRecipe() {
      try {
        setLoading(true);
        setError(null);

        const data = await getRecipeById(id);
        setRecipe(data.meal);
        setIngredients(data.ingredients || []);

        // Check de favoritos
        const userId = localStorage.getItem('userId');
        if (userId) {
          try {
            const favoriteStatus = await checkFavorite(id, parseInt(userId));
            setIsFavorite(favoriteStatus.is_favorite);
          } catch (err) {
            console.error('Error checking favorite status:', err);
          }
        }
      } catch (err) {
        setError('Error loading recipe.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  async function getOrCreateUser() {
    let userId = localStorage.getItem('userId');

    if (!userId) {
      const timestamp = Date.now();
      const userData = {
        nome: 'User',
        email: `user_${timestamp}@receitafacil.local`
      };

      try {
        const newUser = await createUser(userData);
        userId = newUser.id;
        localStorage.setItem('userId', userId.toString());
      } catch (err) {
        console.error('Error creating user:', err);
        throw new Error('Could not create user');
      }
    }

    return parseInt(userId);
  }

  async function handleAddToShoppingList() {
    try {
      setAddingToList(true);
      setAddSuccess(null);
      setError(null);

      const userId = await getOrCreateUser();
      const result = await addRecipeToShoppingList(id, userId);

      setAddSuccess(`Added ${result.items_added} ingredients to shopping list!`);
      setTimeout(() => setAddSuccess(null), 3000);
    } catch (err) {
      setError('Error adding to shopping list.');
      console.error(err);
    } finally {
      setAddingToList(false);
    }
  }

  async function handleToggleFavorite() {
    try {
      setFavoriteLoading(true);
      setError(null);

      const userId = await getOrCreateUser();

      if (isFavorite) {
        await removeFavoriteByRecipe(id, userId);
        setIsFavorite(false);
        setAddSuccess('Removed from favorites!');
      } else {
        const favoriteData = {
          usuario_id: userId,
          receita_id_externa: id,
          nome_receita: recipe.strMeal,
          imagem_url: recipe.strMealThumb,
          categoria: recipe.strCategory
        };
        await addFavorite(favoriteData);
        setIsFavorite(true);
        setAddSuccess('Added to favorites!');
      }

      setTimeout(() => setAddSuccess(null), 3000);
    } catch (err) {
      if (err.message.includes('400')) {
        setError('Recipe is already in favorites.');
      } else {
        setError('Error updating favorites.');
      }
      console.error(err);
    } finally {
      setFavoriteLoading(false);
    }
  }

  if (loading) {
    return <div className="recipe-detail-loading">Loading...</div>;
  }

  if (error && !recipe) {
    return (
      <div className="recipe-detail-error">
        <p>{error}</p>
        <Link to="/" className="back-link">Back to Home</Link>
      </div>
    );
  }

  if (!recipe) {
    return (
      <div className="recipe-detail-error">
        <p>Recipe not found.</p>
        <Link to="/" className="back-link">Back to Home</Link>
      </div>
    );
  }

  const {
    strMeal,
    strMealThumb,
    strCategory,
    strArea,
    strInstructions,
    strYoutube
  } = recipe;

  const youtubeId = strYoutube ? strYoutube.split('v=')[1] : null;

  return (
    <div className="recipe-detail">
      <Link to="/" className="back-link">Back</Link>

      <div className="recipe-detail-header">
        <img
          src={strMealThumb}
          alt={strMeal}
          className="recipe-detail-image"
        />
        <div className="recipe-detail-info">
          <h1>{strMeal}</h1>
          <div className="recipe-detail-meta">
            {strCategory && (
              <span className="meta-item">
                <strong>Category:</strong> {strCategory}
              </span>
            )}
            {strArea && (
              <span className="meta-item">
                <strong>Origin:</strong> {strArea}
              </span>
            )}
          </div>

          <div className="recipe-detail-actions">
            <button
              className={`action-button favorite-button ${isFavorite ? 'is-favorite' : ''}`}
              onClick={handleToggleFavorite}
              disabled={favoriteLoading}
            >
              {favoriteLoading ? 'Saving...' : isFavorite ? 'Remove Favorite' : 'Add to Favorites'}
            </button>
            <button
              className="action-button shopping-button"
              onClick={handleAddToShoppingList}
              disabled={addingToList}
            >
              {addingToList ? 'Adding...' : 'Add to List'}
            </button>
          </div>

          {addSuccess && (
            <div className="success-message">{addSuccess}</div>
          )}
          {error && (
            <div className="error-message">{error}</div>
          )}
        </div>
      </div>

      <div className="recipe-detail-content">
        <section className="recipe-section">
          <h2>Ingredients</h2>
          <ul className="ingredients-list">
            {ingredients.map((item, index) => (
              <li key={index} className="ingredient-item">
                <span className="ingredient-measure">{item.measure}</span>
                <span className="ingredient-name">{item.ingredient}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="recipe-section">
          <h2>Instructions</h2>
          <div className="instructions">
            {strInstructions.split('\r\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {youtubeId && (
          <section className="recipe-section">
            <h2>Video</h2>
            <div className="video-container">
              <iframe
                src={`https://www.youtube.com/embed/${youtubeId}`}
                title={`Video: ${strMeal}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

export default RecipeDetailPage;
