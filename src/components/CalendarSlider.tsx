import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faArrowRight } from "@fortawesome/free-solid-svg-icons";

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
    style={{ right: "-24px", top: "0%", zIndex: 1, position: "absolute" }}
    onClick={onClick}
  >
    <FontAwesomeIcon
      icon={faArrowRight}
      style={{ background: "red", padding: "10px", borderRadius: "50%" }}
    />
  </div>
);

const CustomPrevArrow: React.FC = ({ onClick }: any) => (
  <div
    className="slick-arrow"
    style={{ position: "absolute", left: "-24px", zIndex: 1 }}
    onClick={onClick}
  >
    <FontAwesomeIcon
      icon={faArrowLeft}
      style={{ background: "red", padding: "10px", borderRadius: "50%" }}
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
  endOfWeek.setDate(date.getDate() - date.getDay() + 7);
  return endOfWeek;
};

const CalendarSlider: React.FC<CalendarSliderProps> = ({ onWeekSelected }) => {
  const [selectedWeekIndex, setSelectedWeekIndex] = useState<number>(0);
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [weeks, setWeeks] = useState<AvailabilityData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const currentDate = new Date();
      const next12Months = await Promise.all(
        Array.from({ length: 12 }, async (_, index) => {
          const monthStartDate = new Date(currentDate.getFullYear(), index, 1);
          const monthDays = await fetchAvailabilityData(monthStartDate);
          return monthDays;
        })
      ).then((data) => data.flat());

      setWeeks(next12Months);
    };

    fetchData();
  }, []);

  const handleSliderChange = (index: number) => {
    setSelectedWeekIndex(index);
    setSelectedDay(null);
  };

  useEffect(() => {
    // Use the updated state in the effect
    onWeekSelected(weeks[selectedWeekIndex]?.date);
  }, [selectedWeekIndex, weeks, onWeekSelected]);

  const handleDayClick = (dayIndex: number) => {
    const selectedDate = new Date(weeks[selectedWeekIndex].date);
    console.log(selectedDate.getDate() ,'    ' , dayIndex);
    selectedDate.setDate( dayIndex +1);
  
    // Calculate start and end of the selected week
    const startOfWeek = getStartOfWeek(selectedDate);
    const endOfWeek = getEndOfWeek(selectedDate);
  
    const dateFormatOptions: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };
  
    console.log("Selected Date:", selectedDate.toLocaleDateString("en-US", dateFormatOptions));
    console.log("Start of Week:", startOfWeek.toLocaleDateString("en-US", dateFormatOptions));
    console.log("End of Week:", endOfWeek.toLocaleDateString("en-US", dateFormatOptions));
  
    setSelectedDay(dayIndex);
    onWeekSelected(startOfWeek);
  };
  

  const settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 7,
    slidesToScroll: 7,
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
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    afterChange: (currentSlide: number) => {
      handleSliderChange(currentSlide);
    },
  };

  return (
    <div className="border-solid border-2 border-[#51ff85] p-2 my-4">
      <h2 className="mb-4 text-xl font-semibold">Yearly Availability</h2>
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
            <p>{day.dayName}</p>
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

const fetchAvailabilityData = async (
  date: Date
): Promise<AvailabilityData[]> => {
  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  return Array.from({ length: lastDay }, (_, dayIndex) => {
    const dayDate = new Date(date.getFullYear(), date.getMonth(), dayIndex + 1);
    return {
      date: dayDate,
      dayName: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(
        dayDate
      ),
      availability: Math.random() < 0.5,
    };
  });
};

export default CalendarSlider;
