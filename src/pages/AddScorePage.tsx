import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { singleEventContextStore } from "../contexts/eventContext";
import Player from "../components/Player";
import { singleTeamsContextStore } from "../contexts/teamContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useScoreContext } from "../contexts/scoreContext";

interface GolfScoreProps {
  onSaveScores?: (scores: number[]) => void; // Optional, implement if needed
}

interface UserScores {
  sums: number[];
  filteredSums: number[];
}
const GolfScoreInput: React.FC<GolfScoreProps> = ({ onSaveScores }) => {

  const { isCreated, singleEvent } = singleEventContextStore();
  const { handleScore, score } = useScoreContext();
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
  const [formData, setFormData] = useState<any>([]);

  const totalPar = par?.reduce((acc: number, curr: number) => acc + curr, 0);

  const uId = localStorage.getItem("id");
  const isCreator = uId == singleEvent?.creatorId;

  const handleForm = (event: any) => {
    event.preventDefault(); 

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

      const totalScore = userScores.sums.reduce((acc, score) => acc + score, 0);
      const roundedValue = isHandicap[userId]
        ? Math.round(
            (totalScore *
              (singleEvent?.scoringType === "single"
                ? 3
                : singleEvent?.scoringType === "double"
                ? 1.5
                : 2) -
              totalPar) * 0.8
          )
        : 0;
      const netValue = totalPar - roundedValue;

      formDataArray.push({
        userId: userId,
        scorePerShot: userScores.sums,
        handiCapPerShot: userScores.filteredSums,
        totalScore: totalScore,
        handiCapValue: roundedValue,
        netValue: netValue,
        eventId: singleEvent.id
      });
    }

    setFormData(formDataArray);
    handleScore(formData)
  };


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
        (acc: number, score: number) => acc + score,
        0 // Providing initial value of 0
      );
      selectedsum[userId] = totalScore;
    }
    return selectedsum;
  };
  const selectedHoleSum = calculateTotalSelected();

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
  const { teams, isJoined } = singleTeamsContextStore();

  const handleHandicap = (playerId: string) => {
    setIsHandicap((prev) => ({
      ...prev,
      [playerId]: !prev[playerId],
    }));
  };

  const uniqueMembers = teams
    .flatMap((team: any) => team.members || [])
    .reduce((acc: any, member: any) => {
      const existingMember = acc.find((m: any) => m.userId === member.userId);
      if (!existingMember) {
        acc.push(member);
      }
      return acc;
    }, []);

    const filterScore = score?.filter((score: any) => score.eventId == singleEvent.id)
    console.log(filterScore, 'sss')
    const filteredScores = filterScore?.filter((scores:any, index:any, self:any) => {
    return self.findIndex((s: any) => s.userId === scores.userId) === index;});

    console.log(filteredScores, 'sss')
  return (
    <div className="mx-4 xl:mx-32 ">
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
      <form  action="" onSubmit={handleForm}>
        <div className="overflow-x-scroll">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="bg-[#054a51] shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] h-[63px] min-w-[182px] text-white rounded-lg">
            <tr>
              <th className="px-2 py-3 text-center">HOLE</th>
              {holes.map((hole) => {
                let bgColor = "";
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
              {isCreator && (
                <>
                  <th className="px-2 py-3 text-center">HDCP</th>
                  <th className="px-2 py-3 text-center">Net</th>
                </>
              )}
            </tr>
            <tr>
              <th className="px-2 py-3">PAR</th>

              {par?.map((parValue: any, index: any) => (
                <th key={index} className="px-2 py-3 text-center">
                  {parValue}
                </th>
              ))}
              <th className="px-2 py-3 text-center">{totalPar}</th>
              {isCreator && (
                <>
                  <th className="px-2 py-3 text-center">{totalPar}</th>
                  <th className="px-2 py-3 text-center">{totalPar}</th>
                </>
              )}
            </tr>
            {isJoined && !isCreator
              ? uniqueMembers
                  .filter((member: any) => member.userId == uId)
                  .map((member: any, memberIndex: number) => {
                    const playerHandicap = isHandicap[member.userId] || false;

                    let memberr;
                    if (!isCreator) {
                      if (member.userId == uId) {
                        memberr = member;
                      } else {
                        toast.error("Please join event");
                      }
                    }
                    let roundedValue = 0;
                    if (playerHandicap) {
                      if (singleEvent?.scoringType == "single") {
                        roundedValue = Math.round(
                          (selectedHoleSum[member.userId] * 3 - totalPar) *
                            0.8
                        );
                      }
                      if (singleEvent?.scoringType == "double") {
                        roundedValue = Math.round(
                          (selectedHoleSum[member.userId] * 1.5 - totalPar) *
                            0.8
                        );
                      }
                      if (singleEvent?.scoringType == "triple") {
                        roundedValue = Math.round(
                          (selectedHoleSum[member.userId] * 2 - totalPar) *
                            0.8
                        );
                      }
                    }
                    const netValue = totalPar - roundedValue;
                    
                    return (
                      <tr
                        key={memberIndex}
                        className="py-4 pl-4 whitespace-nowrap"
                      >
                        <Player
                          isCreator={isCreated}
                          key={memberIndex}
                          showNumber={false}
                          enableHover={true}
                          onDelete={() => {}}
                          name={member.userId}
                          imageUrl={member.imageUrl}
                        />
                        {holes.map((hole, holeIndex: number) => (
                          <td key={holeIndex}>
                            <input
                              type="number"
                              min="1"
                              // placeholder="sss"
                              onChange={(e) =>
                                handleInputChange(
                                  member.userId,
                                  holeIndex,
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-10 text-center border border-solid border-[#054a51] bg-white shadow-lg"
                            />
                          </td>
                        ))}
                        <td className="px-2 py-3 text-center">
                          {totalScores[member.userId]}
                        </td>
                        {isCreator && (
                          <>
                            <td className="px-2 py-3 text-center">
                              {roundedValue}
                            </td>
                            <td className="px-2 py-3 text-center">
                              {netValue}
                            </td>
                          </>
                        )}

                        {isCreator && (
                          <td className="px-2 py-3 text-center">
                            <div className="relative">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={playerHandicap}
                              />
                              <div
                                onClick={() => handleHandicap(member.userId)}
                                className={`block bg-gray-600 w-14 h-8 rounded-full ${
                                  playerHandicap ? "bg-[green]" : ""
                                }`}
                              ></div>
                              <div
                                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${
                                  playerHandicap
                                    ? "transform translate-x-6"
                                    : ""
                                }`}
                              ></div>
                            </div>
                          </td>
                        )}
                      </tr>
                    );
                  })
              : uniqueMembers.map((member: any, memberIndex: number) => {
                  const playerHandicap = isHandicap[member.userId] || false;

                  let memberr;
                  if (!isCreator) {
                    if (member.userId == uId) {
                      memberr = member;
                    } else {
                      toast.error("Please join event");
                      navigate("/event-main-page");
                    }
                  }
                  let roundedValue = 0;
                  if (playerHandicap) {
                    if (singleEvent?.scoringType == "single") {
                      roundedValue = Math.round(
                        (selectedHoleSum[member.userId] * 3 - totalPar) * 0.8
                      );
                    }
                    if (singleEvent?.scoringType == "double") {
                      roundedValue = Math.round(
                        (selectedHoleSum[member.userId] * 1.5 - totalPar) *
                          0.8
                      );
                    }
                    if (singleEvent?.scoringType == "triple") {
                      roundedValue = Math.round(
                        (selectedHoleSum[member.userId] * 2 - totalPar) * 0.8
                      );
                    }
                  }

                  const netValue = totalPar - roundedValue;
                  const t = filteredScores?.map((u:any )=> {
                    let arr = u.scorePerShot;
            
                     (u.userId === member.userId ? arr = JSON.parse(arr) : "")
                  }
                 );
                  console.log(t);
                  return (
                    <tr
                      key={memberIndex}
                      className="py-4 pl-4 whitespace-nowrap"
                    >
                      <Player
                        isCreator={isCreated}
                        key={memberIndex}
                        showNumber={false}
                        enableHover={true}
                        onDelete={() => {}}
                        name={member.userId}
                        imageUrl={member.imageUrl}
                      />
                      {holes.map((hole, holeIndex: number) => {
                        return (
                        <td key={holeIndex}>
                          <input
                            type="number"
                            min="1"

                            onChange={(e) =>
                              handleInputChange(
                                member.userId,
                                holeIndex,
                                parseInt(e.target.value)
                              )
                            }
                            // placeholder={hole.toString()}
                            className="w-10 text-center border border-solid border-[#054a51] bg-white shadow-lg"
                          />
                        </td>
                      )})}
                      <td className="px-2 py-3 text-center">
                        {totalScores[member.userId]}
                      </td>
                      {isCreator && (
                        <>
                          <td className="px-2 py-3 text-center">
                            {roundedValue}
                          </td>
                          <td className="px-2 py-3 text-center">{netValue}</td>
                        </>
                      )}

                      {isCreator && (
                        <td className="px-2 py-3 text-center">
                          <div className="relative">
                            <input
                              type="checkbox"
                              className="sr-only"
                              checked={playerHandicap}
                            />
                            <div
                              onClick={() => handleHandicap(member.userId)}
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
                      )}
                    </tr>
                  );
                })}
          </thead>
        </table>
        </div>
       
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-[#17b3a6] text-white rounded hover:bg-blue-700"
        >
          Save Scores
        </button>
      </form>
    </div>
  );
};

export default GolfScoreInput;
