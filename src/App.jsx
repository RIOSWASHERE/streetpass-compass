import { useState, useEffect } from 'react';
import ToolbarsTop from './components/ToolbarsTop';
import PremiumView from './components/PremiumView';
import './index.css';
import bezelImage from '/9623cefb7d598a874e9a9b282768d69ef76b5d5a.png';

// Person images and their LinkedIn profiles
const personImages = [
  { name: 'luca', image: '/luca.png', linkedin: 'https://www.linkedin.com/in/lucapfister/' },
  { name: 'nancy', image: '/nancy.png', linkedin: 'https://www.linkedin.com/in/n9liu/' },
  { name: 'allison', image: '/allison.png', linkedin: 'https://www.linkedin.com/in/allisonhuangg/' },
  { name: 'ivan', image: '/ivan.png', linkedin: 'https://www.linkedin.com/in/irim/' },
  { name: 'justin', image: '/justin.png', linkedin: 'https://www.linkedin.com/in/justindkim1060/' },
];

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [webcamStream, setWebcamStream] = useState(null);
  const [selectedPerson] = useState(() => {
    return personImages[Math.floor(Math.random() * personImages.length)];
  });

  useEffect(() => {
    let mediaStream = null;

    const startWebcam = async () => {
      try {
        mediaStream = await navigator.mediaDevices.getUserMedia({
          video: { 
            facingMode: 'user',
            width: { ideal: 320 },
            height: { ideal: 240 },
            frameRate: { ideal: 15 }
          },
          audio: false,
        });
        setWebcamStream(mediaStream);
      } catch (error) {
        console.error('Error accessing webcam:', error);
      }
    };

    startWebcam();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const handleViewPremium = () => {
    setCurrentView('premium');
  };

  const handleBack = () => {
    setCurrentView('home');
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-white flex items-center justify-center select-none">
      <div className="relative w-full h-full md:w-[402px] md:h-[874px] bg-white select-none">
        {currentView === 'home' ? (
          <ToolbarsTop selectedPerson={selectedPerson} onViewPremium={handleViewPremium} />
        ) : (
          <PremiumView selectedPerson={selectedPerson} onBack={handleBack} webcamStream={webcamStream} />
        )}
        {/* Bezel overlay */}
        <img
          src={bezelImage}
          alt="Phone bezel"
          className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full object-contain pointer-events-none z-50 scale-[1.12]"
        />
      </div>
    </div>
  );
}

export default App;
