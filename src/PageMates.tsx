import React, { FC, useState } from 'react';

const bg = require('./mates-bg.jpg') as string;

interface Mate {
  username: string;
  balance: number;
};

const PageMates: FC<{}> = () => {

  const [mates, setMates] = useState<Mate[]>([
    {
      username: "John",
      balance: 1000
    },
    {
      username: "Doe",
      balance: 2000
    },
    {
      username: "Jane",
      balance: 3000
    },
    {
      username: "Smith",
      balance: 4000
    }
  ]);

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

export default PageMates;