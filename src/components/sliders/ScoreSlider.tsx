export const ScoreSlider = ({ item }: any) => {
  const scorePerShot = item?.scorePerShot?.slice(1, -1);
  const handiCapPerShot = item?.handiCapPerShot?.slice(1, -1);
  const nickName = item?.userScoreCard.nickName;
  const displayNickName =
    nickName && nickName.length > 6 ? `${nickName.substring(0, 6)}` : nickName;
  return (
    <div className="relative sajid px-4">
      <div className="absolute h-[200px] transform scale-150 skew-x-[-6deg] p-2 w-[300px] left-[68px] rounded-lg bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] z-0" />
      <div className="relative z-1 bg-blue">
        <div className="flex gap-6">
          <div className="p-1">
            <h4 className="m-0 mb-2">Handicape: {item?.handiCapValue}</h4>
            <h4 className="m-0 mb-2">Total: {item?.totalScore}</h4>
            <h4 className="m-0 mb-2">Net Value: {item?.netValue}</h4>
            <h4 className="m-0 mb-2 flex items-center gap-1">
              <img
                className="w-10 h-10 rounded-full"
                src={item?.userScoreCard.imageUrl}
                alt=""
              />{" "}
              {displayNickName}
            </h4>
            <h4 className="m-0 mb-2">POS: 2/10</h4>
          </div>
          <div
            className="flex items-center gap-2 bg-cover rounded-lg"
            style={{
              backgroundImage: "url('/img/FullScorebg.png')",
            }}
          >
            <div className="h-full">
              <img
                className="object-cover"
                width="90px"
                height="100%"
                src="/img/rectangle-531@2x.png"
                alt=""
              />
            </div>
            <div className="px-1">
              <h4 className="m-0 text-[#00E7FA]">
                {item?.userScoreCard.nickName}
              </h4>
              <div>
                <ul className="bg-white p-0 m-0 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)]">
                  <li className="list-none text-[10px] tracking-wide">
                    1 2 3 4 5 6 7 8 9 10 11 12 13 14 15 16 17 18
                  </li>
                </ul>
                <ul className="flex gap-2  p-0 m-0 py-2 text-white">
                  <li className="list-none text-[10px] tracking-wide">
                    <span className="bg-white text-black  px-1">PAR</span>{" "}
                    4,4,4,4,4,4,4,4,4,4,4,4,4,4,4,4
                  </li>
                </ul>
                <ul className="flex gap-2  p-0 m-0  px-1">
                  {/* {arr.map((i:any)=>(
                    <li className="list-none" >{i}</li>
                  ))} */}
                  <li className="list-none text-[10px] tracking-wide text-white">
                    {scorePerShot}
                  </li>
                </ul>
              </div>
              <div>
                <ul className="flex gap-2 bg-white p-0 m-0 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] px-1">
                  <li className="list-none text-[10px]"> {handiCapPerShot}</li>
                </ul>
              </div>
              <div className="flex">
                <p className="m-0 text-xs text-white">Total Par: </p>{" "}
                <span className="bg-[#B10000] p-1 text-white rounded-md ml-2	">
                  {item.totalScore}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 py-4 px-4">
          <h2 className="m-0">Total Score: </h2>{" "}
          <span className="bg-[#17b3a6] p-4 text-white rounded-md ml-2">
            {item.netValue}
          </span>
          <h2 className="m-0">Total Par: </h2>{" "}
          <span className="bg-[#17b3a6] p-4 text-white rounded-md ml-2	">
            {item.totalScore}
          </span>
        </div>
      </div>
    </div>
  );
};
