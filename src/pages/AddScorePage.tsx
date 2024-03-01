import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface GolfScoreProps {
  onSaveScores?: (scores: number[]) => void; // Optional, implement if needed
}

const GolfScoreInput: React.FC<GolfScoreProps> = ({ onSaveScores }) => {
  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();
  const [scores, setScores] = useState<number[]>(new Array(18).fill(0));
  const pars = [4, 3, 5, 4, 4, 3, 5, 4, 4, 3, 5, 4, 4, 3, 5, 4, 4, 3]; 

  const handleScoreChange = (index: number, newScore: number) => {
    const updatedScores = [...scores];
    updatedScores[index] = newScore;
    setScores(updatedScores);
  };

  const calculateTotalPar = () => pars.reduce((acc, curr) => acc + curr, 0);

  const calculateTotalScore = () => scores.reduce((acc, curr) => acc + curr, 0);

  const multiplyParByThree = () => calculateTotalPar() * 3;

  const calculateSubtraction = () => multiplyParByThree() - calculateTotalPar();

  const calculateHDCP = () => calculateSubtraction() * 0.8;

  const holes = Array.from({ length: 18 }, (_, index) => index + 1);

  const renderScoreInputs = () => scores.map((score, index) => (
    <td key={`score-${index}`}>
      <input
        type="number"
        min="0"
        value={score}
        onChange={(e) => handleScoreChange(index, parseInt(e.target.value))}
        className="w-10 text-center border border-solid border-[#054a51] bg-white shadow-lg"
      />
    </td>
  ));

  return (
    <div className='max-w-7xl mx-auto'>
      <div className="flex items-center gap-10">
        <div className="relative w-[90.5px] h-[147.5px]">
          <img
            className="absolute top-[60px] left-[0px] w-[90.5px] h-[87.5px]"
            alt=""
            src="/img/ellipse-2303.svg"
          />
          <img
            className="absolute top-[0px] left-[22.5px] w-[58px] h-[108px] object-cover"
            alt=""
            src="/img/rectangle-1249@2x.png"
          />
        </div>
        <h2 className="tracking-[0.04em] leading-[18px] font-semibold  [text-shadow:0px_7px_4px_#17b3a6] text-21xl"> {t('ADD_SCORE')}</h2>
      </div>
      <p>Scoring Type: <span className='font-bold'>Double Peria</span> </p>
      <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full">
        <thead className="bg-[#054a51] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px] text-white rounded-lg">
          <tr>
            <th className="px-2 py-3 text-center">HOLE</th>
            {holes.map(hole => <th className='text-center' key={hole}>{hole}</th>)}
            <th className='text-center px-2 py-3'>Total</th>
            <th className='text-center px-2 py-3'>HDCP</th>
            <th className='text-center px-2 py-3'>Net</th>
          </tr>
          <tr>
            <th className="px-2 py-3">PAR</th>
            {pars.map((par, index) => <td className='text-center' key={`par-${index}`}>{par}</td>)}
            <td className='text-center font-bold'>{calculateTotalPar()}</td>
            <td className='text-center font-bold'>{calculateHDCP().toFixed(2)}</td>
            <td className='text-center font-bold'>{(calculateTotalScore() - calculateHDCP()).toFixed(2)}</td>
          </tr>
          <tr>
            <th>Score</th>
            {renderScoreInputs()}
            <td className='text-center font-bold'>{calculateTotalScore()}</td>
            <td></td> {/* Placeholder if additional calculation is needed */}
            <td></td> {/* Placeholder if additional calculation is needed */}
          </tr>
        </thead>
      </table>
      <button
        className="mt-4 px-4 py-2 bg-[#17b3a6] text-white rounded hover:bg-blue-700"
        onClick={() => onSaveScores && onSaveScores(scores)}
      >
        Save Scores
      </button>
    </div>
  );
};

export default GolfScoreInput;
