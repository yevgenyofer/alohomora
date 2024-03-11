import React, { FC, useState } from 'react';

import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useWizard } from 'react-use-wizard';

const bg = require('./placeholder-1.svg').default as string;

const stakingOption1 = require('./staking-option-1.svg').default as string;
const stakingOption2 = require('./staking-option-2.svg').default as string;
const stakingOption3 = require('./staking-option-3.svg').default as string;

// interface StakingStep1Props {
//   nextStep: () => void;
// }

const StakingStep2: FC = ({}) => {

  // const handleIncrement = () => {
  //   impactOccurred('heavy');
  //   setBalance(balance + 1);
  // }

  const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();

  const { nextStep, previousStep } = useWizard();

  const [selectedDuration, setSelectedDuration] = useState<string | null>(null);

  const handleSelectDuration = (duration: string) => {
    setSelectedDuration(duration);
  };

  return (
    <>
      <div className="form-placeholder" style={{ backgroundImage: `url(${bg})` }}>
        <div className="title">Select the duration </div>
        <div className="subtitle">The amount you about to stake will be locked until the term ends</div>
        <div className="radio-group">
          <div className={`custom-radio-button ${selectedDuration === '4 days' ? 'selected' : ''}`} onClick={() => handleSelectDuration('4 days')}>
            <img src={stakingOption1} alt="" />
          </div>
          <div className={`custom-radio-button ${selectedDuration === '14 days' ? 'selected' : ''}`} onClick={() => handleSelectDuration('14 days')}>
            <img src={stakingOption2} alt="" />
          </div>
          <div className={`custom-radio-button ${selectedDuration === '30 days' ? 'selected' : ''}`} onClick={() => handleSelectDuration('30 days')}>
            <img src={stakingOption3} alt="" />
          </div>
        </div>
      </div>
      <div className="form-buttons">
        <button className="form-button button-back" onClick={() => previousStep()}>Back</button>
        <button className="form-button button-next" onClick={() => nextStep()}>Continue</button>
      </div>
    </>
  );
};

export default StakingStep2;