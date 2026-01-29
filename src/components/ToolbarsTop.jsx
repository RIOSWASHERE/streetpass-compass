import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { imgImage20 } from '../svg-assets';

const ToolbarsTop = ({ selectedPerson, onViewPremium }) => {
  const [distance, setDistance] = useState(80);
  const prevDistanceRef = useRef(80);
  const autoAnimationRef = useRef(null);
  const [isRunAndHidePressed, setIsRunAndHidePressed] = useState(false);
  const runAndHideIntervalRef = useRef(null);

  const companies = [
    'Adobe',
    'Apple',
    'Google',
    'Microsoft',
    'Meta',
    'Amazon',
    'Netflix',
    'Spotify',
    'Airbnb',
    'Uber',
    'Tesla',
    'Nvidia',
    'Salesforce',
    'Oracle',
    'IBM',
    'Intel',
    'Samsung',
    'Sony',
    'Figma',
    'Shopify',
    'Stripe',
    'Square',
    'PayPal',
    'Twitter',
    'LinkedIn',
    'Pinterest',
    'Snapchat',
    'TikTok',
    'Discord',
    'Slack',
    'Dropbox',
    'Notion',
  ];

  const [companyName, setCompanyName] = useState(() => {
    return companies[Math.floor(Math.random() * companies.length)];
  });

  const buttonVariants = {
    tap: {},
  };

  const runAndHideButtonVariants = {
    tap: {
      backgroundColor: '#EFF3F6',
      borderColor: 'transparent',
      transition: {
        duration: 0.1,
      },
    },
  };

  // Calculate circle scale based on distance (inverse relationship)
  // When distance is 80, scale is 1.0
  // When distance is 12, scale is 1.51
  const circleScale = 1 + (0.6 * (80 - distance) / 80);

  // Flag for "super close" range where we want extra crazy motion
  const isVeryClose = distance <= 10;

  // Calculate base shake intensity based on bubble size
  // Shaking starts at scale 1.2 (distance ~46ft) and increases to max at scale 1.51 (distance = 12ft)
  const shakeThreshold = 1.2; // Start shaking when bubble reaches this scale
  const baseShakeIntensity = Math.max(0, (circleScale - shakeThreshold) * 13);

  // When we get super close (under 10ft), crank the shake up
  // so the circle can really jiggle around outside its background
  const shakeIntensity = isVeryClose ? baseShakeIntensity * 2.2 : baseShakeIntensity;
  // Slightly smaller shake value for the text so it wiggles but
  // doesn't become unreadable while the bubble is shaking
  const textShakeIntensity = shakeIntensity * 0.4;

  // Auto-animation: slowly decrease distance (person steps closer)
  useEffect(() => {
    // Clear any existing animation
    if (autoAnimationRef.current) {
      clearTimeout(autoAnimationRef.current);
      autoAnimationRef.current = null;
    }

    // Only start animation if distance is above minimum (6ft)
    if (distance <= 6) {
      return;
    }

    const autoAnimate = () => {
      setDistance((prev) => {
        // Stop at minimum distance (6ft)
        if (prev <= 6) {
          return prev;
        }
        // Move in 3ft chunks instead of 1ft so the number
        // on the bubble drops in bigger, more noticeable steps
        // and never goes below 6ft
        const newDistance = Math.max(6, prev - 3);
        prevDistanceRef.current = prev;
        
        // Continue animation if not at minimum
        if (newDistance > 12) {
          autoAnimationRef.current = setTimeout(autoAnimate, 600);
        }
        
        return newDistance;
      });
    };

    // Start auto-animation
    autoAnimationRef.current = setTimeout(autoAnimate, 600);

    return () => {
      if (autoAnimationRef.current) {
        clearTimeout(autoAnimationRef.current);
        autoAnimationRef.current = null;
      }
    };
  }, [distance]);

  const incrementDistance = () => {
    setDistance((prev) => {
      // Run & Hide button also moves in 3ft chunks so the
      // distance always changes by the same sized steps
      const newDistance = Math.min(80, prev + 3);
      prevDistanceRef.current = prev;
      return newDistance;
    });
  };

  const handleMouseDown = () => {
    setIsRunAndHidePressed(true);
    // Increment immediately on press
    incrementDistance();
  };

  const handleMouseUp = () => {
    setIsRunAndHidePressed(false);
  };

  const handleMouseLeave = () => {
    setIsRunAndHidePressed(false);
  };

  // Continuous increment while button is held
  useEffect(() => {
    if (isRunAndHidePressed) {
      // Start interval to continuously increment
      runAndHideIntervalRef.current = setInterval(() => {
        incrementDistance();
      }, 100); // Increment every 100ms
    } else {
      // Clear interval when button is released
      if (runAndHideIntervalRef.current) {
        clearInterval(runAndHideIntervalRef.current);
        runAndHideIntervalRef.current = null;
      }
    }

    return () => {
      if (runAndHideIntervalRef.current) {
        clearInterval(runAndHideIntervalRef.current);
        runAndHideIntervalRef.current = null;
      }
    };
  }, [isRunAndHidePressed]);

  return (
    <div
      className="bg-white relative w-full h-full select-none min-w-[320px]"
      data-name="Toolbars - Top"
      data-node-id="102:1298"
    >

      {/* Text content container */}
      <div className="absolute left-[8%] md:left-[32px] top-[10%] md:top-[102px] w-[84%] max-w-[calc(100%-16%)] md:w-[353px] flex flex-col gap-2 md:gap-3">
        {/* Main headline */}
        <p
          className="font-medium leading-[0.9] text-[36px] text-black whitespace-pre-wrap"
          data-node-id="102:1311"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          LinkedIn Maxxing
        </p>

        {/* Subtitle */}
        {/* Supporting subtitle under the main headline */}
        {/* We bump the line-height slightly so the two lines
            ("Finding hiring managers..." and "Purchase ...")
            have a bit more breathing room between them. */}
        <p
          className="font-normal leading-[1.5] text-[16px] text-[#6B7280] whitespace-pre-wrap md:w-[334px]"
          data-node-id="102:1318"
        >
          {/* First line of helper copy */}
          Finding hiring managers near you...
          <br />
          {/* Second line: swap the word "Premium" for the LinkedIn Premium logo */}
          Purchase{' '}
          <span className="inline-flex items-center align-middle">
            <span className="sr-only">LinkedIn Premium</span>
            <div
              className="h-[20.741px] w-[20px] relative flex-shrink-0 rounded inline-block align-middle"
              data-name="image 20"
            >
              <div className="absolute inset-0 overflow-hidden pointer-events-none rounded">
                <img
                  alt="LinkedIn Premium"
                  className="absolute h-[3334.23%] left-[-1179.8%] max-w-none top-[-755.43%] w-[1521.89%]"
                  src={imgImage20}
                />
              </div>
            </div>
          </span>{' '}
          to view the full profile picture.
        </p>
      </div>

      {/* Content and connection details container */}
      <div className="absolute left-[8%] md:left-[32px] top-[28%] md:top-[241px] w-[84%] max-w-[calc(100%-16%)] md:w-[338px] flex flex-col gap-4 md:gap-0">
        {/* Main content area - Frame 30 */}
        {/* We only clip overflow while the circle is farther away.
            Once the distance drops below 10ft, we stop clipping so
            the shaking circle can visibly escape the background card. */}
        <div
          className={`bg-[#eff3f6] h-[50vh] md:h-[440px] rounded-[8px] relative ${isVeryClose ? '' : 'overflow-hidden'}`}
          data-name="Frame 30"
          data-node-id="102:1312"
        >
        {/* Circular element wrapper for centering */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-[61px] md:top-[112px] md:translate-x-0 md:translate-y-0 w-[80%] max-w-[216px] md:w-[216px] h-[80%] max-h-[216px] md:h-[216px] relative flex items-center justify-center">
          {/* Pulsating ripple ring that expands outside the profile picture */}
          <motion.div
            className="absolute rounded-full border border-[rgba(44,100,186,0.25)]"
            style={{ width: '120%', height: '120%' }}
            animate={{
              scale: [1, 1.3, 1.6],
              opacity: [0.5, 0.25, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeOut',
            }}
          />

          {/* Main bubble that holds the blurred avatar and distance text */}
          <motion.div
            className="w-full h-full rounded-full overflow-hidden bg-[#F8FAFB]"
            data-name="Ellipse 5"
            data-node-id="102:1313"
            animate={{
              scale: circleScale,
              x: [
                -shakeIntensity,
                shakeIntensity,
                -shakeIntensity,
                shakeIntensity,
                -shakeIntensity,
                0,
              ],
              y: [
                shakeIntensity,
                -shakeIntensity,
                shakeIntensity,
                -shakeIntensity,
                shakeIntensity,
                0,
              ],
            }}
          transition={{
            scale: {
              type: "spring",
              stiffness: 2000,
              damping: 30,
              mass: 10,
            },
            x: {
              duration: 0.35,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
            },
            y: {
              duration: 0.35,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "linear",
              delay: 0.175,
            },
          }}
        >
          {/* Container with white background - centered */}
          <div 
            className="absolute bg-white overflow-clip rounded-[105.6px] w-[180.849px] h-[180.849px] left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            data-name="Container"
            data-node-id="102:1319"
          >
            {/* Blurred image container */}
            <div 
              className="absolute blur-[15px] left-[calc(50%-0.5px)] rounded-[105.6px] w-[194.144px] h-[194.144px] top-[-14.57px] translate-x-[-50%]"
              data-name="Container"
              data-node-id="102:1320"
            >
              <div className="absolute inset-0 pointer-events-none rounded-[105.6px]">
                <div className="absolute bg-white inset-0 rounded-[105.6px]" />
                <img 
                  alt="" 
                  className="absolute max-w-none object-cover rounded-[105.6px] w-full h-full" 
                  src={selectedPerson.image} 
                />
              </div>
            </div>
            
            {/* 20ft text overlay */}
            <div 
              className="absolute flex h-[44.34px] items-center justify-center left-[calc(50%-36.68px)] top-[calc(50%-22.59px)] w-[72.207px]"
              data-node-id="102:1321"
            >
              <div className="flex-none" style={{ transform: 'rotate(359.729deg)' }}>
                <motion.p 
                  className="font-medium font-semibold leading-[normal] not-italic relative text-[36px] text-white whitespace-pre flex items-center"
                  data-node-id="102:1321"
                  animate={{
                    x: [
                      -textShakeIntensity,
                      textShakeIntensity,
                      -textShakeIntensity,
                      textShakeIntensity,
                      0,
                    ],
                    y: [
                      textShakeIntensity,
                      -textShakeIntensity,
                      textShakeIntensity,
                      -textShakeIntensity,
                      0,
                    ],
                  }}
                  transition={{
                    duration: 0.35,
                    repeat: Infinity,
                    repeatType: "reverse",
                    ease: "linear",
                  }}
                >
                  {(() => {
                    const currentDigits = distance.toString().split('');
                    const prevDigits = prevDistanceRef.current.toString().split('');
                    
                    // Determine animation direction based on whether distance is increasing or decreasing
                    const isDecreasing = distance < prevDistanceRef.current;
                    const animationYStart = isDecreasing ? -20 : 20;
                    const animationYEnd = isDecreasing ? 20 : -20;
                    
                    // Compare digits aligned from the right (ones place aligned)
                    // This prevents glitches when transitioning between 9->10, 69->70, etc.
                    const maxLength = Math.max(currentDigits.length, prevDigits.length);
                    
                    return currentDigits.map((digit, index) => {
                      // Calculate position from right (ones=0, tens=1, hundreds=2, etc.)
                      const positionFromRight = currentDigits.length - 1 - index;
                      
                      // Find corresponding digit from previous number at same position from right
                      const prevIndex = prevDigits.length - 1 - positionFromRight;
                      const prevDigit = prevIndex >= 0 ? prevDigits[prevIndex] : null;
                      
                      // Check if this digit changed
                      const hasChanged = prevDigit === null || digit !== prevDigit;
                      
                      // Use position from right as key to maintain stability across digit count changes
                      return (
                        <AnimatePresence mode="popLayout" key={`pos-${positionFromRight}`}>
                          {hasChanged ? (
                            <motion.span
                              key={`${distance}-${positionFromRight}`}
                              className="inline-block min-w-[0.5em]"
                              initial={{ y: animationYStart, opacity: 0 }}
                              animate={{ y: 0, opacity: 1 }}
                              exit={{ y: animationYEnd, opacity: 0 }}
                              transition={{
                                duration: 0.2,
                                ease: [0.4, 0, 0.2, 1],
                              }}
                            >
                              {digit}
                            </motion.span>
                          ) : (
                            <span key={`${positionFromRight}-${digit}-static`} className="inline-block min-w-[0.5em]">{digit}</span>
                          )}
                        </AnimatePresence>
                      );
                    });
                  })()}
                  <span className="text-[rgba(255,255,255,0.5)]">ft</span>
                </motion.p>
              </div>
            </div>
          </div>
        </motion.div>
        </div>
        </div>

        {/* Connection details - Group 155 */}
        <div
          className="flex items-center gap-2 md:absolute md:left-0 md:top-[452px]"
          data-name="Group 155"
          data-node-id="102:1322"
        >
        <p
          className="font-medium leading-[normal] text-[17px] text-black whitespace-pre"
          data-node-id="102:1323"
          style={{ fontVariationSettings: "'wdth' 100" }}
        >
          Someone from {companyName}
        </p>
        <div
          className="h-[20.741px] w-[20px] relative flex-shrink-0 rounded"
          data-name="image 20"
          data-node-id="102:1324"
        >
          <div className="absolute inset-0 overflow-hidden pointer-events-none rounded">
            <img
              alt="LinkedIn"
              className="absolute h-[3334.23%] left-[-1179.8%] max-w-none top-[-755.43%] w-[1521.89%]"
              src={imgImage20}
            />
          </div>
        </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="absolute left-[8%] md:left-[32px] top-[88%] md:top-[755px] w-[84%] max-w-[calc(100%-16%)] md:w-auto flex gap-2 md:gap-[11px]">
        <motion.button
          onClick={onViewPremium}
          className="bg-[#2c64ba] flex items-center justify-center flex-[3] md:flex-none px-[24px] py-[16px] rounded-[100px] cursor-pointer md:w-[195px] outline-none no-underline"
          data-name="Frame 28"
          data-node-id="102:1314"
          variants={buttonVariants}
          whileTap="tap"
          tabIndex={0}
          aria-label="View with Premium"
        >
          <p
            className="font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-white whitespace-pre"
            data-node-id="102:1315"
          >
            View with Premium
          </p>
        </motion.button>

        <motion.div
          className={`border border-solid flex items-center justify-center flex-[2] md:flex-none px-[24px] py-[16px] rounded-[100px] cursor-pointer bg-white md:w-[132px] outline-none transition-colors duration-100 ${isRunAndHidePressed ? 'border-transparent' : 'border-[#404040]'}`}
          data-name="Frame 29"
          data-node-id="102:1316"
          variants={runAndHideButtonVariants}
          whileTap="tap"
          onMouseDown={handleMouseDown}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
        >
          <p
            className="font-medium leading-[normal] not-italic relative shrink-0 text-[16px] text-black whitespace-pre"
            data-node-id="102:1317"
          >
            Run & Hide
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default ToolbarsTop;
