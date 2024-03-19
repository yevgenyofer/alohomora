import React, { FC } from 'react';
import { usePageMatesApi } from './hooks';

const bg = require('./img/mates-bg.jpg') as string;

export const PageMates: FC<{}> = () => {

  const {isLoading, mates, user} = usePageMatesApi();

  return (
    <div className="page page-1" style={{ backgroundImage: `url(${bg})` }}>
      
      <div className="content">
        <h1>Mates 👨‍🚀</h1>
        <p>
          Bring friends, earn more!
          <br />
          Each new friend nets you <b>50</b> W-Coins plus <b>1%</b> of their rewards.
        </p>
        <div className="list">
          <h2>My Mates</h2>
          <div className="items">
            {mates.length && mates.map((mate, index) => (
              <div className="item" key={index}>
                <img src="https://random.imagecdn.app/65/65" alt="" />
                <div className="username">{mate.username}</div>
                <div className="balance">{mate.balance} W-Coins</div>
              </div>
            ))}
          </div>
        </div>
        <button className="main-button">Invite a Mate</button>
      </div>
    </div>
  );
};
