import React from 'react';

import logo from './img/w-coin.svg';

import icon1 from './img/discovery.svg';
import icon2 from './img/wallet.svg';
import icon3 from './img/setting.svg';

import './index.scss';

export const Header: React.FC<{}> = () => {
  return (
    <header className="header">
      <img
        src={logo}
        className="App-logo"
        alt="logo"
      />
      <div className="icons">
        <a href="">
          <img src={icon1} alt="" />
        </a>
        <a href="">
          <img src={icon2} alt="" />
        </a>
        <a href="">
          <img src={icon3} alt="" />
        </a>
      </div>
    </header>
  );
};