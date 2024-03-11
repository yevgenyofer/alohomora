import React, { FC, useState } from 'react';

import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';

import { Wizard, useWizard } from 'react-use-wizard';

import StakingStep1 from './StakingStep1';
import StakingStep2 from './StakingStep2';
import StakingStep3 from './StakingStep3';
import StakingStep4 from './StakingStep4';

const bg = require('./staking-bg.jpg') as string;

const PageStaking: FC<{}> = () => {

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

export default PageStaking;