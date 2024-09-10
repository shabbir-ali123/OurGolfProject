import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { singleEventContextStore } from "../contexts/eventContext";
import Player from "../components/Player";
import { singleTeamsContextStore } from "../contexts/teamContext";
import { useNavigate } from "react-router-dom";
import { useScoreContext } from "../contexts/scoreContext";

interface GolfScoreProps {
  onSaveScores?: (scores: number[]) => void;
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
  const [contests, setContests] = useState<any[]>([]);
  const [pinContests, setPinContests] = useState<any[]>([]);

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
      scorePerShot: [],
      totalScore: "",
      userId: "",
      nearPinContest: "",
      driverContest: "",
      longDriveContest: "",
      teamId: "",
      teamName: "",
    },
  ]);

  const totalPar = par?.reduce((acc: number, curr: number) => acc + curr, 0);

  const uId = localStorage.getItem("id");
  const isCreator = uId == singleEvent?.creatorId;

  const handleForm = (event: any) => {
    event.preventDefault();
    handleScore(formData);
  };

  const handleInputChange = (
    userId: string,
    teamId: any,
    teamName: any,
    holeIndex: number,
    value: number
  ) => {
    const updatedSums = { ...sums };
  
    // Skip indices 18 and 19
    if (holeIndex !== 18 && holeIndex !== 19) {
      if (!updatedSums[userId]) {
        updatedSums[userId] = Array.from({ length: holes.length }, () => 0);
      }
      updatedSums[userId][holeIndex] = value;
    }
  
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
              totalPar) *
              0.8
          )
        : 0;
      const netValue = totalPar - roundedValue;
      const newValueObj = contests.find(
        (newValue) => newValue.userId == userId
      );
      const newPinValueObj = pinContests.find(
        (newValue) => newValue.userId == userId
      );
  
      // Skip adding scorePerShot if holeIndex is 18 or 19
      const scorePerShot = holeIndex !== 18 && holeIndex !== 19
        ? userScores.sums
        : [];
  
      formDataArray.push({
        userId: Number(userId),
        scorePerShot: scorePerShot,
        handiCapPerShot: singleEvent?.selectedHoles,
        totalScore: totalScore,
        handiCapValue: roundedValue,
        netValue: netValue,
        eventId: singleEvent.id,
        nearPinContest: newPinValueObj?.newValue,
        driverContest: newValueObj?.newValue,
        teamId: teamId,
      });
    }
  
    const updatedFormData = formData.map((data: any) => {
      const sums = data.scorePerShot;
  
      if (data.userId == userId) {
        const totalScore = sums?.reduce(
          (acc: any, score: any) => acc + score,
          0
        );
  
        const newValueObj = contests.find(
          (newValue) => newValue.userId === data.userId
        );
        const newPinValueObj = pinContests.find(
          (newValue) => newValue.userId === data.userId
        );
  
        if (holeIndex !== 18 && holeIndex !== 19) {
          data.scorePerShot[holeIndex] = value;
        }
        
        data.totalScore = totalScore;
        data.driverContest = newValueObj?.newValue;
        data.nearPinContest = newPinValueObj?.newValue;
      }
      return data;
    });
  
    if (formData.length === uniqueMembers.length) {
      setFormData(updatedFormData);
    } else {
      setFormData(formDataArray);
    }
  
    setSums(updatedSums);
  };
  console.log(formData, "sad");

  const handlePinContests = (
    userId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const existingIndex = pinContests.findIndex(
      (contest) => contest.userId === userId
    );

    if (existingIndex !== -1) {
      setPinContests((prevContests) => [
        ...prevContests.slice(0, existingIndex),
        { newValue: e.target.value, userId: userId },
        ...prevContests.slice(existingIndex + 1),
      ]);
    } else {
      setPinContests((prevContests) => [
        ...prevContests,
        { newValue: e.target.value, userId: userId },
      ]);
    }
  

    
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
    const newFormData = score?.reduce((acc: any, item: any) => {
      const isMember = uniqueMembers?.find(
        (member: any) => member.userId === item.userId 
      );
      if (isMember) {
        const scorePerShot =
          typeof item?.scorePerShot === "string"
            ? JSON?.parse(item?.scorePerShot)
            : item.scorePerShot;
        const handiCapPerShot =
          typeof item?.handiCapPerShot === "string"
            ? JSON?.parse(item?.handiCapPerShot)
            : item.handiCapPerShot;

        acc.push({
          scorePerShot: scorePerShot,
          totalScore: item.totalScore,
          userId: item.userId,
          handiCapPerShot: handiCapPerShot,
          handiCapValue: item.handiCapValue,
          netValue: item.netValue,
          eventId: item.eventId,
          nearPinContest: item.nearPinContest,
          driverContest: item.driverContest,
          teamId: item.teamId,
          teamName: item.name,
        });
      }
      return acc;
    }, []);
      setFormData(newFormData);

  }, [score]);

  const handleContests = (
    userId: number,
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const existingIndex = contests.findIndex(
      (contest) => contest.userId === userId
    );

    if (existingIndex !== -1) {
      setContests((prevContests) => [
        ...prevContests.slice(0, existingIndex),
        { newValue: e.target.value, userId: userId },
        ...prevContests.slice(existingIndex + 1),
      ]);
    } else {
      setContests((prevContests) => [
        ...prevContests,
        { newValue: e.target.value, userId: userId },
      ]);
    }
  };

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
      {t("SCORING_TYPE")} : 
        <span className="font-bold">{singleEvent?.scoringType} {t("PERIA")}</span>{" "}
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
                    bgColor = match ? "bg-black" : "";
                  }

                  return (
                    <th
                      className={`text-center px-2 py-3 ${bgColor}`}
                      key={hole}
                    >
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
                      const playerData = formData?.find(
                        (data: any) => data.userId == member.userId
                      );

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
                            name={member.nickName}
                            imageUrl={member.imageUrl}
                          />
                          {holes.map((hole, holeIndex: number) => {
                            return (
                              <td key={holeIndex} >
                                <input
                                  type="number"
                                  value={
                                    formData?.find(
                                      (data: any) =>
                                        data.userId == member.userId
                                    )?.scorePerShot?.[holeIndex]
                                  }
                                  placeholder={
                                    formData?.find(
                                      (data: any) =>
                                        data.userId == member.userId
                                    )?.scorePerShot?.[holeIndex]
                                  }
                                  onChange={(e) =>
                                    handleInputChange(
                                      member.userId,
                                      member.teamId,
                                      member.name,
                                      holeIndex,
                                      parseInt(e.target.value)
                                    )
                                  }
                                  className="w-10 text-center border border-solid border-[#054a51] bg-white shadow-lg"
                                />
                                {holeIndex + 1 ==
                                  singleEvent?.driverContest && (
                                  <input
                                    type="text"
                                    name="driverContest"
                                    className="w-10 bg-[#17b3a6] text-center border border-solid border-[#054a51]shadow-lg"
                                    placeholder={
                                      playerData &&
                                      playerData?.driverContest  + " yrd"
                                    }
                                    value={
                                      formData?.find(
                                        (data: any) =>
                                          data.userId == member.userId
                                      )?.scorePerShot?.[holeIndex]
                                    }
                                    onChange={(e: any) => {
                                      handleContests(member.userId, e);
                                      
                                    }}
                                    
                                    />
                                )}
                                {holeIndex + 1 ==
                                  singleEvent?.nearPinContest && (
                                    <input
                                      type="text"
                                      name="nearPinContest"
                                      className="w-10 bg-[#6effa4] text-center border border-solid border-[#054a51]shadow-lg"
                                      placeholder={
                                        playerData &&
                                        playerData?.nearPinContest + " yrd"
                                      }
                                      onChange={(e: any) => {
                                        handlePinContests(member.userId, e);
                                        
                                      }}
                                  />
                                  
                                )}
                                
                              </td>
                            );
                          })}
                          <td className="px-2 py-3 text-center">
                            {playerData?.totalScore || formData
                              ? playerData?.totalScore
                              : totalScores[member.userId]}{" "}
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
                    const playerData = formData?.find(
                      (data: any) => data.userId == member.userId
                    );

                    return (
                      <tr key={memberIndex} className="whitespace-nowrap ">
                        <Player
                          isCreator={isCreated}
                          key={memberIndex}
                          showNumber={false}
                          enableHover={false}
                          onDelete={() => {}}
                          name={member.nickName}
                          imageUrl={member.imageUrl}
                        />
                        {holes.map((hole, holeIndex: number) => {

                          return (
                            <td key={holeIndex} className="relative">
                              <input
                                type="number"
                                min="0"
                                value={
                                  playerData &&
                                  playerData.scorePerShot?.[holeIndex]
                                }
                            
                                onChange={(e) =>
                                  handleInputChange(
                                    member.userId,
                                    member.teamId,
                                    member.teamName,
                                    holeIndex,
                                    parseInt(e.target.value)
                                  )
                                }
                                
                                className="w-6 text-sm text-center border border-solid border-[#054a51] bg-white shadow-lg"
                              />
                              {holeIndex + 1 == singleEvent?.driverContest && (
                                <>
                                <input
                                  type="text"
                                  min="1"
                                  name="driverContest"
                                  placeholder={
                                    playerData &&
                                    playerData?.driverContest + " yrd"
                                  }
                                  onChange={(e: any) => {
                                    handleContests(member.userId, e);
                                    handleInputChange(
                                      member.userId,
                                      member.teamId,
                                      member.teamName,
                                      18,
                                      parseInt(e.target.value)
                                    )
                                  }}
                                  className="w-12 text-sm bg-[#17b3a6] text-center border border-solid border-[#054a51]shadow-lg"
                                />
                              
                                <span className="absolute bottom-0 right-3"><img src="/img/shot.png" width='45px' height='45px' alt="" /></span>
</>
                              )}
                              {holeIndex + 1 == singleEvent?.nearPinContest && (
                                <>
                                <input
                                  type="text"
                                  min="1"
                                  name="nearPinContest"
                                  placeholder={
                                    playerData &&
                                    playerData?.nearPinContest + " yrd"
                                  }
                                  onChange={(e: any) => {
                                    handlePinContests(member.userId, e);
                                    handleInputChange(
                                      member.userId,
                                      member.teamId,
                                      member.teamName,
                                      19,
                                      parseInt(e.target.value)
                                    )
                                  }}
                                  className="w-10 bg-[#6effa4] text-center border border-solid border-[#054a51]shadow-lg"
                                />
                            <span className="absolute bottom-0 right-1"><img src="/img/flag.png" width='60px' height='40px' alt="" /></span>
                                </>
                              )}
                            </td>
                          );
                        })}
                        <td className="px-2 py-3 text-center">
                          {playerData?.totalScore || formData
                            ? playerData?.totalScore
                            : totalScores[member.userId]}
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
                  })}
            </thead>
          </table>
        </div>

        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-[#17b3a6] text-white rounded hover:bg-blue-700"
        >
          {t("SAVE_SCORE")}
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
