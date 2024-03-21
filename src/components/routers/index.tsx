import React from 'react';

import { HashRouter, Routes, Route } from 'react-router-dom';

import {PageClaim} from '../page-claim';
import {PageMates} from '../page-mates';
import {PageTasks} from '../page-tasks';
import {PageStaking} from '../page-staking';
import {PageDashboard} from '../page-dashboard';
import {PageJackpot} from '../page-jackpot';

const ROUTES = {
  MAIN: {
    PATH:'/',
   COMPONENT:  <PageClaim />,
  },
  MATES: {
    PATH:'/mates',
   COMPONENT: <PageMates />,
  },
  TASKS: {
    PATH:'/tasks',
   COMPONENT: <PageTasks />,
  },
  STAKING: {
    PATH:'/staking',
   COMPONENT: <PageStaking />,
  },
  DASHBOARD: {
    PATH:'/dashboard',
   COMPONENT: <PageDashboard />,
  },
  JACKPOT: {
    PATH:'/jackpot',
   COMPONENT: <PageJackpot />,
  },
  OTHER: {
    PATH:'*',
   COMPONENT: <PageClaim />
  },
};


export const Routers:React.FC = () => {
  return (  
    <HashRouter>
      <Routes>
        <Route path={ROUTES.MAIN.PATH} element={ROUTES.MAIN.COMPONENT} />
        <Route path={ROUTES.MATES.PATH} element={ROUTES.MATES.COMPONENT} />
        <Route path={ROUTES.TASKS.PATH} element={ROUTES.TASKS.COMPONENT} />
        <Route path={ROUTES.STAKING.PATH} element={ROUTES.STAKING.COMPONENT} />
        <Route path={ROUTES.DASHBOARD.PATH} element={ROUTES.DASHBOARD.COMPONENT} />
        <Route path={ROUTES.DASHBOARD.PATH} element={ROUTES.DASHBOARD.COMPONENT} />
        <Route path={ROUTES.DASHBOARD.PATH} element={ROUTES.DASHBOARD.COMPONENT} />
        <Route path={ROUTES.OTHER.PATH} element={ROUTES.OTHER.COMPONENT} />
      </Routes>
  </HashRouter>
  );
};