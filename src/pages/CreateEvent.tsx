
import React, { useState } from 'react';
import TournamentBg from "../components/TournamentBg"
import BasicInfo from  "../components/BasicInfo"
import Recruitment from "../components/Recruitment"
import ItemInstruction from '../components/ItemInstruction';
import ScoringCategory from "../components/ScoringCategory";
import PaymentDetails from "../components/PaymentDetails";
const CreateEvent: React.FC = () => {
   
  return (
    <div >
     <TournamentBg/>
     <BasicInfo/>
     <Recruitment/>
     <ItemInstruction/>
     <ScoringCategory/>
     <PaymentDetails/>
    </div>
  );
};

export default CreateEvent;
