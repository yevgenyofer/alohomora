import React, { FC } from 'react';

import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';

const bg = require('./img/jackpot.jpg') as string;

export const PageJackpot: FC<{}> = () => {

  // const handleIncrement = () => {
  //   impactOccurred('heavy');
  //   setBalance(balance + 1);
  // }

  const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();

  // const { handleStep, previousStep, nextStep } = useWizard();


  return (
    <div className="page page-2" style={{ backgroundImage: `url(${bg})` }}>
    </div>
  );
};