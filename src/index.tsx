import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  WebAppProvider,
} from '@vkruglikov/react-telegram-web-app';
import 'antd/dist/reset.css';

import './index.css';

import Wrapper from './Wrapper';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const App = () => {
  const [smoothButtonsTransition, setSmoothButtonsTransition] = useState(false);

  return (
    <WebAppProvider options={{ smoothButtonsTransition }}>
      <Wrapper
        onChangeTransition={() => setSmoothButtonsTransition(state => !state)}
      />
    </WebAppProvider>
  );
};

root.render(<App />);
