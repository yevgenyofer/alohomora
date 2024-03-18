import React from 'react';

import { useHapticFeedback } from '@vkruglikov/react-telegram-web-app';
import { useWizard } from 'react-use-wizard';

const bg = require('./img/placeholder-1.svg').default as string;

// interface StakingStep1Props {
//   nextStep: () => void;
// }

export const StakingStep3: React.FC = () => {

  // const handleIncrement = () => {
  //   impactOccurred('heavy');
  //   setBalance(balance + 1);
  // }

  const [impactOccurred, notificationOccurred, selectionChanged] = useHapticFeedback();

  const { nextStep, previousStep } = useWizard();

  const [sliderValue, setSliderValue] = React.useState(0); // initial slider value

  const handleSliderChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(event.target.value));
  };

  return (
    <>
      <div className="form-placeholder" style={{ backgroundImage: `url(${bg})` }}>
        <div className="title">Enter the amount</div>
        <div className="subtitle">Select the amount of coins you want to stake and confirm with the CONTINUE button</div>

        <div className="slider-value">{sliderValue}</div>

        <input
          type="range"
          min="0" // minimum value
          max="100" // maximum value
          value={sliderValue}
          onChange={handleSliderChange}
          className="slider"
        />

        <span className="slider-max">Available: 100</span>
      </div>

      <div className="form-buttons">
        <button className="form-button button-back" onClick={() => previousStep()}>Back</button>
        <button className="form-button button-next" onClick={() => nextStep()}>Continue</button>
      </div>
    </>
  );
};