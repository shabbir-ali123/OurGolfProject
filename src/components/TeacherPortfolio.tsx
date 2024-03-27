// VideoPortfolio.tsx
import React from 'react';

const videos = [
  '/video/video.mp4', // Assuming your app is hosted at the root of the domain
  '/video/video.mp4',
  '/video/intro.webm',
  '/video/video.mp4',
  '/video/video.mp4',
];

const VideoPortfolio: React.FC = () => {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-4">Video Portfolio</h2>
        <div className="grid grid-cols-1  sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-5 gap-4">
          {videos.map((video, index) => (
            <div key={index} className="bg-gray-200 rounded-lg shadow-md relative w-full">
              <video className="w-full h-[170px]" controls preload="none">
                <source src={video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default VideoPortfolio;
  
