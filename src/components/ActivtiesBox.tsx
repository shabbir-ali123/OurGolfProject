import React from 'react';

interface ActivtiesBoxProps {
  imageUrl: string;
  description: string;
  bgColor: string;
  borderColor: string;
}

const ActivtiesBox: React.FC<ActivtiesBoxProps> = ({ imageUrl, description, bgColor, borderColor }) => {
  return (
    <div className={ ` px-2 bg-${bgColor} border border-${borderColor} shadow-lg rounded-lg border-solid mt-3`} style={{backgroundColor: bgColor , border:borderColor}}>
      <div className="flex items-center">
        <img
          src={imageUrl}
          alt="Profile"
          className="h-10 w-10 rounded-full mr-4"
        />
        <div>
          <p className="text-gray-600 font-product-sans font-normal text-xl">{description}</p>
        </div>
      </div>
    </div>  
  );
};

export default ActivtiesBox;
