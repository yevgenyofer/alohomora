import React from 'react';

import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { Wizard } from 'react-use-wizard';

import {StakingStep1, StakingStep2,StakingStep3, StakingStep4} from './steps';

const bg = require('../../img/staking-bg.jpg') as string;


export const PageStaking: React.FC = () => {

  // const handleIncrement = () => {
  //   impactOccurred('heavy');
  //   setBalance(balance + 1);
  // }

  const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();

  // const { handleStep, previousStep, nextStep } = useWizard();

  return (
    <div className="page page-2" style={{ backgroundImage: `url(${bg})` }}>
      <div className="content">
        <h1>Staking</h1>
        <Wizard>
          <StakingStep1 />
          <StakingStep2 />
          <StakingStep3 />
          <StakingStep4 />
        </Wizard>
      </div>
    </div>
  );
};