import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  getShoppingList,
  addShoppingItem,
  updateShoppingItem,
  removeShoppingItem,
  clearShoppingList
} from '../api/api';
import './ShoppingPage.css';

function ShoppingPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newItem, setNewItem] = useState({ ingrediente: '', quantidade: '' });
  const [userId, setUserId] = useState(null);

  // Utiliza o userId local -> cria caso não exista
  useEffect(() => {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) {
      setUserId(parseInt(storedUserId));
    }
  }, []);

  // Carrega a lista de compras quando houver userId
  useEffect(() => {
    if (userId) {
      loadShoppingList();
    } else {
      setLoading(false);
    }
  }, [userId]);

  async function loadShoppingList() {
    try {
      setLoading(true);
      setError(null);
      const data = await getShoppingList(userId);
      setItems(data || []);
    } catch (err) {
      console.error(err);
      if (err.message.includes('404')) {
        setItems([]);
      } else {
        setError('Error loading shopping list.');
      }
    } finally {
      setLoading(false);
    }
  }

  async function handleAddItem(e) {
    e.preventDefault();
    if (!newItem.ingrediente.trim()) return;

    try {
      const itemData = {
        usuario_id: userId,
        ingrediente: newItem.ingrediente.trim(),
        quantidade: newItem.quantidade.trim() || null
      };

      await addShoppingItem(itemData);
      setNewItem({ ingrediente: '', quantidade: '' });
      loadShoppingList();
    } catch (err) {
      console.error(err);
      setError('Error adding item.');
    }
  }

  async function handleToggleItem(item) {
    try {
      await updateShoppingItem(item.id, { comprado: !item.comprado });
      setItems(items.map(i =>
        i.id === item.id ? { ...i, comprado: !i.comprado } : i
      ));
    } catch (err) {
      console.error(err);
      setError('Error updating item.');
    }
  }

  async function handleRemoveItem(itemId) {
    try {
      await removeShoppingItem(itemId);
      setItems(items.filter(i => i.id !== itemId));
    } catch (err) {
      console.error(err);
      setError('Error removing item.');
    }
  }

  async function handleClearList() {
    if (!window.confirm('Are you sure you want to clear the entire list?')) {
      return;
    }

    try {
      await clearShoppingList(userId);
      setItems([]);
    } catch (err) {
      console.error(err);
      setError('Error clearing list.');
    }
  }

  function handleCopyList() {
    const text = items
      .filter(i => !i.comprado)
      .map(i => `${i.quantidade ? i.quantidade + ' ' : ''}${i.ingrediente}`)
      .join('\n');

    navigator.clipboard.writeText(text);
    alert('List copied to clipboard!');
  }

  // Agrupando receitas por país de origem
  const groupedItems = items.reduce((acc, item) => {
    const key = item.receita_origem || 'Manual';
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});

  const pendingCount = items.filter(i => !i.comprado).length;
  const completedCount = items.filter(i => i.comprado).length;

  if (!userId) {
    return (
      <div className="shopping-page">
        <div className="shopping-header">
          <h1>Shopping List</h1>
        </div>
        <div className="no-user">
          <p>To use the shopping list, you need to register first.</p>
          <p>Go to a recipe and click "Add to List" to create an account.</p>
          <Link to="/" className="back-link">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="shopping-page">
      <div className="shopping-header">
        <h1>Shopping List</h1>
        <div className="shopping-stats">
          <span className="stat pending">{pendingCount} pending</span>
          <span className="stat completed">{completedCount} completed</span>
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {/* Adicionar items da lista */}
      <form className="add-item-form" onSubmit={handleAddItem}>
        <input
          type="text"
          placeholder="Ingredient..."
          value={newItem.ingrediente}
          onChange={(e) => setNewItem({ ...newItem, ingrediente: e.target.value })}
          className="input-ingrediente"
        />
        <input
          type="text"
          placeholder="Quantity (optional)"
          value={newItem.quantidade}
          onChange={(e) => setNewItem({ ...newItem, quantidade: e.target.value })}
          className="input-quantidade"
        />
        <button type="submit" className="btn-add">Add</button>
      </form>

      {/* Ações */}
      {items.length > 0 && (
        <div className="shopping-actions">
          <button onClick={handleCopyList} className="btn-action">
            Copy List
          </button>
          <button onClick={handleClearList} className="btn-action btn-danger">
            Clear All
          </button>
        </div>
      )}

      {loading && <div className="loading">Loading...</div>}

      {!loading && items.length === 0 && (
        <div className="empty-list">
          <p>Your shopping list is empty.</p>
          <p>Add items manually or add ingredients from a recipe.</p>
        </div>
      )}

      {/* Items agrupados por receita */}
      {!loading && Object.entries(groupedItems).map(([recipeName, groupItems]) => (
        <div key={recipeName} className="item-group">
          <h3 className="group-title">{recipeName}</h3>
          <ul className="shopping-items">
            {groupItems.map((item) => (
              <li
                key={item.id}
                className={`shopping-item ${item.comprado ? 'completed' : ''}`}
              >
                <label className="item-checkbox">
                  <input
                    type="checkbox"
                    checked={item.comprado}
                    onChange={() => handleToggleItem(item)}
                  />
                  <span className="checkmark"></span>
                </label>
                <div className="item-info">
                  <span className="item-name">{item.ingrediente}</span>
                  {item.quantidade && (
                    <span className="item-quantity">{item.quantidade}</span>
                  )}
                </div>
                <button
                  onClick={() => handleRemoveItem(item.id)}
                  className="btn-remove"
                  title="Remove item"
                >
                  X
                </button>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
}

export default ShoppingPage;
