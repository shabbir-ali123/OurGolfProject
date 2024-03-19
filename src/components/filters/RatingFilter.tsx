import React, { useState } from 'react';

interface RatingFilterProps {
    onRatingChange: (rating: number | null) => void;
}


const RatingFilter: React.FC<RatingFilterProps> = ({ onRatingChange }) => {
    const [selectedRating, setSelectedRating] = useState<number | null>(null);

    const handleRatingSelect = (rating: number) => {
        const newRating = selectedRating === rating ? null : rating;
        setSelectedRating(newRating);
        onRatingChange(newRating); 
    };

    return (
        <div>
            <h3 className='text-start'>Rating</h3>
            <div className="flex space-x-2">

                {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                        key={rating}
                        className={`${(selectedRating ?? 0) >= rating ? 'bg-yellow-400' : 'bg-gray-200'
                            } p-2 rounded-full transition-colors duration-200`}
                        aria-pressed={(selectedRating ?? 0) >= rating}

                        onClick={() => handleRatingSelect(rating)}
                    >
                        {Array(rating)
                            .fill('★')
                            .map((_, index) => (
                                <span key={index} className="text-white text-sm">★</span>
                            ))}
                    </button>
                ))}
            </div>
        </div>

    );
};

export default RatingFilter;
