import React, { FC, useState } from 'react';

import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useWizard } from 'react-use-wizard';
import { useNavigate } from 'react-router-dom';


const bg = require('./placeholder-1.svg').default as string;

// interface StakingStep1Props {
//   nextStep: () => void;
// }

const StakingStep4: FC = ({}) => {

  // const handleIncrement = () => {
  //   impactOccurred('heavy');
  //   setBalance(balance + 1);
  // }

  const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();

  const { nextStep, previousStep } = useWizard();

  const navigate = useNavigate();
  const handleStake = () => {
    impactOccurred('heavy');
    navigate('/dashboard');
  }

  return (
    <>
      <div className="form-placeholder" style={{ backgroundImage: `url(${bg})` }}>
        <div className="title big">INFO</div>
        <div className="staking-box">
          <div className="col">
            <div className="item">
              <div className="title">Duration</div>
              <div className="value">30 days</div>
            </div>
            <div className="item">
              <div className="title">Percent</div>
              <div className="value">101%</div>
            </div>
          </div>
          <div className="col">
            <div className="item">
              <div className="title">Amount</div>
              <div className="value">1052 W-coin</div>
            </div>
            <div className="item">
              <div className="title">You'll earn</div>
              <div className="value purple">2115 W-coin</div>
            </div>
          </div>
        </div>
      </div>

      <div className="form-buttons">
        <button className="form-button button-back" onClick={() => previousStep()}>Back</button>
        <button className="form-button button-next" onClick={() => handleStake()}>STAKE</button>
      </div>
    </>
  );
};

export default StakingStep4;