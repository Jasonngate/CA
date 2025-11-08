import React from 'react';

export default function InvoiceExtraction() { return null; }

export function simulateInvoice(file) {
  const delay = 2400 + (file.name.length % 7) * 250;
  return new Promise((resolve) => {
    setTimeout(() => {
      const fields = ['Invoice No', 'Date', 'GSTIN', 'Total', 'Tax'];
      resolve(`Invoice fields extracted from ${file.name}: ${fields.slice(0, 3 + (file.size % 3)).join(', ')}.`);
    }, delay);
  });
}
