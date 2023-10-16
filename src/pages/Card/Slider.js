import React, { useState, useEffect } from 'react';
import styles from './card.module.css';
import Slider from '@mui/material/Slider';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch } from 'react-redux';
import { cardReducer } from '../../redux/slices/cards';
import { cardsSlice } from '../../redux/slices/cards';
import { useSelector } from 'react-redux';



export const SliderCount = () => {
    
    const [sliderValue, setSliderValue] = useState(0); 
    const [sliderStep, setSliderStep] = useState(50)
    const [maxValue, setMaxValue] = useState(5000);

    const dispatch = useDispatch();
    
    const state = useSelector(state => state.cards);
    let totalValue;
    
    useEffect(() => {
        setSliderValue(state.total);
        console.log(state.total)
      }, [state.total]);

    const {updateTotal} = cardsSlice.actions
    // console.log(cardsSlice.actions)
    
    
    const handleSliderChange = (event, newValue) => {
        console.log('handleSliderChange')
        if (sliderValue<5) {
            let total = 5
        } else {
            const total = newValue;
        }
        let total = newValue;

        const remainder = newValue % sliderStep; // Залишок від ділення maxValue на sliderStep

        if (remainder !== 0) {
        // Зменшуємо maxValue до найближчого меншого кратного sliderStep
        total -= remainder;
        }
        dispatch(updateTotal(Math.round(total)));
    };

    useEffect(() => {
        // Цей ефект слідкує за змінами значення слайдера і оновлює максимальне значення відповідно до вашої логіки
        if (sliderValue >= 0.9 * maxValue) {
          setMaxValue(Math.round(maxValue * 3)); // Збільшити максимальне значення вдвічі
        } else if (sliderValue <= 0.1 * maxValue && maxValue > 0) {
          setMaxValue(Math.round(maxValue / 2)); // Зменшити максимальне значення вдвічі, але не менше 0
        }

        switch (true) {
            case sliderValue < 100:
                setSliderStep(1);
                break;
            case 101 < sliderValue < 1000:
                setSliderStep(10);
                break;
            case 1001 < sliderValue > 3000:
                setSliderStep(50);
                break;
            default:
                // Значення за межами зазначених виразів
                setSliderStep(1); // Або будь-яке інше значення за замовчуванням
                break;
            }

        console.log('maxValue')
        console.log(maxValue)
        
        console.log('sliderStep')
        console.log(sliderStep)
      }, [sliderValue, maxValue]);
      
       useEffect(() => {
        // Встановлюємо максимальне значення один раз при завантаженні компонента
        // setMaxValue(sliderValue);
    
    }, []);

	return (
		<>
            <div className={styles.sliderContainer}>
                <Button 
                    className={styles.sliderButton}
                    variant="outlined" 
                    size="small" 
                    onClick={() => {
                        const newValue = sliderValue + sliderStep; // Обчислюємо нове значення
                        dispatch(updateTotal(newValue)); // Оновлюємо в Redux state
                        handleSliderChange(null, newValue); // Викликаємо handleSliderChange
                        }
                    }                
                >
                    <AddIcon />
                </Button>
                <Slider 
                    orientation="vertical"
                    value={sliderValue}
                    step={sliderStep}
                    onChange={handleSliderChange}
                    max={maxValue}
                    min={5}
                />
                <Button 
                    className={styles.sliderButton}
                    variant="outlined" 
                    size="small" 
                    onClick={() => {
                        const newValue = sliderValue - sliderStep; // Обчислюємо нове значення
                        dispatch(updateTotal(newValue)); // Оновлюємо в Redux state
                        handleSliderChange(null, newValue); // Викликаємо handleSliderChange
                        }
                    }               
                >
                    <RemoveIcon />
                </Button>
            </div>
            
		</>
		)
}


// 1 - отримати данні
// 2 - розрахувати значення total
// 3 - передати total в Redux state
