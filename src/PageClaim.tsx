import React, { FC, useEffect, useState } from 'react';
import Header from './Header';

import { useHapticFeedback, useInitData  } from '@vkruglikov/react-telegram-web-app';
import { useFetchOrCreateUser, useUpdateUser } from './ApiHooks';


const PageClaim: FC<{}> = () => {
  const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();
  const [initDataUnsafe] = useInitData();
  const dummyUser = {
    id: 1234567,
    first_name: "Dummy",
    last_name: "User",
    username: "dummyuser",
  };
  const tgUser = initDataUnsafe?.user || dummyUser;
  const { loading: loadingUser, data: user } = useFetchOrCreateUser(tgUser);
  const { loading: updatingUser, updateUser } = useUpdateUser();

  const [balance, setBalance] = useState(0);

  useEffect(() => {
    console.log(user)
    if (user && user.attributes) {
      setBalance(Number(user.attributes?.clicks) || 0);
    }
  }, [user]);

  const handleIncrement = () => {
    impactOccurred('heavy');
    const updatedClicks = Number(balance) + 1;
    updateUser(user.id, { clicks: updatedClicks });
    setBalance(updatedClicks);
  }

  if (loadingUser) {
    return <div>Loading...</div>;
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