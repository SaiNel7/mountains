import React, { useState } from 'react';
import { mountains } from './data/mountains';
import MountainGallery from './components/MountainGallery';
import MountainModal from './components/MountainModal';
import './App.css';

function App() {
  const [selectedMountain, setSelectedMountain] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMountainClick = (mountain) => {
    setSelectedMountain(mountain);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMountain(null);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1 className="title">EIGHT-THOUSANDERS</h1>
        <h2 className="subtitle">Dare to Ascend</h2>
      </header>

      <MountainGallery 
        mountains={mountains} 
        onMountainClick={handleMountainClick} 
      />

      <MountainModal
        mountain={selectedMountain}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}

export default App; 