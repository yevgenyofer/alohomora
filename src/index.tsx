import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';
import {
  WebAppProvider,
} from '@vkruglikov/react-telegram-web-app';
import 'antd/dist/reset.css';

import './index.css';

import Wrapper from './components/wrapper';
import { store } from './store';
import { Provider } from 'react-redux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

const App = () => {
  const [smoothButtonsTransition, setSmoothButtonsTransition] = useState(false);

  return (
    <WebAppProvider options={{ smoothButtonsTransition }}>
        <Provider store={store}>
      <Wrapper
        onChangeTransition={() => setSmoothButtonsTransition(state => !state)}
      />
      </Provider>
    </WebAppProvider>
  );
};

root.render(<App />);
