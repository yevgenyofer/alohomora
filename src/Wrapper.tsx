import React, { FC, DispatchWithoutAction } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import {
  useThemeParams,
  useExpand,
} from '@vkruglikov/react-telegram-web-app';

import { ConfigProvider, theme } from 'antd';

import PageClaim from './PageClaim';
import PageMates from './PageMates';
import PageTasks from './PageTasks';
import PageStaking from './PageStaking';
import PageDashboard from './PageDashboard';
import PageJackpot from './PageJackpot';

const Wrapper: FC<{
  onChangeTransition: DispatchWithoutAction;
}> = ({ onChangeTransition }) => {
  const [colorScheme, themeParams] = useThemeParams();
  const [isExpanded, expand] = useExpand();
  expand();

  return (
    <div>
      <ConfigProvider
        theme={
          themeParams.text_color
            ? {
                algorithm:
                  colorScheme === 'dark'
                    ? theme.darkAlgorithm
                    : theme.defaultAlgorithm,
                token: {
                  colorText: themeParams.text_color,
                  colorPrimary: themeParams.button_color,
                  colorBgBase: themeParams.bg_color,
                },
              }
            : undefined
        }
      >
        <HashRouter>
          <Routes>
            <Route path="/" element={<PageClaim />}></Route>
            <Route path="/mates" element={<PageMates />}></Route>
            <Route path="/tasks" element={<PageTasks />}></Route>
            <Route path="/staking" element={<PageStaking />}></Route>
            <Route path="/dashboard" element={<PageDashboard />}></Route>
            <Route path="/jackpot" element={<PageJackpot />}></Route>
            <Route path="*" element={<PageClaim />}></Route>
          </Routes>
        </HashRouter>
        {/* <div className="contentWrapper"> */}
          {/* {isBetaVersion && (
            <div className="betaVersion">
              <h3>WARNING: BETA VERSION</h3>
              <button onClick={() => setActiveBtn(state => !state)}>
                change button
              </button>
              <button onClick={onChangeTransition}>change </button>
            </div>
          )} */}
          {/* <ExpandDemo />
          {!activeBtn ? (
            <MainButtonDemo
              initialValues={{
                show: isBetaVersion,
                text: 'SECOND BUTTON',
                progress: true,
              }}
              key="1"
            />
          ) : (
            <MainButtonDemo
              key="2"
              initialValues={{
                show: isBetaVersion,
              }}
            />
          )}
          <BackButtonDemo />
          <ShowPopupDemo />
          <HapticFeedbackDemo />
          <ScanQrPopupDemo />
        </div> */}
      </ConfigProvider>
    </div>
  );
};

export default Wrapper;