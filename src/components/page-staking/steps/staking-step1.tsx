import React from 'react';

import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useWizard } from 'react-use-wizard';

const placeholder = require('./img/staking-placeholder.svg').default as string;

// interface StakingStep1Props {
//   nextStep: () => void;
// }

export const StakingStep1: React.FC = () => {

  // const handleIncrement = () => {
  //   impactOccurred('heavy');
  //   setBalance(balance + 1);
  // }

  const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();

  const { nextStep } = useWizard();


  return (
    <>
      <img className="placeholder" src={placeholder} alt="" />
      <button className="main-button" onClick={() => nextStep()}>Stake</button>
      <a className="bottom-link" href="">How it works?</a>
    </>
  );
};