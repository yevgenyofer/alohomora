import React, { FC, useState } from 'react';
import Header from './Header';

import { useHapticFeedback, useInitData  } from '@vkruglikov/react-telegram-web-app';

const PageClaim: FC<{}> = () => {

  const [balance, setBalance] = useState(0);

  const [initDataUnsafe] = useInitData();

  const user = initDataUnsafe?.user;

  const handleIncrement = () => {
    impactOccurred('heavy');
    setBalance(balance + 1);
  }

  const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();

  return (
    <div className="page page-claim">
      <Header />
      <div className="content">
        <div className="box balance">
          <span>W-Balance:</span>
          <h1>{balance}</h1>
        </div>
        <div className="box claim">
          {/* <span>Next drop available in 52:23</span> */}
          <span>{JSON.stringify(user)}</span>
          <br />
          <button className="main-button" onClick={handleIncrement}>Claim</button>
        </div>
        <div className="bottom-nav">
          <a href="#/mates">
            <h3>👨‍🚀</h3>
            <span>Mates</span>
          </a>
          <a href="#/tasks">
            <h3>🚀</h3>
            <span>Tasks</span>
          </a>
          <a href="#/staking">
            <h3>🏦</h3>
            <span>Staking</span>
          </a>
          <a href="#/jackpot">
            <h3>💰</h3>
            <span>52k</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageClaim;