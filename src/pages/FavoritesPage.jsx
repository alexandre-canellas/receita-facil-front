import { Link } from 'react-router-dom';
import './PlaceholderPage.css';

// Favorites page - will be implemented in Milestone 2
function FavoritesPage() {
  return (
    <div className="placeholder-page">
      <h1>My Favorites</h1>
      <p>This feature will be implemented in Milestone 2.</p>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
}

export default FavoritesPage;
