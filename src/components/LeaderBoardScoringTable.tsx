// import { FunctionComponent } from "react";
// import { useTranslation } from "react-i18next";

// const LeaderBoardScoringTable: FunctionComponent = () => {
//   const {t, i18n} = useTranslation();
// document.body.dir = i18n.dir();
//   return (
//     <div className="absolute top-[4546px] left-[220px] w-[1302px] h-[787px] text-left text-lg text-gray1-100 font-poppins">
//       <div className="absolute top-[227px] left-[0px] w-[1302px] h-[560px]">
//         <div className="absolute top-[0px] left-[0px] w-[1302px] h-[560px]">
//           <div className="absolute top-[0px] left-[0px] w-[1302px] h-[560px]">
//             <div className="absolute top-[0px] left-[0px] w-[1302px] h-[560px]">
//               <div className="absolute top-[90px] left-[0px] w-[1302px] h-[470px]">
//                 <div className="absolute top-[0px] left-[0px] w-[1302px] h-[470px]">
//                   <div className="absolute top-[86px] left-[1px] w-[1301px] h-16">
//                     <div className="absolute top-[0px] left-[0px] w-[1301px] h-16">
//                       <div className="absolute top-[0px] left-[0px] rounded-8xs bg-white shadow-[0px_4px_15px_rgba(0,_0,_0,_0.25)] w-[1301px] h-16" />
//                       <div className="absolute top-[22px] left-[14px] w-[1265px] h-5">
//                         <div className="absolute top-[0px] left-[95px] leading-[20px] font-medium">
//                           330
//                         </div>
//                         <div className="absolute top-[0px] left-[0px] leading-[20px]">
//                           Team 1
//                         </div>
//                         <div className="absolute top-[0px] left-[138px] leading-[20px] font-medium">
//                           158
//                         </div>
//                         <div className="absolute top-[0px] left-[178px] leading-[20px] font-medium">
//                           418
//                         </div>
//                         <div className="absolute top-[0px] left-[222px] leading-[20px] font-medium">
//                           34
//                         </div>
//                         <div className="absolute top-[0px] left-[254px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[296px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[342px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[385px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[431px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[478px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[583px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[628px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[669px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[709px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[750px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[791px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[832px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[873px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[916px] leading-[20px] font-medium">
//                           234
//                         </div>
//                         <div className="absolute top-[0px] left-[975px] leading-[20px] font-medium">
//                           3333
//                         </div>
//                         <div className="absolute top-[0px] left-[1054px] leading-[20px] font-medium">
//                           6402
//                         </div>
//                         <div className="absolute top-[0px] left-[1147px] leading-[20px] font-medium">
//                           68.4
//                         </div>
//                         <div className="absolute top-[0px] left-[1240px] leading-[20px] font-medium">
//                           110
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="absolute top-[166px] left-[1px] w-[1301px] h-16">
//                     <div className="absolute top-[0px] left-[0px] w-[1301px] h-16">
//                       <div className="absolute top-[0px] left-[0px] rounded-8xs bg-white shadow-[0px_4px_15px_rgba(0,_0,_0,_0.25)] w-[1301px] h-16" />
//                       <div className="absolute top-[22px] left-[14px] w-[1267px] h-5">
//                         <div className="absolute top-[0px] left-[0px] leading-[20px]">
//                           Team 2
//                         </div>
//                         <div className="absolute top-[0px] left-[95px] leading-[20px] font-medium">
//                           278
//                         </div>
//                         <div className="absolute top-[0px] left-[141px] leading-[20px] font-medium">
//                           131
//                         </div>
//                         <div className="absolute top-[0px] left-[176px] leading-[20px] font-medium">
//                           457
//                         </div>
//                         <div className="absolute top-[0px] left-[222px] leading-[20px] font-medium">
//                           23
//                         </div>
//                         <div className="absolute top-[0px] left-[254px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[296px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[342px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[385px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[431px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[1147px] leading-[20px] font-medium">
//                           66.4
//                         </div>
//                         <div className="absolute top-[0px] left-[478px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[583px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[628px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[669px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[709px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[750px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[791px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[832px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[873px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[916px] leading-[20px] font-medium">
//                           432
//                         </div>
//                         <div className="absolute top-[0px] left-[976px] leading-[20px] font-medium">
//                           3165
//                         </div>
//                         <div className="absolute top-[0px] left-[1055px] leading-[20px] font-medium">
//                           6502
//                         </div>
//                         <div className="absolute top-[0px] left-[1237px] leading-[20px] font-medium">
//                           105
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="absolute top-[246px] left-[1px] w-[1301px] h-16">
//                     <div className="absolute top-[0px] left-[0px] rounded-8xs bg-white shadow-[0px_4px_15px_rgba(0,_0,_0,_0.25)] w-[1301px] h-16" />
//                     <div className="absolute top-[12px] left-[14px] w-[1282px] h-10">
//                       <div className="absolute top-[10px] left-[0px] leading-[20px]">
//                         Team 3
//                       </div>
//                       <div className="absolute top-[10px] left-[97px] leading-[20px] font-medium">
//                         241
//                       </div>
//                       <div className="absolute top-[10px] left-[140px] leading-[20px] font-medium">
//                         127
//                       </div>
//                       <div className="absolute top-[10px] left-[175px] leading-[20px] font-medium">
//                         406
//                       </div>
//                       <div className="absolute top-[10px] left-[221px] leading-[20px] font-medium">
//                         56
//                       </div>
//                       <div className="absolute top-[10px] left-[254px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[296px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[343px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[386px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[432px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[0px] left-[1137px] leading-[20px] font-medium">
//                         <p className="m-0">M 64.0</p>
//                         <p className="m-0">M 69.3</p>
//                       </div>
//                       <div className="absolute top-[0px] left-[1222px] leading-[20px] font-medium">
//                         <p className="m-0">M 99.0</p>
//                         <p className="m-0">M 69.3</p>
//                       </div>
//                       <div className="absolute top-[10px] left-[479px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[584px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[629px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[670px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[709px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[751px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[792px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[832px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[873px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[917px] leading-[20px] font-medium">
//                         323
//                       </div>
//                       <div className="absolute top-[10px] left-[974px] leading-[20px] font-medium">
//                         2345
//                       </div>
//                       <div className="absolute top-[10px] left-[1057px] leading-[20px] font-medium">
//                         5431
//                       </div>
//                     </div>
//                   </div>
//                   <div className="absolute top-[326px] left-[1px] w-[1301px] h-16 text-darkslategray-100">
//                     <div className="absolute top-[0px] left-[0px] rounded-8xs bg-white shadow-[0px_4px_15px_rgba(0,_0,_0,_0.25)] w-[1301px] h-16" />
//                     <div className="absolute top-[12px] left-[14px] w-[1282px] h-10">
//                       <div className="absolute top-[10px] left-[0px] leading-[20px]">
//                         Team 4
//                       </div>
//                       <div className="absolute top-[10px] left-[103px] leading-[20px] font-medium">
//                         17
//                       </div>
//                       <div className="absolute top-[10px] left-[139px] leading-[20px] font-medium">
//                         120
//                       </div>
//                       <div className="absolute top-[10px] left-[176px] leading-[20px] font-medium">
//                         350
//                       </div>
//                       <div className="absolute top-[10px] left-[222px] leading-[20px] font-medium">
//                         76
//                       </div>
//                       <div className="absolute top-[10px] left-[256px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[298px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[345px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[388px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[434px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[0px] left-[1137px] leading-[20px] font-medium">
//                         <p className="m-0">M 66.0</p>
//                         <p className="m-0">M 67.3</p>
//                       </div>
//                       <div className="absolute top-[0px] left-[1222px] leading-[20px] font-medium">
//                         <p className="m-0">M 65.0</p>
//                         <p className="m-0">M 67.3</p>
//                       </div>
//                       <div className="absolute top-[10px] left-[481px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[586px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[631px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[672px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[711px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[753px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[794px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[834px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[875px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[919px] leading-[20px] font-medium">
//                         231
//                       </div>
//                       <div className="absolute top-[10px] left-[974px] leading-[20px] font-medium">
//                         3245
//                       </div>
//                       <div className="absolute top-[10px] left-[1054px] leading-[20px] font-medium">
//                         4602
//                       </div>
//                     </div>
//                   </div>
//                   <div className="absolute top-[406px] left-[1px] w-[1301px] h-16 text-darkslategray-100">
//                     <div className="absolute top-[0px] left-[0px] rounded-8xs bg-white shadow-[0px_4px_15px_rgba(0,_0,_0,_0.25)] w-[1301px] h-16" />
//                     <div className="absolute top-[22px] left-[14px] w-[949px] h-5">
//                       <div className="absolute top-[0px] left-[0px] leading-[20px]">
//                         Team 5
//                       </div>
//                       <div className="absolute top-[0px] left-[97px] leading-[20px] font-medium">
//                         994
//                       </div>
//                       <div className="absolute top-[0px] left-[142px] leading-[20px] font-medium">
//                         130
//                       </div>
//                       <div className="absolute top-[0px] left-[176px] leading-[20px] font-medium">
//                         492
//                       </div>
//                       <div className="absolute top-[0px] left-[216px] leading-[20px] font-medium">
//                         429
//                       </div>
//                       <div className="absolute top-[0px] left-[254px] leading-[20px] font-medium">
//                         922
//                       </div>
//                       <div className="absolute top-[0px] left-[295px] leading-[20px] font-medium">
//                         740
//                       </div>
//                       <div className="absolute top-[0px] left-[342px] leading-[20px] font-medium">
//                         274
//                       </div>
//                       <div className="absolute top-[0px] left-[384px] leading-[20px] font-medium">
//                         540
//                       </div>
//                       <div className="absolute top-[0px] left-[431px] leading-[20px] font-medium">
//                         423
//                       </div>
//                       <div className="absolute top-[0px] left-[478px] leading-[20px] font-medium">
//                         647
//                       </div>
//                       <div className="absolute top-[0px] left-[585px] leading-[20px] font-medium">
//                         561
//                       </div>
//                       <div className="absolute top-[0px] left-[631px] leading-[20px] font-medium">
//                         177
//                       </div>
//                       <div className="absolute top-[0px] left-[668px] leading-[20px] font-medium">
//                         556
//                       </div>
//                       <div className="absolute top-[0px] left-[708px] leading-[20px] font-medium">
//                         447
//                       </div>
//                       <div className="absolute top-[0px] left-[750px] leading-[20px] font-medium">
//                         357
//                       </div>
//                       <div className="absolute top-[0px] left-[793px] leading-[20px] font-medium">
//                         185
//                       </div>
//                       <div className="absolute top-[0px] left-[831px] leading-[20px] font-medium">
//                         453
//                       </div>
//                       <div className="absolute top-[0px] left-[872px] leading-[20px] font-medium">
//                         426
//                       </div>
//                       <div className="absolute top-[0px] left-[916px] leading-[20px] font-medium">
//                         738
//                       </div>
//                     </div>
//                   </div>
//                   <div className="absolute top-[0px] left-[0px] w-[1301px] h-16 text-darkslategray-100">
//                     <div className="absolute top-[0px] left-[0px] rounded-8xs bg-greenyellow shadow-[0px_4px_15px_rgba(0,_0,_0,_0.25)] w-[1301px] h-16" />
//                     <div className="absolute top-[22px] left-[15px] w-[1268px] h-5">
//                       <div className="absolute top-[0px] left-[0px] leading-[20px] font-semibold">
//                         Par
//                       </div>
//                       <div className="absolute top-[0px] left-[93px] leading-[20px] font-medium">
//                         308
//                       </div>
//                       <div className="absolute top-[0px] left-[147px] leading-[20px] font-medium">
//                         3
//                       </div>
//                       <div className="absolute top-[0px] left-[186px] leading-[20px] font-medium">
//                         5
//                       </div>
//                       <div className="absolute top-[0px] left-[218px] leading-[20px] font-medium">
//                         45
//                       </div>
//                       <div className="absolute top-[0px] left-[255px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[297px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[344px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[387px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[433px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[1141px] leading-[20px] font-medium">
//                         HDCP
//                       </div>
//                       <div className="absolute top-[0px] left-[480px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[585px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[630px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[671px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[710px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[752px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[793px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[833px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[874px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[918px] leading-[20px] font-medium">
//                         213
//                       </div>
//                       <div className="absolute top-[0px] left-[984px] leading-[20px] font-medium">
//                         36
//                       </div>
//                       <div className="absolute top-[0px] left-[1066px] leading-[20px] font-medium">
//                         72
//                       </div>
//                       <div className="absolute top-[0px] left-[1235px] leading-[20px] font-medium">
//                         NET
//                       </div>
//                       <div className="absolute top-[0px] left-[519px] leading-[20px] font-medium text-dimgray-200">
//                         Initial
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <img
//                   className="absolute top-[6px] left-[104px] w-[1126px] h-[464px]"
//                   alt=""
//                   src="/img/group-1000008927.svg"
//                 />
//               </div>
//               <div className="absolute top-[0px] left-[calc(50%_-_649px)] w-[1300px] h-[63px] text-white">
//                 <div className="absolute top-[0px] left-[calc(50%_-_650px)] w-[1300px] h-[63px]">
//                   <div className="absolute top-[0px] left-[calc(50%_-_650px)] rounded-md bg-green shadow-[0px_4px_12px_#193a8b] w-[1300px] h-[63px]" />
//                   <div className="absolute top-[22px] left-[8px] w-[1283px] h-5">
//                     <b className="absolute top-[0px] left-[0px] text-sm leading-[20px]">
//                       {t('HOLE')} #
//                     </b>
//                     <div className="absolute top-[0px] left-[117px] leading-[20px]">
//                       1
//                     </div>
//                     <div className="absolute top-[0px] left-[311px] leading-[20px] font-medium">
//                       6
//                     </div>
//                     <div className="absolute top-[0px] left-[154px] leading-[20px] font-medium">
//                       2
//                     </div>
//                     <div className="absolute top-[0px] left-[358px] leading-[20px] font-medium">
//                       7
//                     </div>
//                     <div className="absolute top-[0px] left-[194px] leading-[20px] font-medium">{`3 `}</div>
//                     <div className="absolute top-[0px] left-[401px] leading-[20px] font-medium">
//                       8
//                     </div>
//                     <div className="absolute top-[0px] left-[232px] leading-[20px] font-medium">
//                       4
//                     </div>
//                     <div className="absolute top-[0px] left-[447px] leading-[20px] font-medium">
//                       9
//                     </div>
//                     <div className="absolute top-[0px] left-[269px] leading-[20px] font-medium">
//                       5
//                     </div>
//                     <div className="absolute top-[0px] left-[483px] leading-[20px] font-medium">
//                       Out
//                     </div>
//                     <div className="absolute top-[0px] left-[596px] leading-[20px] font-medium">
//                       10
//                     </div>
//                     <div className="absolute top-[0px] left-[643px] leading-[20px] font-medium">
//                       11
//                     </div>
//                     <div className="absolute top-[0px] left-[682px] leading-[20px] font-medium">
//                       12
//                     </div>
//                     <div className="absolute top-[0px] left-[722px] leading-[20px] font-medium">
//                       13
//                     </div>
//                     <div className="absolute top-[0px] left-[763px] leading-[20px] font-medium">
//                       14
//                     </div>
//                     <div className="absolute top-[0px] left-[804px] leading-[20px] font-medium">
//                       15
//                     </div>
//                     <div className="absolute top-[0px] left-[844px] leading-[20px] font-medium">
//                       16
//                     </div>
//                     <div className="absolute top-[0px] left-[886px] leading-[20px] font-medium">
//                       17
//                     </div>
//                     <div className="absolute top-[0px] left-[929px] leading-[20px] font-medium">
//                       18
//                     </div>
//                     <div className="absolute top-[0px] left-[993px] leading-[20px] font-medium">
//                       In
//                     </div>
//                     <div className="absolute top-[0px] left-[1061px] leading-[20px] font-medium">
//                       {t('TOTAL')}
//                     </div>
//                     <div className="absolute top-[0px] left-[1151px] leading-[20px] font-medium">
//                       Rate
//                     </div>
//                     <div className="absolute top-[0px] left-[1232px] leading-[20px] font-medium">
//                       Slope
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="absolute top-[0px] left-[1px] w-[385px] h-[199px] text-17xl text-darkslateblue-300">
//         <div className="absolute top-[49px] left-[0px] rounded-[50%] [background:linear-gradient(180deg,_#8eff93,_rgba(171,_255,_132,_0.78))] w-[84px] h-[84px]" />
//         <img
//           className="absolute top-[0px] left-[6px] w-[57px] h-[103px] object-cover"
//           alt=""
//           src="/img/rectangle-1248@2x.png"
//         />
//         <img
//           className="absolute top-[87px] left-[273px] rounded-[50%] w-28 h-28 object-cover"
//           alt=""
//           src="/img/ellipse-2301@2x.png"
//         />
//         <b className="absolute top-[103px] left-[47px] [text-shadow:0px_7px_4px_#ccf2fe]">{`Scoring Table `}</b>
//       </div>
//     </div>
//   );
// };

// export default LeaderBoardScoringTable;
