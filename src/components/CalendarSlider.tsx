import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const CalendarSlider: React.FC = () => {
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(0);
  const [weeks, setWeeks] = useState<Date[]>([]);

  useEffect(() => {
    // Generate an array of dates for the next 8 weeks
    const currentDate = new Date();
    const next8Weeks = Array.from({ length: 8 }, (_, index) => {
      const weekStartDate = new Date(currentDate.getTime() + index * 7 * 24 * 60 * 60 * 1000);
      return weekStartDate;
    });

    setWeeks(next8Weeks);
  }, []);

  const handleSliderChange = (index: number) => {
    setSelectedWeekIndex(index);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto my-4">
      <h2 className="mb-4 text-xl font-semibold">Weekly Availability</h2>
      <Slider {...settings} beforeChange={(oldIndex: any, newIndex: any) => handleSliderChange(newIndex)}>
        {weeks.map((week, index) => {
          const dayName = new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(week);
          const dayNumber = index + 1; // Adjust if needed

          return (
            <div key={index} className="text-center">
              <p>{dayName} {dayNumber}</p>
              <p>{week.toLocaleDateString()}</p>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default CalendarSlider;
