import { useState, useEffect, useRef } from 'react';
import { uploadRiff, getCategories } from '../services/api';
import { Link } from 'react-router-dom';

function CreateRiff() {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);

  const [isMetronomeOn, setIsMetronomeOn] = useState(false);
  const [bpm, setBpm] = useState(100);
  const [lightColor, setLightColor] = useState('grey');

  const [isRecording, setIsRecording] = useState(false);
  const [recordedChunks, setRecordedChunks] = useState([]);
  const [recordTime, setRecordTime] = useState(0);

  const tickSoundRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const audioStreamRef = useRef(null);
  const timerRef = useRef(null);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

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

  const prepareMicrophone = async () => {
    if (!audioStreamRef.current) {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      audioStreamRef.current = stream;
    }
  };

  const startRecording = async () => {
    await prepareMicrophone();

    const mediaRecorder = new MediaRecorder(audioStreamRef.current);
    mediaRecorderRef.current = mediaRecorder;
    setRecordedChunks([]);
    setRecordTime(0);

    mediaRecorder.ondataavailable = (event) => {
      if (event.data.size > 0) {
        setRecordedChunks((prev) => prev.concat(event.data));
      }
    };

    mediaRecorder.start(100);
    setIsRecording(true);

    timerRef.current = setInterval(() => {
      setRecordTime((prev) => prev + 1);
    }, 1000);
  };

  const stopRecording = () => {
    if (!mediaRecorderRef.current) return;

    mediaRecorderRef.current.stop();
    clearInterval(timerRef.current);
    setIsRecording(false);

    mediaRecorderRef.current.onstop = () => {
      const blob = new Blob(recordedChunks, { type: 'audio/webm' });

      if (blob.size === 0) {
        alert("Recording failed or microphone not captured properly.");
        return;
      }

      const recordedFile = new File([blob], "recorded-riff.webm", { type: 'audio/webm' });
      setFile(recordedFile);
      setPreviewUrl(URL.createObjectURL(blob));

      if (audioStreamRef.current) {
        audioStreamRef.current.getTracks().forEach(track => track.stop());
        audioStreamRef.current = null;
      }
    };
  };

  useEffect(() => {
    if (!isMetronomeOn) return;

    const intervalMs = 60000 / bpm;

    const interval = setInterval(() => {
      setLightColor(prev => (prev === 'grey' ? 'limegreen' : 'grey'));
      if (tickSoundRef.current) {
        tickSoundRef.current.currentTime = 0;
        tickSoundRef.current.play();
      }
    }, intervalMs);

    return () => clearInterval(interval);
  }, [isMetronomeOn, bpm]);

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <audio ref={tickSoundRef} src="/tick.mp3" preload="auto" />

      <div style={{ marginBottom: '30px' }}>
        <Link to="/">
          <button>← Back to Home</button>
        </Link>
      </div>

      <h1 style={{ fontSize: '32px', marginBottom: '40px' }}>Create New Riff</h1>

      <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          {/* Form Section */}
          <div style={{ marginBottom: '20px' }}>
            <label>Riff Name</label><br />
            <input
              type="text"
              placeholder="Enter riff name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '8px' }}
            />
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Category</label><br />
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              style={{ width: '100%', padding: '10px', marginTop: '8px' }}
            >
              <option value="">Uncategorized</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.name}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div style={{ marginBottom: '20px' }}>
            <label>Choose Audio (mp3, wav) or Record</label><br />
            <input
              type="file"
              accept="audio/mp3, audio/wav, audio/webm"
              onChange={handleFileChange}
              style={{ marginTop: '8px' }}
            />
          </div>

          <div style={{ marginTop: '30px' }}>
            <button onClick={isRecording ? stopRecording : startRecording} style={{ width: '100%', padding: '12px', fontSize: '16px', backgroundColor: isRecording ? 'red' : '#333' }}>
              {isRecording ? "■ Stop Recording" : "● Start Recording"}
            </button>

            {isRecording && (
              <div style={{ marginTop: '20px' }}>
                <div style={{
                  backgroundColor: 'red',
                  height: '10px',
                  width: `${recordTime * 5}px`,
                  maxWidth: '100%',
                  transition: 'width 1s'
                }}></div>
                <div style={{ marginTop: '8px', fontSize: '14px', color: '#aaa' }}>
                  Recording... {recordTime}s
                </div>
              </div>
            )}
          </div>

          <div style={{ marginTop: '30px' }}>
            <button onClick={handleUpload} disabled={isUploading} style={{ width: '100%', padding: '12px', fontSize: '16px' }}>
              {isUploading ? "Uploading..." : "Upload Riff"}
            </button>
          </div>
        </div>

        <div style={{ flex: 1, minWidth: '300px', textAlign: 'center' }}>
          {/* Preview + Metronome Section */}
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
            <h3>Metronome</h3>

            <div id="metronome-light" style={{
              width: '30px',
              height: '30px',
              backgroundColor: lightColor,
              borderRadius: '50%',
              margin: '20px auto'
            }}></div>

            <div style={{ marginTop: '20px' }}>
              <input
                type="range"
                min="0"
                max="420"
                value={bpm}
                onChange={(e) => setBpm(e.target.value)}
                style={{ width: '80%' }}
              />
              <div style={{ marginTop: '8px' }}>{bpm} BPM</div>
            </div>

            <button onClick={() => setIsMetronomeOn(!isMetronomeOn)} style={{ marginTop: '20px' }}>
              {isMetronomeOn ? "Stop Metronome" : "Start Metronome"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateRiff;
