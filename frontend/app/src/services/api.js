const BASE_URL = 'http://localhost:8000/api'; // adjust your backend endpoint

export async function getRiffs() {
  const response = await fetch(`${BASE_URL}/riffs`);
  return response.json();
}

export async function getSongs() {
  const response = await fetch(`${BASE_URL}/songs`);
  return response.json();
}

export async function getCategories() {
  const response = await fetch(`${BASE_URL}/categories`);
  return response.json();
}

export async function uploadRiff(file, name, category) {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("name", name);
    formData.append("category", category);
  
    const response = await fetch(`${BASE_URL}/riffs/upload/`, {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Upload failed');
    }
  
    return await response.json();
  }