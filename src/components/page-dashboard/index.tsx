import React from 'react';

import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useNavigate } from 'react-router-dom';

import './index.scss';

const bg = require('../../img/staking-bg.jpg') as string;
const contentBg = require('./img/dashboard-bg.svg').default as string;

export const PageDashboard: React.FC = () => {

  // const handleIncrement = () => {
  //   impactOccurred('heavy');
  //   setBalance(balance + 1);
  // }

  const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();

  // const { handleStep, previousStep, nextStep } = useWizard();

  const navigate = useNavigate();
  const handleNew = () => {
    impactOccurred('heavy');
    navigate('/staking');
  }

  return (
    <div className="page page-2 page-dashboard" style={{ backgroundImage: `url(${bg})` }}>
      <div className="content" style={{ backgroundImage: `url(${contentBg})` }}>
        <h1>Dashboard</h1>
        <div className="stakes">
          
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

          <div className="staking-box new" onClick={() => handleNew()}>
            <span>+</span>
          </div>
        </div>
      </div>
    </div>
  );
};