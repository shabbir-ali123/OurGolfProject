import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { singleEventContextStore } from "../contexts/eventContext";
import Player from "../components/Player";
import { singleTeamsContextStore } from "../contexts/teamContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

interface GolfScoreProps {
  onSaveScores?: (scores: number[]) => void; 
}

interface UserScores {
  sums: number[];
  filteredSums: number[];
}
const GolfScoreInput: React.FC<GolfScoreProps> = ({ onSaveScores }) => {
  const { isCreated, singleEvent } = singleEventContextStore();
  const hole = singleEvent ? singleEvent.selectedHoles : [];
  const newArrayHole = hole?.split(",").map(Number);

  const p = singleEvent ? singleEvent.shotsPerHoles : [];
  const par = p?.split(",").map(Number);
  const navigate = useNavigate();

  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const holes = Array.from({ length: 18 }, (_, index: number) => index + 1);
  const [sums, setSums] = useState<{ [key: string]: any }>({});
  const [isHandicap, setIsHandicap] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState<any>([])

  const uId = localStorage.getItem('id')
  const isCreator = uId == singleEvent?.creatorId;
  const handleForm = (event: any) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const userScoresMap: { [userId: string]: UserScores } = {};

    for (const [userId, userSums] of Object.entries(sums)) {
      userScoresMap[userId] = userScoresMap[userId] || {
        sums: [],
        filteredSums: [],
      };
      userScoresMap[userId].sums.push(...userSums);
    }

    for (const [userId, userFilteredSums] of Object.entries(filteredSums)) {
      userScoresMap[userId] = userScoresMap[userId] || {
        sums: [],
        filteredSums: [],
      };
      userScoresMap[userId].filteredSums.push(...userFilteredSums);
    }

    const formDataArray = [];
    for (const [userId, userScores] of Object.entries(userScoresMap)) {
      console.log(`UserID: ${userId}`);
      console.log("Sums:", userScores.sums);
      console.log("FilteredSums:", userScores.filteredSums);

      const totalScore = userScores.sums.reduce((acc, score) => acc + score, 0);
      const roundedValue =
        isHandicap[userId] ?
        Math.round((totalScore * (singleEvent?.scoringType === "single" ? 3 : (singleEvent?.scoringType === "double" ? 1.5 : 2)) - totalPar) * 0.8) :
        0;
      const netValue = totalPar - roundedValue;

      formDataArray.push({
        userId: userId,
        scorePerShot: userScores.sums,
        handiCapPerShot: userScores.filteredSums,
        totalScore: totalScore,
        handiCapValue: roundedValue,
        netValue: netValue,
      });
    }

    setFormData(formDataArray);
  };



  console.log(formData, 'form data')

  const handleInputChange = (
    userId: string,
    holeIndex: number,
    value: number
  ) => {
    const key = userId + "-" + holeIndex;
    const updatedSums = { ...sums };
    if (!updatedSums[userId]) {
      updatedSums[userId] = Array.from({ length: holes.length }, () => 0);
    }
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
        (acc: any, score: any) => acc + score
      );
      selectedsum[userId] = totalScore;
    }

    return selectedsum;
  };
  const selectedHoleSum = calculateTotalSelected();

  console.log(selectedHoleSum, "sum selected holes");
  console.log(filteredSums, "filter");

  console.log(sums);

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

  const totalScores = calculateTotalSum();
  const totalPar = par?.reduce((acc: number, curr: number) => acc + curr, 0);
  const { teams } = singleTeamsContextStore();

  const handleHandicap = (playerId: string) => {
    setIsHandicap((prev) => ({
      ...prev,
      [playerId]: !prev[playerId],
    }));
  };

  const uniqueMembers = teams.flatMap((team: any) => team.members || [])
  .reduce((acc: any, member: any) => {
      const existingMember = acc.find((m: any) => m.userId === member.userId);
      if (!existingMember) {
          acc.push(member);
      }
      return acc;
  }, []);  
  
  return (
    <div className="max-w-[1650px] mx-auto sm:mx-20 lg:mx-auto">
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
        Scoring Type:{" "}
        <span className="font-bold">{singleEvent?.scoringType} PERIA</span>{" "}
      </p>
      <div className="overflow-x-scroll  lg:overflow-hidden w-full">
      <form action="" onSubmit={handleForm}>
        <table className=" text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-[#054a51] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px] text-white rounded-lg overflow-x-scroll ">
            <tr>
              <th className="px-2 py-3 text-center">HOLE</th>
              {holes.map((hole) => {
                let bgColor = ''
                if (isCreator) {

                const match = newArrayHole?.includes(hole);
                bgColor = match ? "bg-red" : "";
              }

                return (
                  <th className={`text-center px-2 py-3 ${bgColor}`} key={hole}>
                    {hole}
                  </th>
                );
              })}

              <th className="px-2 py-3 text-center">Total</th>
              {
                isCreator && 
                <>
              <th className="px-2 py-3 text-center">HDCP</th>
              <th className="px-2 py-3 text-center">Net</th>
              </>

            }

              <th className="px-2 py-3 text-center">H</th>
            </tr>
            <tr>
              <th className="flex justify-center py-3">PAR</th>

              {par?.map((parValue: any, index: any) => (
                <th key={index} className="px-2 py-3 text-center">
                  {parValue}
                </th>
              ))}
              <th className="px-2 py-3 text-center">{totalPar}</th>
              {
                isCreator && 
                <>
                
              
              <th className="px-2 py-3 text-center">{totalPar}</th>
              <th className="px-2 py-3 text-center">{totalPar}</th>
              </>
              }
              <th className="px-2 py-3 text-center">ON/OFF</th>
              <></>
            </tr>
            {uniqueMembers.map((member: any, memberIndex: number) => {
                const playerHandicap = isHandicap[member.nickName] || false;
                if (!isCreator) {
                  if (member.userId == uId) {
                    member;
                  }
                  else {
                    toast.error('Please join event')
                    navigate('/event-main-page')
                  }
                }
                console.log(member, 'uuuu')
                let roundedValue = 0;
                if (playerHandicap) {
                  if (singleEvent?.scoringType == "single") {
                    roundedValue = Math.round(
                      (selectedHoleSum[member.nickName] * 3 - totalPar) * 0.8
                    );
                  }
                  if (singleEvent?.scoringType == "double") {
                    roundedValue = Math.round(
                      (selectedHoleSum[member.nickName] * 1.5 - totalPar) * 0.8
                    );

                  }
                  if (singleEvent?.scoringType == "triple") {
                    roundedValue = Math.round(
                      (selectedHoleSum[member.nickName] * 2 - totalPar) * 0.8
                    );

                  }
                }

                const netValue = totalPar - roundedValue;
                return (
                  <tr key={memberIndex} className="">
                    <div className="flex justify-center items-center">
                    <Player
                      isCreator={isCreated}
                      key={memberIndex}
                      showNumber={false}
                      // enableHover={true}
                      // onDelete={() => {}}
                      name={member.nickName}
                      imageUrl={member.imageUrl}
                    />
                    </div>
                   
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
                    <td className=" py-3 text-center">
                      {totalScores[member.nickName]}
                    </td>
                    {isCreator && <>
                    
                    <td className="px-2 py-3 text-center">{roundedValue}</td>
                    <td className="px-2 py-3 text-center">{netValue}</td>
                    </>}

                    {isCreator && 
                    <td className="px-2 py-3 text-center">
                      <div className="relative">
                        <input
                          type="checkbox"
                          className="sr-only"
                          checked={playerHandicap}
                        />
                        <div
                          onClick={() => handleHandicap(member.nickName)}
                          className={`block bg-gray-600 w-14 h-8 rounded-full ${
                            playerHandicap ? "bg-[green]" : ""
                          }`}
                        ></div>
                        <div
                          className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                            playerHandicap ? "transform translate-x-6" : ""
                          }`}
                        ></div>
                      </div>
                    </td>
            }
                  </tr>
                );
              })
            }
            
          </thead>
        </table>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-[#17b3a6] text-white rounded hover:bg-blue-700"
        >
          Save Scores
        </button>
      </form>
      </div>
     
    </div>
  );
};

export default GolfScoreInput;
