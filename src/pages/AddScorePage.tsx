import React, { useState } from 'react';

interface GolfScoreProps {
  // onSaveScores: (scores: number[]) => void;
}

const GolfScoreInput: React.FC<GolfScoreProps> = ({  }) => {
  const [scores, setScores] = useState<number[]>(new Array(18).fill(0));
  const pars = [4, 3, 5, 4, 4, 3, 5, 4, 4, 3, 5, 4, 4, 3, 5, 4, 4, 3]; 

  const handleScoreChange = (index: number, newScore: number) => {
    const updatedScores = [...scores];
    updatedScores[index] = newScore;
    setScores(updatedScores);
  };

  const calculateTotalPar = () => {
    return pars.reduce((acc, curr) => acc + curr, 0);
  };

  const calculateTotalScore = () => {
    return scores.reduce((acc, curr) => acc + curr, 0);
  };

  const holes = Array.from({ length: 18 }, (_, index) => index + 1);
  const renderScoreInputs = () => {
    return scores.map((score, index) => (
      <td key={`score-${index}`}>
        <input
          type="number"
          min="1"
          value={score}
          onChange={(e) => handleScoreChange(index, parseInt(e.target.value))}
          className="w-10 text-center border border-solid border-[#054a51] bg-white shadow-lg"
        />
      </td>
    ));
  };

  return (
    <div className='max-w-7xl mx-auto'>
      <h4 className="tracking-[0.04em] leading-[18px] font-semibold  [text-shadow:0px_7px_4px_#17b3a6] text-21xl">Add Score</h4>
      <table className="text-sm text-left text-gray-500 dark:text-gray-400 w-full">
        <thead className="bg-[#054a51] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px] text-white rounded-lg">
          <tr>
            <th className="px-2 py-3 text-center">HOLE</th>
            {holes.map((hole) => (
              <th className='text-center' key={hole}>{hole}</th>
            ))}
            <th className='text-center px-2 py-3'>Total</th>
          </tr>
          <tr>
            <th className="px-2 py-3">PAR</th>
            {pars.map((par, index) => (
              <td className='text-center' key={`par-${index}`}>{par}</td>
            ))}
            <td className='text-center font-bold'>{calculateTotalPar()}</td>
          </tr>
          <tr className='text-center'>
            <th>Score</th>
            {renderScoreInputs()}
            <td className='text-center font-bold'>{calculateTotalScore()}</td>
          </tr>
        </thead>
      </table>
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        // onClick={() => onSaveScores(scores)}
      >
        Save Scores
      </button>
    </div>
  );
};

export default GolfScoreInput;
