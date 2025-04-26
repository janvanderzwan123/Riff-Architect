import { useState, useEffect } from 'react';
import { uploadRiff } from '../services/api';
import { Link } from 'react-router-dom';

function CreateRiff() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [isMetronomeOn, setIsMetronomeOn] = useState(false);

  const handleFileChange = (e) => {
    const selected = e.target.files[0];
    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleUpload = async () => {
    if (!file || !name) {
      alert("Please fill in name and select a file!");
      return;
    }
    try {
      setIsUploading(true);
      await uploadRiff(file, name, category);
      alert("Riff uploaded successfully!");
    } catch (error) {
      console.error(error);
      alert("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  };

  useEffect(() => {
    if (!isMetronomeOn) return;

    const interval = setInterval(() => {
      const el = document.getElementById('metronome-light');
      if (el) el.classList.toggle('active');
    }, 600);

    return () => clearInterval(interval);
  }, [isMetronomeOn]);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ marginBottom: '30px' }}>
        <Link to="/">
          <button>← Back to Home</button>
        </Link>
      </div>

      <h1 style={{ fontSize: '32px', marginBottom: '40px' }}>Create New Riff</h1>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <div style={{ marginBottom: '20px' }}>
            <label>Riff Name:</label><br />
            <input 
              type="text" 
              placeholder="Enter riff name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Category:</label><br />
            <input 
              type="text" 
              placeholder="Optional category" 
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Select File (mp3 or wav):</label><br />
            <input 
              type="file" 
              accept="audio/mp3, audio/wav"
              onChange={handleFileChange}
              style={{ marginTop: '8px' }}
            />
          </div>

          <button onClick={handleUpload} disabled={isUploading} style={{ marginTop: '10px' }}>
            {isUploading ? "Uploading..." : "Upload Riff"}
          </button>
        </div>

        <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
          {previewUrl ? (
            <>
              <h3>Preview:</h3>
              <audio controls src={previewUrl} style={{ width: '100%', marginTop: '20px' }} />
            </>
          ) : (
            <div style={{ marginTop: '60px', fontStyle: 'italic', color: '#777' }}>
              No file selected
            </div>
          )}

          <div style={{ marginTop: '40px' }}>
            <h3>Metronome:</h3>
            <div id="metronome-light" style={{
              width: '30px',
              height: '30px',
              backgroundColor: 'grey',
              borderRadius: '50%',
              margin: '20px auto'
            }}></div>

            <button onClick={() => setIsMetronomeOn(!isMetronomeOn)}>
              {isMetronomeOn ? "Stop Metronome" : "Start Metronome"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRiff;
