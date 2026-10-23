const BASE = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export async function api(path, options = {}) {
  const token = localStorage.getItem('token');
  const res = await fetch(BASE + path, {
    method: options.method || 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {})
    },
    body: options.body ? JSON.stringify(options.body) : undefined
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Request failed');
  return data;
}

// Downloads a file (PDF) from the API and saves it to the device.
export async function downloadFile(path, fallbackName) {
  const token = localStorage.getItem('token');
  const res = await fetch(BASE + path, { headers: token ? { Authorization: 'Bearer ' + token } : {} });
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || 'Download failed');
  }
  const cd = res.headers.get('Content-Disposition') || '';
  const m = /filename="?([^";]+)"?/.exec(cd);
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = (m && m[1]) || fallbackName;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 2000);
}
