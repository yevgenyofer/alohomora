import React, { FC } from 'react';
import { usePageMatesApi } from './hooks';

import './index.scss';

const bg = require('./img/mates-bg.jpg') as string;

export const PageMates: FC<{}> = () => {

  const {isLoading, mates, rewardLevel, handleClaim, user} = usePageMatesApi();

  console.log(mates)

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page page-1" style={{ backgroundImage: `url(${bg})` }}>
      
      <div className="content">
        <h1>Mates 👨‍🚀</h1>
        <p>
          Bring friends, earn more!
          <br />
          You're on <b>{rewardLevel.title}</b>.
          <br />
          Each new friend nets you <b>{rewardLevel.oneTimeReward}</b> W-Coins plus <b>{rewardLevel.rewardPercentage}%</b> of their rewards.
        </p>
        <div className="list">
          <h2>My Mates ({mates.length})</h2>
          <div className="items">
            {mates.length && mates.map((mate, index) => (
              <div className="item" key={index}>
                <div className="username">{mate.username}</div>
                {(!mate.availableReward || mate.availableReward == 0) && <div className="balance">0 W-Coins</div>}
                {mate.availableReward > 0 && <button className="claim" onClick={() => handleClaim(mate, rewardLevel.rewardPercentage)}>CLAIM {mate.availableReward} W-Coins</button>}
              </div>
            ))}
          </div>
        </div>
        <button className="main-button">Invite a Mate</button>
      </div>
    </div>
  );
};
