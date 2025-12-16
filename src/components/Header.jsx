import { Link } from 'react-router-dom';
import './Header.css';

// Header component with navigation
function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="header-logo">
          EasyRecipe
        </Link>
        <nav className="header-nav">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/favorites" className="nav-link">Favorites</Link>
          <Link to="/shopping-list" className="nav-link">Shopping List</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
