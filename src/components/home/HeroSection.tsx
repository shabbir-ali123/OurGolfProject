import React, { useState, useRef } from 'react';

interface HeroSectionProps {
  videoSrc: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({ videoSrc }) => {
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<HTMLVideoElement>(null);

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="relative mx-4 xl:mx-20 h-[72vh] overflow-hidden">
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        controls
        autoPlay
        className="w-full h-full object-cover"
      />
     <button
        onClick={togglePlay}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#17b3a6] bg-opacity-50 rounded-full  text-white py-[12px] px-[13px]"
        aria-label={isPlaying ? 'Pause video' : 'Play video'}
      >
        {isPlaying ? (
          <svg viewBox="0 0 24 24" fill="currentColor" width="32px" height="32px">
            <path d="M6 6h12v12H6z"></path>
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="currentColor" width="32px" height="32px">
            <path d="M8 5v14l11-7z"></path>
          </svg>
        )}
      </button>
    </div>
  );
};

export default HeroSection;
