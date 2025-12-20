import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Home from './pages/Home';
import RecipeDetailPage from './pages/RecipeDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import ShoppingPage from './pages/ShoppingPage';
import './App.css';

// Componente principal da aplicação
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/recipe/:id" element={<RecipeDetailPage />} />
            <Route path="/favorites" element={<FavoritesPage />} />
            <Route path="/shopping-list" element={<ShoppingPage />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
