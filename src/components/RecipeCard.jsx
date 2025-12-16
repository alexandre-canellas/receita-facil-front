import { Link } from 'react-router-dom';
import './RecipeCard.css';

// Recipe card component
function RecipeCard({ recipe }) {
  const {
    idMeal,
    strMeal,
    strMealThumb,
    strCategory,
    strArea
  } = recipe;

  return (
    <Link to={`/recipe/${idMeal}`} className="recipe-card">
      <div className="recipe-card-image">
        <img src={strMealThumb} alt={strMeal} loading="lazy" />
      </div>
      <div className="recipe-card-content">
        <h3 className="recipe-card-title">{strMeal}</h3>
        <div className="recipe-card-meta">
          {strCategory && <span className="recipe-card-category">{strCategory}</span>}
          {strArea && <span className="recipe-card-area">{strArea}</span>}
        </div>
      </div>
    </Link>
  );
}

export default RecipeCard;
