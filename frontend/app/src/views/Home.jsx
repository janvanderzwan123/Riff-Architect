import TableSummary from '../components/TableSummary';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // import this!
import { getRiffs, getSongs, getCategories } from '../services/api';

function Home() {
  const [riffs, setRiffs] = useState([]);
  const [songs, setSongs] = useState([]);
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate(); // initialize navigation

  useEffect(() => {
    getRiffs().then(setRiffs);
    getSongs().then(setSongs);
    getCategories().then(setCategories);
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <TableSummary title="Riffs" data={riffs} onCreate={() => navigate('/create-riff')} />
      <TableSummary title="Songs" data={songs} onCreate={() => navigate('/create-song')} />
      <TableSummary title="Categories" data={categories} onCreate={() => navigate('/create-category')} />
    </div>
  );
}

export default Home;
