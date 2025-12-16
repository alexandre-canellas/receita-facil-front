import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getRecipeById } from '../api/api';
import './RecipeDetailPage.css';

// Recipe detail page
function RecipeDetailPage() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadRecipe() {
      try {
        setLoading(true);
        setError(null);

        const data = await getRecipeById(id);
        setRecipe(data.meal);
        setIngredients(data.ingredients || []);
      } catch (err) {
        setError('Error loading recipe.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    loadRecipe();
  }, [id]);

  if (loading) {
    return <div className="recipe-detail-loading">Loading...</div>;
  }

  if (error || !recipe) {
    return (
      <div className="recipe-detail-error">
        <p>{error || 'Recipe not found.'}</p>
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

  // Extract YouTube video ID
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

          {/* Action buttons - will be enabled in milestones 2 and 3 */}
          <div className="recipe-detail-actions">
            <button className="action-button favorite-button" disabled>
              Add to Favorites
            </button>
            <button className="action-button shopping-button" disabled>
              Add to List
            </button>
          </div>
        </div>
      </div>

      <div className="recipe-detail-content">
        {/* Ingredients */}
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

        {/* Instructions */}
        <section className="recipe-section">
          <h2>Instructions</h2>
          <div className="instructions">
            {strInstructions.split('\r\n').map((paragraph, index) => (
              paragraph.trim() && <p key={index}>{paragraph}</p>
            ))}
          </div>
        </section>

        {/* YouTube Video */}
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
