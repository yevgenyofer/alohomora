import React from 'react';
import {Header} from '../header';

import { usePageClaimApi } from './hooks';
import { Links } from './links';


export const PageClaim: React.FC = () => {

  const {isLoading, balance, user, onBalanceChange} = usePageClaimApi();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="page page-claim">
      <Header />
      <div className="content">
        {user && (
          <div className="box balance">
            <span>Hi, {user.data[0].attributes.username}, your W-Balance:</span>
            <h1>{balance}</h1>
          </div>
        )}
        <div className="box claim">
          {/* <span>Next drop available in 52:23</span> */}
          <br />
          <button className="main-button" onClick={onBalanceChange}>Claim</button>
        </div>
        <div className="bottom-nav">
          <Links path="#/mates" icon="👨‍🚀" label="Mates" />
          <Links path="#/tasks" icon="🚀" label="Tasks" />
          <Links path="#/staking" icon="🏦" label="Staking" />
          <Links path="#/jackpot" icon="💰" label="52k" />
        </div>
      </div>
    </div>
  );
};
