import React, { useEffect, useState } from "react";
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
const AddScorePage: React.FC<GolfScoreProps> = ({ onSaveScores }) => {

  const { isCreated, singleEvent } = singleEventContextStore();
  const { handleScore, score } = useScoreContext();
  const { teams, isJoined } = singleTeamsContextStore();

  const hole = singleEvent ? singleEvent.selectedHoles : [];
  const newArrayHole = hole?.split(",").map(Number);

  const p = singleEvent ? singleEvent.shotsPerHoles : [];
  const par = p?.split(",").map(Number);
  const navigate = useNavigate();
  console.log(score, teams, "assdas");


  const { t, i18n } = useTranslation();
  document.body.dir = i18n.dir();

  const holes = Array.from({ length: 18 }, (_, index: number) => index + 1);
  const [sums, setSums] = useState<{ [key: string]: any }>({});
  const [isHandicap, setIsHandicap] = useState<{ [key: string]: boolean }>({});
  const [formData, setFormData] = useState<any>([
    {
      id: "",
      eventId: "",
      handiCapPerShot: [],
      handiCapValue: "",
      netValue: "",
      scorePerShot : [],
      totalScore:"",
      userId: "",
      nearPinContest: "",
      longDriveContest: "",
      teamId: "",
      teamName: ""
    },

  ]);

  const totalPar = par?.reduce((acc: number, curr: number) => acc + curr, 0);

  const uId = localStorage.getItem("id");
  const isCreator = uId == singleEvent?.creatorId;

  const handleForm = (event: any) => {
    event.preventDefault();

    

    // setFormData(formDataArray);
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


    //
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
    setSums(updatedSums);
  };

  const filteredSums = Object.fromEntries(
    Object.entries(sums).map(([userId, scores]) => {
      const filteredScores = scores.filter((score: any, index: any) =>
        newArrayHole?.includes(index + 1)
      );
      return [userId, filteredScores];
    })
  );
  const calculateTotalSelected = () => {
    const selectedsum: { [userId: string]: number } = {};
    for (const userId in filteredSums) {
      const totalScore = filteredSums[userId].reduce(
        (acc: number, score: number) => acc + score,
        0 
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


    useEffect(() => {
      debugger
      // Prepare the new form data array
      const newFormData = score?.reduce((acc:any, item:any) => {
        // Check if the current score item's user is in the uniqueMembers list
        const isMember = uniqueMembers?.some((member:any) => member.userId === item.userId);
        if (isMember) {
          // Parse scorePerShot only if it's a string
          const scorePerShot = typeof item.scorePerShot === 'string' ? JSON.parse(item.scorePerShot) : item.scorePerShot;
          acc.push({
            scorePerShot: scorePerShot,
            totalScore: item.totalScore,
            userId: item.userId
          });
        }
        return acc;
      }, []);
  
      // Update the formData state once with all new entries
      setFormData(newFormData);
      console.log(formData, "hdghg");
    }, [score]);

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
        <span className="font-bold">{singleEvent?.scoringType} Peria</span>{" "}
      </p>
      <form action="" onSubmit={handleForm}>
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
                          onDelete={() => { }}
                          name={member.nickName}
                          imageUrl={member.imageUrl}
                        />
                        {holes.map((hole, holeIndex: number) => 
                         
                         
                         {  return <td key={holeIndex}>
                            <input
                              type="number"
                              min="1"
                              // placeholder={formData.scorePerShot[holeIndex] !== undefined ? formData.scorePerShot[holeIndex] : ""}#17b3a6
                              onChange={(e) =>
                                handleInputChange(
                                  member.userId,
                                  holeIndex,
                                  parseInt(e.target.value)
                                )
                              }
                              className="w-10 text-center border border-solid border-[#054a51] bg-white shadow-lg"
                            />
                          </td>}
                        )}
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
                                className={`block bg-gray-600 w-14 h-8 rounded-full ${playerHandicap ? "bg-[green]" : ""
                                  }`}
                              ></div>
                              <div
                                className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${playerHandicap
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
                  const playerData = formData?.find((data:any) => data.userId == member.userId);

                  console.log(playerData?.[0]?.totalScore, "sadasdasd");
                  return (
                    <tr
                      key={memberIndex}
                      className="whitespace-nowrap "
                    >
                      <Player
                        isCreator={isCreated}
                        key={memberIndex}
                        showNumber={false}
                        enableHover={true}
                        onDelete={() => {}}
                        name={member.nickName}
                        imageUrl={member.imageUrl}
                      />
                      {holes.map((hole, holeIndex: number) =>
                      

                      {

                        return (
                          <td key={holeIndex}>
                            <input
                              type="number"
                              min="0"
                              value={playerData && playerData.scorePerShot?.[holeIndex]}
                              
                              // placeholder={formData?.scorePerShot[holeIndex] !== "" ? formData?.scorePerShot[holeIndex] : ""}
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
                            {
                              holeIndex+1 == singleEvent?.driverContest &&  <input
                              type="text"
                              min="1"
                              name="driverContest"
                              // placeholder={hole.toString()}
                              className="w-10 bg-[#17b3a6] text-center border border-solid border-[#054a51]shadow-lg"
                            />
                            }
                             {
                              holeIndex+1 == singleEvent?.nearPinContest &&  <input
                              type="text"
                              min="1"
                              name="nearPinContest"
                              className="w-10 bg-[#6effa4] text-center border border-solid border-[#054a51]shadow-lg"
                            />
                            }
                          </td>
                        )
                      })}
                      <td className="px-2 py-3 text-center">
                        {
                          playerData?.totalScore  || formData ? playerData?.totalScore :  totalScores[member.userId] 
                        }
                        
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
                              className={`block bg-gray-600 w-14 h-8 rounded-full ${playerHandicap ? "bg-[green]" : ""
                                }`}
                            ></div>
                            <div
                              className={`dot absolute left-1 top-1 bg-white w-6 h-6 rounded-full transition ${playerHandicap ? "transform translate-x-6" : ""
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
      <div className="">
      <div className="flex items-center justify-end ">
          <p className="my-1">{t("DRIVER_CONTEST")}-</p>
          <div className="h-4 w-8  md:w-10 lg:w-16  bg-[#17b3a6]"></div>
        </div>
        <div className="flex items-center justify-end ">
          <p className="my-1">{t("PIN_CONTEST")}-</p>
          <div className="h-4 w-8 md:w-10 lg:w-16 bg-[#6effa4]"></div>
        </div>
      </div>
    </div>
  );
};

export default AddScorePage;
