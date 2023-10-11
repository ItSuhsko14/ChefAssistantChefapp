import React, { useState, useEffect } from 'react';
import styles from './card.module.css';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export const SliderCount = (props) => {

    
    const [sliderValue, setSliderValue] = useState(props.total);
    const [sliderStep, setSliderStep] = useState(50)
    const [maxValue, setMaxValue] = useState(props.total * 20);

    const handleSliderChange = (event, newValue) => {
        setSliderValue(newValue);
        
    };

    
    
    const recalculate = (items, total) => {
        const newItems = {}
        items.map( (item) => {

            newItems[item.name] = item.quantity
            
        })
        console.log(newItems)
    }
    recalculate(props.items, props.total)

    useEffect(() => {
        // Встановлюємо максимальне значення один раз при завантаженні компонента
        setMaxValue(props.total * 20);
    
    }, [props.total]);

	return (
		<>
            <div className={styles.sliderContainer}>
                <Button 
                    className={styles.sliderButton}
                    variant="outlined" 
                    size="small" 
                    onClick={() => setSliderValue(sliderValue + sliderStep)}
                >
                    <AddIcon />
                </Button>
                <Slider 
                    orientation="vertical"
                    value={sliderValue}
                    step={50}
                    onChange={handleSliderChange}
                    max={maxValue}
                    min={0}
                />
                <Button 
                    className={styles.sliderButton}
                    variant="outlined" 
                    size="small" 
                    onClick={() => setSliderValue(sliderValue - sliderStep)}
                >
                    <RemoveIcon />
                </Button>
            </div>
            
		</>
		)
}


