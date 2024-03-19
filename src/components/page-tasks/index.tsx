import React, { FC } from 'react';

const bg = require('./img/tasks-bg.jpg') as string;
const icon1 = require('./img/icon-1.svg').default as string;
const icon2 = require('./img/icon-2.svg').default as string;
const icon3 = require('./img/icon-3.svg').default as string;
const icon4 = require('./img/icon-4.svg').default as string;

export const PageTasks: FC<{}> = () => {

  return (
    <div className="page page-1 page-tasks" style={{ backgroundImage: `url(${bg})` }}>
      
      <div className="content">
        <div>
          <h1>Tasks 🚀</h1>
          <p>
            Earn W-coin rewards by completing simple tasks.
          </p>
        </div>
        <div className="list">
          <div className="items">
            <div className="item">
              <img src={icon1} alt="" />
              <div className="flex-column">
                <div className="balance">Join our Telegram community</div>
                <div className="username">+52 W-Coins</div>
              </div>
            </div>
            <div className="item">
              <img src={icon2} alt="" />
              <div className="flex-column">
                <div className="balance">Join our X community</div>
                <div className="username">+52 W-Coins</div>
              </div>
            </div>
            <div className="item completed">
              <img src={icon3} alt="" />
              <div className="flex-column">
                <div className="balance">Join our Discord server</div>
                <div className="username">+52 W-Coins</div>
              </div>
            </div>
            <div className="item">
              <img src={icon4} alt="" />
              <div className="flex-column">
                <div className="balance">Join presale on our website</div>
                <div className="username">+52 W-Coins</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};