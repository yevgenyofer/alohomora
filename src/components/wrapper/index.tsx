import React, { FC, DispatchWithoutAction } from 'react';

import { ConfigProvider, theme } from 'antd';


import { Routers } from '../routers';
import { useWrapperApi } from './hooks';

const Wrapper: FC<{
  onChangeTransition: DispatchWithoutAction;
}> = ({ onChangeTransition }) => {

  const {colorScheme, themeParams } = useWrapperApi();


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
      </ConfigProvider>
    </div>
  );
};

export default Wrapper;