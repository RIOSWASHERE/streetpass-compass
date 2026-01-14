import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ToolbarsTop from './components/ToolbarsTop';
import PremiumView from './components/PremiumView';
import { imgCellularConnection, imgWifi, imgFrame } from './svg-assets';
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

  const transitionVariants = {
    initial: {
      scale: 0.995,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: [0.34, 1.56, 0.64, 1], // Bounce easing
      },
    },
    exit: {
      scale: 0.995,
      opacity: 0,
      transition: {
        duration: 0.2,
        ease: 'easeIn',
      },
    },
  };

  return (
    <div className="w-screen h-screen overflow-hidden bg-white flex items-center justify-center select-none">
      <div className="relative w-full h-full md:w-[402px] md:h-[874px] md:scale-90 bg-white select-none">
        {/* Status bar - outside animated container */}
        <div className="hidden md:flex absolute items-center justify-between left-0 pb-[19px] pt-[21px] px-[24px] right-0 top-0 z-10">
          <div className="flex h-[22px] items-center justify-center pb-0 pt-[1.5px] px-0 relative w-[100px]">
            <p
              className="font-semibold leading-[22px] relative shrink-0 text-[17px] text-black text-center whitespace-pre"
              style={{ fontVariationSettings: "'wdth' 100" }}
            >
              9:41
            </p>
          </div>
          <div className="flex gap-[7px] h-[22px] items-center justify-center pb-0 pl-0 pr-0 pt-0 relative w-[100px]">
            <img alt="" className="block max-w-none h-[12px] w-[18px]" src={imgWifi} />
            <img alt="" className="block h-[12px] w-[18px]" src={imgFrame} />
            <img alt="" className="block h-[12px] w-[24px]" src={imgCellularConnection} />
          </div>
        </div>

        {/* Home Indicator - outside animated container */}
        <div className="hidden md:block absolute bottom-0 h-[34px] left-0 right-0 z-10">
          <div className="absolute bottom-[8px] flex h-[5px] items-center justify-center left-1/2 translate-x-[-50%] w-[144px]">
            <div className="flex-none rotate-[180deg] scale-y-[-100%]">
              <div className="bg-black h-[5px] rounded-[100px] w-[144px]" />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {currentView === 'home' ? (
            <motion.div
              key="home"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={transitionVariants}
              className="absolute inset-0"
            >
              <ToolbarsTop selectedPerson={selectedPerson} onViewPremium={handleViewPremium} />
            </motion.div>
          ) : (
            <motion.div
              key="premium"
              initial="initial"
              animate="animate"
              exit="exit"
              variants={transitionVariants}
              className="absolute inset-0"
            >
              <PremiumView selectedPerson={selectedPerson} onBack={handleBack} webcamStream={webcamStream} />
            </motion.div>
          )}
        </AnimatePresence>
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
