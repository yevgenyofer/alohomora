import React, { FC, DispatchWithoutAction } from 'react';

import { ConfigProvider, theme } from 'antd';

import { Routers } from '../routers';
import { useWrapperApi } from './hooks';
import { BackButton } from '@vkruglikov/react-telegram-web-app';

const Wrapper: FC<{
  onChangeTransition: DispatchWithoutAction;
}> = ({ onChangeTransition }) => {

  const {colorScheme, themeParams } = useWrapperApi();

  const handleBackButtonClick = () => {
    // navigate to main page
    onChangeTransition();
    window.location.hash = '/';
  }
  
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
        <Routers />
        <BackButton onClick={() => handleBackButtonClick()} />
      </ConfigProvider>
    </div>
  );
};

export default Wrapper;