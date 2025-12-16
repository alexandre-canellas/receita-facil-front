import { Link } from 'react-router-dom';
import './PlaceholderPage.css';

// Shopping list page - will be implemented in Milestone 3
function ShoppingPage() {
  return (
    <div className="placeholder-page">
      <h1>Shopping List</h1>
      <p>This feature will be implemented in Milestone 3.</p>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
}

export default ShoppingPage;
