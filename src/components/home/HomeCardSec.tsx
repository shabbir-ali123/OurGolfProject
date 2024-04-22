import React from 'react';
import HomeCard from './HomeCard'; // Ensure the path is correct based on your project structure
import Steps from "./Steps";

const HomeCardSec: React.FC = () => {
    const offerings = [
        {
          title: "You can find golf teachers",
          description: "Learn golf with experienced instructors in a professional environment."
        },
        {
          title: "You can post current news",
          description: "Join our club to enjoy exclusive benefits and access to premier facilities."
        },
        {
          title: "Find teacher by Location, Rating, Skills and availability.",
          description: "Get the latest golf gear and apparel from top brands at our pro shop."
        },
        {
          title: "Direct connection with teacher via phone, email.",
          description: "Host your events at our beautiful golf course with full-service catering."
        }
    ];

    const additionalOfferings = [
        {
          title: "You can find event",
          description: "Participate in exciting tournaments and compete with other members."
        },
        {
          title: "Update yourself with latest golf news .",
          description: "Special golf training programs for juniors aged 6 to 18."
        },
        {
          title: "You can book appointment  with teacher easily ",
          description: "Join us for exclusive golfing events and networking on Women's Golf Day."
        }
    ];

    return (
        <div className="xl:container mx-auto px-4 py-10">
            <h2 className="text-center text-[#17B3A6] text-[32px] font-medium my-8">This is Golf website, Please check our offerings</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
                {offerings.map((offering, index) => (
                    <HomeCard key={index} title={offering.title} description={offering.description} />
                ))}
            </div>
            <Steps />
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mt-8">
                {additionalOfferings.map((offering, index) => (
                    <HomeCard key={index} title={offering.title} description={offering.description} />
                ))}
            </div>
        </div>
    );
};

export default HomeCardSec;
