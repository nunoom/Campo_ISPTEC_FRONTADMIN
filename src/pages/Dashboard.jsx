// src/components/Dashboard.jsx

import React from 'react';
import './Dashboard.css';
import MagicBento from '../components/MagicBento/MagicBento'


export default function Dashboard() {
  return (
    <div className="dashboard-container">
      <MagicBento 
  textAutoHide={true}
  enableStars={true}
  enableSpotlight={true}
  enableBorderGlow={true}
  enableTilt={true}
  enableMagnetism={true}
  clickEffect={true}
  spotlightRadius={300}
  particleCount={12}
  glowColor="132, 0, 255"
/>

  
    </div>
  );
}

