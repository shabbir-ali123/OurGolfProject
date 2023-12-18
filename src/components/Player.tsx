// Player.tsx
import React from 'react';

interface PlayerProps {
  showNumber: boolean;
}

const Player: React.FC<PlayerProps> = ({ showNumber }) => {
  return (
    <div className='flex justify-between items-center w-[130px] '>
      <div className='flex items-center'>
        <img
          className='rounded-[50%] w-9 h-[35.7px] object-cover '
          alt=''
          src='/img/ellipse-1310@2x.png'
        />
        <div className='pl-1 tracking-[1.45px] leading-[9.22px]'>
          Arthur
        </div>
      </div>

      {showNumber && (
        <div className='flex justify-center items-center rounded-[50%] bg-blueviolet w-[18px] h-[18px] tracking-[1.45px] leading-[9.22px] text-base text-white'>
          3
        </div>
      )}
    </div>
  );
};

export default Player;
