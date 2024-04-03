export const ScoreSlider = () => {
  return (
    <div className="relative left-[40%]  px-4">
      <div className="absolute h-[200px] rounded-md	 transform scale-150 skew-x-[-6deg] p-2 w-[300px] rounded-lg bg-white shadow-[0px_0px_13px_rgba(0,_0,_0,_0.25)] z-0" />
      <div className="relative z-1 bg-blue">
        <div className="flex gap-6">
          <div className="p-1">
            <h4 className="m-0 mb-2">POS: 2/10</h4>
            <h4 className="m-0 mb-2">POS: 2/10</h4>
            <h4 className="m-0 mb-2">POS: 2/10</h4>
            <h4 className="m-0 mb-2">POS: 2/10</h4>
            <h4 className="m-0 mb-2">POS: 2/10</h4>
          </div>
          <div className="flex items-center gap-2 bg-cover"  style={{
                     backgroundImage:"url('/img/FullScorebg.png')"

                      }}>
            <div className="h-full">
              <img className="object-cover" width="100px" height="100%" src="/img/rectangle-531@2x.png" alt="" />
            </div>
            <div className="px-1">
              <h4 className="m-0 text-[#00E7FA]">
                Shabbir ali
              </h4>
              <div>
                <ul className="flex gap-2 bg-white p-0 m-0 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] px-1">
                  <li className="list-none" >1</li>
                  <li className="list-none" >2</li>

                  <li className="list-none" >3</li>
                  <li className="list-none" >4</li>
                  <li className="list-none" >5</li>
                  <li className="list-none" >6</li>
                  <li className="list-none" >7</li>
                  <li className="list-none" >8</li>
                  <li className="list-none" >9</li>
                </ul>
                <ul className="flex gap-2  p-0 m-0 px-1 text-white">
                  <li className="list-none" >1</li>
                  <li className="list-none" >2</li>

                  <li className="list-none" >3</li>
                  <li className="list-none" >4</li>
                  <li className="list-none" >5</li>
                  <li className="list-none" >6</li>
                  <li className="list-none" >7</li>
                  <li className="list-none" >8</li>
                  <li className="list-none" >9</li>
                </ul>
              </div>
              <div>
                <ul className="flex gap-2 bg-white p-0 m-0 shadow-[0px_0px_10px_rgba(0,_0,_0,_0.25)] px-1">
                  <li className="list-none" >5</li>
                  <li className="list-none" >6</li>

                  <li className="list-none" >4</li>
                  <li className="list-none" >7</li>
                  <li className="list-none" >8</li>
                  <li className="list-none" >3</li>
                  <li className="list-none" >7</li>
                  <li className="list-none" >3</li>
                  <li className="list-none" >2</li>
                </ul>
                <ul className="flex gap-2  p-0 m-0 px-1 text-white">
                  <li className="list-none" >2</li>
                  <li className="list-none" >3</li>

                  <li className="list-none" >4</li>
                  <li className="list-none" >5</li>
                  <li className="list-none" >6</li>
                  <li className="list-none" >7</li>
                  <li className="list-none" >3</li>
                  <li className="list-none" >2</li>
                  <li className="list-none" >6</li>
                </ul>
              </div>
              <div className="flex">
              <p className="m-0 text-xs text-white">Total Par: </p> <span className="bg-[#B10000] p-1 text-white rounded-md ml-2	">34</span>
              </div>
              
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 py-4 px-4">
          <h2 className="m-0">Total Score: </h2> <span className="bg-[#17b3a6] p-4 text-white rounded-md ml-2">34</span>
          <h2 className="m-0">Total Par: </h2> <span className="bg-[#17b3a6] p-4 text-white rounded-md ml-2	">34</span>
        </div>
      </div>
    </div>
  );
};
