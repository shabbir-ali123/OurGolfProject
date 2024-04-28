import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

interface AvailabilityData {
  date: Date;
  dayName: string;
  availability: boolean;
}

interface CalendarSliderProps {
  onWeekSelected: (date: Date) => void;
}

const CustomNextArrow: React.FC = ({ onClick }: any) => (
  <div
    className="slick-arrow"
    style={{ right: "4px", top: "0%", zIndex: 1, position: "absolute" }}
    onClick={onClick}
  >
    <FontAwesomeIcon
      icon={faArrowRight}
      style={{ background: "#51ff85", padding: "10px", borderRadius: "50%" }}
    />
  </div>
);

const CustomPrevArrow: React.FC = ({ onClick }: any) => (
  <div
    className="slick-arrow"
    style={{ position: "absolute", left: "4px", zIndex: 1 }}
    onClick={onClick}
  >
    <FontAwesomeIcon
      icon={faArrowLeft}
      style={{ background: "#51ff85", padding: "10px", borderRadius: "50%" }}
    />
  </div>
);

const getStartOfWeek = (date: Date): Date => {
  const startOfWeek = new Date(date);
  startOfWeek.setDate(date.getDate() );
  return startOfWeek;
};

const getEndOfWeek = (date: Date): Date => {
  const endOfWeek = new Date(date);

  endOfWeek.setDate(date.getDate() + 6);
  return endOfWeek;
};

const CalendarSlider: React.FC<CalendarSliderProps> = ({ onWeekSelected }) => {
  const {t } = useTranslation();

  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [weeks, setWeeks] = useState<AvailabilityData[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date(); 
      const startOfCurrentWeek = getStartOfWeek(currentDate); 
  
      const weeksData = await Promise.all(
        Array.from({ length: 52 }, async (_, index) => { 
          const weekStartDate = new Date(
            startOfCurrentWeek.getFullYear(),
            startOfCurrentWeek.getMonth(),
            startOfCurrentWeek.getDate() + (index * 7) 
          );
          const weekDays = await fetchAvailabilityData(weekStartDate);
          return weekDays;
        })
      ).then((data) => data.flat());
      setWeeks(weeksData);
    };
    fetchData();
  }, []);

  const handleSliderChange = (index: number) => {
    setSelectedWeekIndex(index);
    setSelectedDay(null);
  };

  useEffect(() => {
    onWeekSelected(weeks[selectedWeekIndex]?.date);
  }, [selectedWeekIndex, weeks, onWeekSelected]);

  const handleDayClick = (dayIndex: number) => {
    const selectedDate = new Date(weeks[selectedWeekIndex].date);
    selectedDate.setDate( dayIndex +1);
    const startOfWeek = getStartOfWeek(selectedDate);
  
    setSelectedDay(dayIndex);
    onWeekSelected(startOfWeek);
  };
  

  const settings = {
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
          dots: false,
        },
      },
    ],
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    afterChange: (currentSlide: number) => {
      handleSliderChange(currentSlide);
    },
  };

  return (
    <div className=" xl:mx-0 border-solid border-2 border-[#51ff85] p-2 my-4">
      <h2 className="mb-4 text-xl font-semibold">{t('WEEKLY_AVAILIBILTY')}</h2>
      <Slider
        {...settings}
        beforeChange={(oldIndex: any, newIndex: any) =>
          handleSliderChange(newIndex)
        }
      >
        {weeks.map((day, index) => (
          <div
            key={index}
            className={`text-center ${
              selectedDay === index ? "selected-day" : ""
            }`}
            onClick={() => handleDayClick(index)}
          >
            <p>{t(day.dayName.toLocaleUpperCase())}</p>
            <p>{day.date.toLocaleDateString()}</p>
          </div>
        ))}
      </Slider>
      <style>{`
        .selected-day {
          background-color: #b2c3fd;
        }
      `}</style>
    </div>
  );
};

const fetchAvailabilityData = async (startDate: Date): Promise<AvailabilityData[]> => {

  return Array.from({ length: 7 }, (_, dayIndex) => {
    const dayDate = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate() + dayIndex);

    return {
      date: dayDate,
      dayName: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(dayDate),
      availability: Math.random() < 0.5,
    };
  });
};



export default CalendarSlider;
