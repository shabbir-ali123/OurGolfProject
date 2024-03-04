import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { singleEventContextStore } from "../contexts/eventContext";
import Player from "../components/Player";
import { singleTeamsContextStore } from "../contexts/TeamContext";

interface GolfScoreProps {
  onSaveScores?: (scores: number[]) => void; // Optional, implement if needed
}

const GolfScoreInput: React.FC<GolfScoreProps> = ({ onSaveScores }) => {
  const { isCreated, singleEvent } = singleEventContextStore();
  const hole = singleEvent ? singleEvent.selectedHoles : [];
  const newArrayHole = hole?.split(",").map(Number);

  const p = singleEvent ? singleEvent.shotsPerHoles : [];
  const par = p?.split(",").map(Number);

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const holes = Array.from({ length: 18 }, (_, index: number) => index + 1);
  const [sums, setSums] = useState<{ [key: string]: any }>({});

  const handleInputChange = (
    userId: string,
    holeIndex: number,
    value: number
  ) => {
    const key = userId + "-" + holeIndex;
    const updatedSums = { ...sums };

    // Initialize the array for the userId if it doesn't exist
    if (!updatedSums[userId]) {
      updatedSums[userId] = Array.from({ length: holes.length }, () => 0);
    }

    // Update the value in the array
    updatedSums[userId][holeIndex] = value;

    setSums(updatedSums);
  };

  const filteredSums = Object.fromEntries(
    Object.entries(sums).map(([userId, scores]) => {
      const filteredScores = scores.filter((score: any, index: any) =>
        newArrayHole?.includes(index + 1)
      ); // Keep only the scores for holes included in newArrayHole
      return [userId, filteredScores];
    })
  );
  const calculateTotalSelected = () => {
    const selectedsum: { [userId: string]: number } = {};
    for (const userId in filteredSums) {
      const totalScore = filteredSums[userId].reduce(
        (acc: any, score: any) => acc + score,
        0
      );
      selectedsum[userId] = totalScore;
    }

    return selectedsum;
  };
  const selectedHoleSum = calculateTotalSelected();
  console.log(selectedHoleSum, "sum selected holes");
  console.log(filteredSums, "filter");

  console.log(sums);

  // Calculate the total sum for each user
  const calculateTotalSum = () => {
    const totalSums: { [userId: string]: number } = {};

    for (const userId in sums) {
      const totalScore = sums[userId].reduce(
        (acc: any, score: any) => acc + score,
        0
      );
      totalSums[userId] = totalScore;
    }

    return totalSums;
  };

  console.log(calculateTotalSum());
  // Inside the GolfScoreInput component
  const totalScores = calculateTotalSum();

  // Then render the total scores for each user

  const totalPar = par?.reduce((acc:any, curr:any) => acc + curr, 0);
  const { teams } = singleTeamsContextStore();

  return (
    <div className="mx-auto max-w-7xl">
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
        <h2 className="tracking-[0.04em] leading-[18px] font-semibold  [text-shadow:0px_7px_4px_#17b3a6] text-21xl">
          {t("ADD_SCORE")}
        </h2>
      </div>
      <p>
        Scoring Type: <span className="font-bold">Double Peria</span>{" "}
      </p>
      <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="bg-[#054a51] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px] text-white rounded-lg">
          <tr>
            <th className="px-2 py-3 text-center">HOLE</th>
            {holes.map((hole) => {
              const match = newArrayHole?.includes(hole);
              const bgColor = match ? "bg-red" : "";
              return (
                <th className={`text-center px-2 py-3 ${bgColor}`} key={hole}>
                  {hole}
                </th>
              );
            })}

            <th className="px-2 py-3 text-center">Total</th>
            {/* <th className="px-2 py-3 text-center">HDCP</th>
            <th className="px-2 py-3 text-center">Net</th> */}
          </tr>
          <tr>
            <th className="px-2 py-3">PAR</th>
        
  {par?.map((parValue:any, index:any) => (
    <th key={index} className="px-2 py-3 text-center">
      {parValue}
    </th>
  ))}
<th  className="px-2 py-3 text-center">
  {totalPar}
</th>
<>

</>
          </tr>
          {teams?.map((team: any, teamIndex: number) =>
            team.members?.map((member: any, memberIndex: number) => (
              <tr key={memberIndex} className="py-4 pl-4 whitespace-nowrap">
                <Player
                  isCreator={isCreated}
                  key={memberIndex}
                  showNumber={false}
                  enableHover={true}
                  onEdit={() => {
                    // setSelectedPlayerNickname(member.nickName);
                    // setSelectedUserId(member.userId);
                    // setSelectedTeamName(team.name);
                    // setEditOpen(true);
                  }}
                  onDelete={() => {}}
                  name={member.nickName}
                  imageUrl={member.imageUrl}
                />
                {holes.map((hole, holeIndex: number) => (
                  <td key={holeIndex}>
                    <input
                      type="number"
                      min="1"
                      onChange={(e) =>
                        handleInputChange(
                          member.nickName,
                          holeIndex,
                          parseInt(e.target.value)
                        )
                      }
                      className="w-10 text-center border border-solid border-[#054a51] bg-white shadow-lg"
                    />
                  </td>
                ))}
                <td className="px-2 py-3 text-center">
                  {totalScores[member.nickName]}
                </td>
              </tr>
            ))
          )}
        </thead>
      </table>
      <button
        className="mt-4 px-4 py-2 bg-[#17b3a6] text-white rounded hover:bg-blue-700"
        onClick={() => {}}
      >
        Save Scores
      </button>
    </div>
  );
};

export default GolfScoreInput;
