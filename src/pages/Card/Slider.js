import React, { useState } from 'react';
import styles from './card.module.css';
import Slider from '@mui/material/Slider';

export const SliderCount = (props) => {

    const [sliderValue, setSliderValue] = useState(30);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
    };
    
	return (
		<>
            <div className={styles.sliderContainer}>
                <button onClick={() => setSliderValue(sliderValue + 1)}>+</button>
                <Slider 
                    orientation="vertical"
                    defaultValue={30} 
                    value={sliderValue}
                    step={50}
                />
                <button onClick={() => setSliderValue(sliderValue - 1)}>-</button>
            </div>
            
		</>
		)
}


