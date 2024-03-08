import { FC, DispatchWithoutAction, useState } from 'react';
import {
<<<<<<< HEAD
<<<<<<< HEAD
  createBrowserRouter,
=======
  createHashRouter,
>>>>>>> 0754376 (test)
=======
  createBrowserRouter,
>>>>>>> 8762c21 (test)
  RouterProvider,
} from 'react-router-dom';

import {
  useThemeParams,
} from '@vkruglikov/react-telegram-web-app';

import { ConfigProvider, theme } from 'antd';


import Header from './Header';
import MainButtonDemo from './MainButtonDemo';
import BackButtonDemo from './BackButtonDemo';
import ShowPopupDemo from './ShowPopupDemo';
import HapticFeedbackDemo from './HapticFeedbackDemo';
import ScanQrPopupDemo from './ScanQrPopupDemo';
import ExpandDemo from './ExpandDemo';
import useBetaVersion from './useBetaVersion';
import PageClaim from './PageClaim';
import PageMates from './PageMates';
import PageTasks from './PageTasks';

<<<<<<< HEAD
<<<<<<< HEAD
const router = createBrowserRouter([
  {
    path: "/",
    element: <PageClaim />,
  },
  {
    path: "/mates",
    element: <PageMates />,
  },
  {
    path: "/tasks",
    element: <PageTasks />,
=======
const router = createHashRouter([
  {
    path: "/",
    element: <PageClaim />,
    children: [
      {
        path: "mates",
        element: <PageMates />,
      },
      {
        path: "/tasks",
        element: <PageTasks />,
      },
    ],
>>>>>>> 0754376 (test)
=======
const router = createBrowserRouter([
  {
    path: "/",
    element: <PageClaim />,
  },
  {
    path: "/mates",
    element: <PageMates />,
  },
  {
    path: "/tasks",
    element: <PageTasks />,
>>>>>>> 8762c21 (test)
  },
]);

const Wrapper: FC<{
  onChangeTransition: DispatchWithoutAction;
}> = ({ onChangeTransition }) => {
  const [colorScheme, themeParams] = useThemeParams();
  const [isBetaVersion, handleRequestBeta] = useBetaVersion(false);
  const [activeBtn, setActiveBtn] = useState(true);

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
        <RouterProvider router={router} />
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