import { FC, useState } from 'react';
import Header from './Header';

const PageClaim: FC<{}> = () => {

  const [balance, setBalance] = useState(0);

  const handleIncrement = () => {
    setBalance(balance + 1);
  }

  return (
    <div className="page page-claim">
      <Header />
      <div className="content">
        <div className="box balance">
          <span>W-Balance:</span>
          <h1>{balance}</h1>
        </div>
        <div className="box claim">
          <span>Next drop available in 52:23</span>
          <br />
          <button className="main-button" onClick={handleIncrement}>Claim</button>
        </div>
        <div className="bottom-nav">
          <a href="">
            <h3>👨‍🚀</h3>
            <span>Mates</span>
          </a>
          <a href="">
            <h3>🚀</h3>
            <span>Tasks</span>
          </a>
          <a href="">
            <h3>🏦</h3>
            <span>Staking</span>
          </a>
          <a href="">
            <h3>💰</h3>
            <span>52k</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PageClaim;