import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const PremiumView = ({ selectedPerson, onBack, webcamStream }) => {
  const videoRef = useRef(null);

  const buttonVariants = {
    tap: {
      scale: 0.98,
    },
  };

  useEffect(() => {
    if (videoRef.current && webcamStream) {
      videoRef.current.srcObject = webcamStream;
    }
  }, [webcamStream]);

  return (
    <div
      className="relative w-full h-full select-none min-w-[320px] overflow-hidden"
      data-name="Premium View"
      style={{
        background: 'linear-gradient(to bottom, #FFF9E6 0%, #FFFFFF 50%)',
      }}
    >

      {/* Close button */}
      <button
        onClick={onBack}
        className="absolute left-[8%] md:left-[24px] top-[6%] md:top-[21px] w-[24px] h-[24px] flex items-center justify-center cursor-pointer outline-none bg-transparent border-none p-0 z-10"
        tabIndex={0}
        aria-label="Close"
      >
      </button>

      {/* Main content container */}
      <div className="absolute left-[8%] md:left-[32px] top-[12%] md:top-[82px] w-[84%] max-w-[calc(100%-16%)] md:w-[338px] flex flex-col gap-6 md:gap-8">
        
        {/* LinkedIn sparkle decorative element */}
        <div className="relative w-full flex items-center justify-center">
          <div className="relative w-[216px] h-[216px] flex items-center justify-center">
            {/* Webcam video - circular, behind sparkle */}
            <div className="absolute left-1/2 top-1/2 w-[59%] h-[59%] rounded-full overflow-hidden z-0" style={{ transform: 'translate(-50%, calc(-50% + 8px))' }}>
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                className="w-full h-full object-cover"
                style={{ transform: 'scaleX(-1.5) scaleY(1.5)' }}
              />
            </div>
            {/* LinkedIn sparkle on top */}
            <img
              src="/linkedin-sparkle.svg"
              alt="LinkedIn sparkle"
              className="absolute inset-0 w-full h-full object-contain scale-110 z-10"
            />
          </div>
        </div>

        {/* Main heading - left aligned */}
        <h1
          className="font-bold leading-[1.2] text-[36px] text-[#1E1E1E] text-left whitespace-pre-wrap w-full"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Grow your{'\n'}network faster.
        </h1>

        {/* Descriptive text - left aligned */}
        <div className="flex flex-col gap-3 w-full">
          <p className="font-normal leading-[normal] text-[16px] text-[#1E1E1E] text-left whitespace-pre-wrap">
            Premium subscribers get 6x more profile views with access to Streetpass.
          </p>
          <p className="font-normal leading-[normal] text-[16px] text-[#1E1E1E] text-left whitespace-pre-wrap">
            <span className="font-bold">Plus!</span> Get exclusive opportunities to network with people IRL!
          </p>
        </div>

        {/* Social proof section - left aligned */}
        <div className="flex items-center gap-3 w-full">
          <div className="flex -space-x-2 flex-shrink-0">
            <div className="w-[32px] h-[32px] rounded-full border-2 border-white overflow-hidden">
              <img src="/nancy.png" alt="Nancy" className="w-full h-full object-cover" />
            </div>
            <div className="w-[32px] h-[32px] rounded-full border-2 border-white overflow-hidden">
              <img src="/allison.png" alt="Allison" className="w-full h-full object-cover" />
            </div>
            <div className="w-[32px] h-[32px] rounded-full border-2 border-white overflow-hidden">
              <img src="/luca.png" alt="Luca" className="w-full h-full object-cover" />
            </div>
          </div>
          <p className="font-normal leading-[normal] text-[14px] text-[#6F6F6F] text-left whitespace-pre-wrap flex-1">
            Nancy and millions of other members use Premium
          </p>
        </div>
      </div>

      {/* Action buttons - bottom section */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-[34px] md:bottom-[50px] w-[84%] max-w-[calc(100%-16%)] md:w-[338px] flex flex-col gap-3 items-center">
        {/* Pre-button text */}
        <p className="font-normal leading-[normal] text-[14px] text-[#6F6F6F] text-center">
          1-month free. Cancel anytime, hassle-free.
        </p>

        <motion.a
          href={selectedPerson.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#FFB854] flex items-center justify-center w-full px-[24px] py-[16px] rounded-[100px] cursor-pointer outline-none no-underline"
          variants={buttonVariants}
          whileTap="tap"
          tabIndex={0}
          aria-label="Try Premium for $0"
        >
          <p className="font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-[#1E1E1E] whitespace-pre">
            Try Premium for $0
          </p>
        </motion.a>

        <motion.button
          onClick={onBack}
          className="bg-transparent border-none flex items-center justify-center w-full px-[24px] py-[12px] cursor-pointer outline-none"
          variants={buttonVariants}
          whileTap="tap"
          tabIndex={0}
          aria-label="I'll pass"
        >
          <p className="font-bold leading-[normal] not-italic relative shrink-0 text-[16px] text-[#1E1E1E] whitespace-pre">
            I'll pass
          </p>
        </motion.button>
      </div>
    </div>
  );
};

export default PremiumView;
