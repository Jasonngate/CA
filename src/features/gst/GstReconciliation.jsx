import React from 'react';
import { API_URL } from '../../config';

export default function GstReconciliation() { return null; }

// Post file to backend and trigger download of processed _checked.xlsx
export async function simulateGst(file) {
  // Quick guard: Only .xlsx supported by backend
  if (!/\.xlsx$/i.test(file.name)) {
    throw new Error('Please upload an .xlsx file for GST reconciliation.');
  }
  const form = new FormData();
  form.append('file', file);
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 45000); // 45s timeout
  try {
    const res = await fetch(`${API_URL}/api/gst/check`, {
      method: 'POST',
      body: form,
      signal: controller.signal,
    });
    if (!res.ok) {
      const errText = await safeReadText(res);
      throw new Error(errText || `GST check failed (${res.status})`);
    }
    const blob = await res.blob();
    const cd = res.headers.get('content-disposition') || '';
    const filename = parseFilenameFromCD(cd) || file.name.replace(/\.xlsx$/i, '') + '_checked.xlsx';
    triggerDownload(blob, filename);
    return `Downloaded ${filename}`;
  } catch (e) {
    if (e?.name === 'AbortError') {
      throw new Error('Request timed out. Please try again or check the backend server.');
    }
    throw e;
  } finally {
    clearTimeout(timeout);
  }
}

function triggerDownload(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function parseFilenameFromCD(cd) {
  const match = /filename\*=UTF-8''([^;]+)|filename="?([^";]+)"?/i.exec(cd);
  if (match) {
    return decodeURIComponent(match[1] || match[2] || '').trim();
  }
  return null;
}

async function safeReadText(res) {
  try { return await res.text(); } catch { return ''; }
}
