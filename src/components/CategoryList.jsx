import './CategoryList.css';

// Filtro de categorias
function CategoryList({ categories, selectedCategory, onSelectCategory }) {
  return (
    <div className="category-list">
      <button
        className={`category-item ${!selectedCategory ? 'active' : ''}`}
        onClick={() => onSelectCategory(null)}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.idCategory || category.strCategory}
          className={`category-item ${selectedCategory === category.strCategory ? 'active' : ''}`}
          onClick={() => onSelectCategory(category.strCategory)}
        >
          {category.strCategory}
        </button>
      ))}
    </div>
  );
}

export default CategoryList;
