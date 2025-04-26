import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './views/Home';
import CreateRiff from './views/CreateRiff';
import Header from './components/Header';

// Placeholder for now if CreateSong and CreateCategory are not built yet
function Placeholder({ text }) {
  return <div style={{ padding: '20px' }}><h1>{text}</h1></div>;
}

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-riff" element={<CreateRiff />} />
        <Route path="/create-song" element={<Placeholder text="Create Song (Coming Soon)" />} />
        <Route path="/create-category" element={<Placeholder text="Create Category (Coming Soon)" />} />
      </Routes>
    </Router>
  );
}

export default App;
