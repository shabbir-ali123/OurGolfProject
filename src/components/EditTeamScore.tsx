import React from 'react';
import { useTranslation } from "react-i18next";
import { useNavigate } from 'react-router-dom';

type Product = {
    name: string;
    color: string;
    category: string;
    price: string;
};

const products: Product[] = [
    { name: 'PAR', color: '4', category: '4', price: '4' },

];

type EditTeamScoreProps = {
    hole: any;
    par: any;
};
const EditTeamScore: React.FC<EditTeamScoreProps> = ( {hole , par}) => {
    const newArrayHole = hole.split(",");
    const newArraypar = par.split(",");
    const navigate = useNavigate();

    if (!Array.isArray(newArrayHole) && !Array.isArray(newArraypar)) {
        
        return null; // Or render a fallback UI
      }
      
    const { t, i18n } = useTranslation();
    document.body.dir = i18n.dir();
    const handleNavigateHome = () => {
        navigate('/score-board'); // Assuming '/' is the path to your homepage
    };
    return (
        <div className='shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] py-20 px-10 my-10 w-full'>
             <div className="flex gap-4">
            <img
              className="w-[57px] h-[103px]"
              alt=""
              src="/img/rectangle-1248@2x.png"
            />
            <b className="relative left-[-24px] top-[35px] text-17xl text-darkslateblue-300 leading-[18px] [text-shadow:0px_7px_4px_#ccf2fe]">
              {t("SCORING_CATEGORY")}
            </b>
            <img
              className="w-[57px] h-[103px] object-cover"
              alt=""
              src="/img/flag.png"
            />
          </div>
            <div className="flex justify-center    sm:rounded-lg my-6">
            <table className=" text-sm text-left text-gray-500 dark:text-gray-400 w-full">
                <thead className="bg-[#054a51] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px] text-white rounded-lg">
                    <tr>
                        <th scope="col" className="px-2 py-3">HOLE</th>
                        {newArrayHole.map((score: any) => (
                             <th scope="col" className="px-2 py-3">{score}</th>
                        ))}

                    </tr>
                </thead>
                <tbody className=''>
                    {products.map((product, index) => (
                        <tr key={index} className='mt-10 shadow-md '>
                            <th scope="row" className="px-2 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                                {product.name}
                            </th>
                            {newArraypar.map((score: any) => (
                             <th scope="col" className="px-2 py-3">{score}</th>
                        ))}
                           
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            <button onClick={handleNavigateHome} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded cursor-pointer'>View Full Score</button>
        </div>
    );
};

export default EditTeamScore;
