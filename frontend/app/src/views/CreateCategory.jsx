import { useState } from 'react';
import { createCategory } from '../services/api';
import { Link } from 'react-router-dom';

function CreateCategory() {
  const [name, setName] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async () => {
    if (!name) {
      alert('Please enter a name');
      return;
    }
    try {
      setIsSaving(true);
      await createCategory(name);
      alert('Category created successfully!');
      setName('');
    } catch (e) {
      console.error(e);
      alert('Creation failed.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <Link to="/">
          <button>← Back to Home</button>
        </Link>
      </div>

      <h1 style={{ fontSize: '32px', marginBottom: '40px' }}>Create New Category</h1>

      <div style={{ marginBottom: '20px' }}>
        <label>Category Name</label><br />
        <input
          type="text"
          placeholder="Enter category name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ width: '100%', padding: '10px', marginTop: '8px' }}
        />
      </div>

      <button onClick={handleSave} disabled={isSaving} style={{ width: '100%', padding: '12px', fontSize: '16px' }}>
        {isSaving ? 'Saving...' : 'Save Category'}
      </button>
    </div>
  );
}

export default CreateCategory;
