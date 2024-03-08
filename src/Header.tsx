import { FC } from 'react';

import logo from './w-coin.svg';

import icon1 from './Discovery.svg';
import icon2 from './Wallet.svg';
import icon3 from './Setting.svg';


const Header: FC<{}> = () => {
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

export default Header;