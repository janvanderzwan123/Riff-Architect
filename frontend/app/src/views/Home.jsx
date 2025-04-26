import TableSummary from '../components/TableSummary';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getRiffs, getSongs, getCategories } from '../services/api';

function Home() {
  const [riffs, setRiffs] = useState([]);
  const [songs, setSongs] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    getRiffs().then(setRiffs);
    getSongs().then(setSongs);
    getCategories().then(setCategories);
  }, []);

  return (
    <div style={{ padding: '40px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '40px' }}>Riff Architect Dashboard</h1>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        {/* Riffs Table */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2>Riffs</h2>
            <button onClick={() => navigate('/create-riff')}>+ New</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
              </tr>
            </thead>
            <tbody>
              {riffs.length > 0 ? riffs.map((riff) => (
                <tr key={riff.id}>
                  <td>{riff.name}</td>
                  <td>{riff.category}</td>
                </tr>
              )) : (
                <tr>
                  <td colSpan="2" style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No riffs yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Songs Table */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2>Songs</h2>
            <button onClick={() => navigate('/create-song')}>+ New</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Title</th>
              </tr>
            </thead>
            <tbody>
              {songs.length > 0 ? songs.map((song) => (
                <tr key={song.id}>
                  <td>{song.title}</td>
                </tr>
              )) : (
                <tr>
                  <td style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No songs yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Categories Table */}
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h2>Categories</h2>
            <button onClick={() => navigate('/create-category')}>+ New</button>
          </div>

          <table>
            <thead>
              <tr>
                <th>Name</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? categories.map((cat) => (
                <tr key={cat.id}>
                  <td>{cat.name}</td>
                </tr>
              )) : (
                <tr>
                  <td style={{ textAlign: 'center', padding: '20px', color: '#666' }}>No categories yet</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Home;
