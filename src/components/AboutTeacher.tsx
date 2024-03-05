// AboutTeacher.tsx
import { HandThumbUpIcon, MapPinIcon, PhoneArrowUpRightIcon, EnvelopeIcon, StarIcon } from '@heroicons/react/24/outline';
import React from 'react';

interface AboutTeacherProps {

}

const AboutTeacher: React.FC<AboutTeacherProps> = ({

}) => {
    return (
        <div className="py-4  rounded  text-red ">
            <div>
                <div>
                    <h3 className='font-semibold mb-4 text-lg text-[#565656]'>About Me</h3>
                    <p className='leading-6 text-[#565656]'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur facilis hic repudiandae possimus tenetur, accusamus, eius fugit quis laboriosam alias, nemo debitis! Laudantium dignissimos pariatur, eaque, expedita perferendis debitis consequuntur sint, placeat doloribus voluptates optio culpa! Ipsam quae aperiam natus!</p>
                </div>
                <div>

                </div>
            </div>


        </div>
    );
};

export default AboutTeacher;
