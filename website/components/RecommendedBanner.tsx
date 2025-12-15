"use client";
import { useEffect, useState } from 'react';

export default function RecommendedBanner() {
  const [show, setShow] = useState(false);
  useEffect(()=>{
    try {
      const params = new URLSearchParams(window.location.search);
      if (params.get('recommended') === '1') setShow(true);
    } catch {}
  },[]);
  if (!show) return null;
  return (
    <div className="mb-4 p-3 bg-yellow-50 border-l-4 border-yellow-300 text-yellow-800 rounded">Recommended for you</div>
  );
}
