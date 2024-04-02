export const ScoreSlider = () => {
  return (
    <div className="relative  ml-[200px] ">
      <div className="absolute border border-solid h-[300px] rounded-md	 transform scale-150 skew-x-[-6deg] p-2 w-[300px] bg-gray-400 z-0" />
      <div className="relative z-1">
      <div className="flex gap-2">
          <div className="p-1">
            <h4 className="m-0 mb-2">POS: 2/10</h4>
            <h4 className="m-0 mb-2">POS: 2/10</h4>
            <h4 className="m-0 mb-2">POS: 2/10</h4>
            <h4 className="m-0 mb-2">POS: 2/10</h4>
            <h4 className="m-0 mb-2">POS: 2/10</h4>
          </div>
        <div><p>Image</p></div>
      </div>
      <div className="flex items-center gap-2">
        <h2 className="m-0">Total Score: </h2> <span className="bg-[#17b3a6] p-4 text-white rounded-md ml-2">34</span>
        <h2 className="m-0">Total Par: </h2> <span className="bg-[#17b3a6] p-4 text-white rounded-md ml-2	">34</span>
      </div>
      </div>
    </div>
  );
};
