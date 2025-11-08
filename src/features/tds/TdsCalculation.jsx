import React from 'react';

export default function TdsCalculation() {
  return null;
}

export function simulateTds(file) {
  const delay = 2000 + (file.name.length % 5) * 350;
  return new Promise((resolve) => {
    setTimeout(() => {
      const amt = ((file.size % 10000) / 100).toFixed(2);
      resolve(`TDS calculated for ${file.name}. Estimated TDS: ₹${amt}.`);
    }, delay);
  });
}
