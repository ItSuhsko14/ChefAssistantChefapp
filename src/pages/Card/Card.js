  import React, { useEffect, useState } from 'react';
  import { Ingredient } from './CardItems.js';
  import { SliderCount } from './Slider.js';
  import { recalculation, makeNewCard } from './Recalculation.js';
  import styles from './card.module.css';
  import Box from '@mui/material/Box';
  import Button from '@mui/material/Button';
  import ButtonGroup from '@mui/material/ButtonGroup';
  import TextField from '@mui/material/TextField';

  import ClearIcon from '@mui/icons-material/Clear';
  import { useDispatch, useSelector } from 'react-redux';
  import { fetchRemoveCard, fetchCards } from '../../redux/slices/cards.js';
  import { Link, useNavigate } from "react-router-dom";
  import {useParams} from 'react-router-dom';
  import axios from '../../axios.js';
  import Loading from '../../Components/Loading/Loading.js';
  import { cardsSlice } from '../../redux/slices/cards';


  import Table from '@mui/material/Table';
  import TableBody from '@mui/material/TableBody';
  import TableCell from '@mui/material/TableCell';
  import TableContainer from '@mui/material/TableContainer';
  import TableHead from '@mui/material/TableHead';
  import TableRow from '@mui/material/TableRow';
  import Paper from '@mui/material/Paper';


  function MyCard(props) {
    const [currentCard, setCurrentCard] = useState({}); // data of current card
    const [isLoading, setIsLoading] = useState(true); // state for process of loading data from backend
    const [coefficient, setCoefficient] = useState({});
    
    const { id } = useParams();
    console.log(id)

    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const {updateTotal, updateCard} = cardsSlice.actions
    

    // we get data from Redux state
    const state = useSelector(state => state.cards);
    let totalValue;
    totalValue = state.total;
    if (isLoading == false) {console.log(state)}
    console.log('totalValueFromState')
    console.log(totalValue)
    
    // calculation of the amount of ingredients
    const total = (items) => {
      if (!items) {
        return 0; // або інше значення за замовчуванням, якщо items відсутні
      }
      const sum = items.reduce( (acc, item) => {
        return acc + item.quantity
      }, 0)
      console.log(sum)
      return sum;
    }

    // receiving data from backend
    useEffect( () => {
      axios
        .get(`cards/${id}`)
        .then( (res) => {
          setCurrentCard(res.data);
          console.log(currentCard)
          setIsLoading(false);
          console.log('currentCard was download')
          const totalValue = total(res.data.items);
          setCoefficient(recalculation(res.data.items, totalValue));
          dispatch(updateTotal(totalValue));
          console.log(totalValue);
          console.log(coefficient);
          
        })
        .catch( (err) => {
          console.warn(err);
          alert('Помилка при отриманні статті')
        });
    }, [])

    if (!isLoading) {console.log(currentCard)}

    useEffect( () => {
      console.log(coefficient)
      if (totalValue > 0 && currentCard && currentCard.items && coefficient) {
        let card = makeNewCard(currentCard.items, totalValue, coefficient)
        console.log(card);
        setCurrentCard({
          ...currentCard,
          items: card,
        });
      }
      
    }, [totalValue] )

    const deleteCard = async () => {
        console.log(id);
        dispatch(fetchRemoveCard(id));
        navigate('/getAll')
      }

    if (isLoading) return <Loading />

    return (
      <>
        <div className={styles.wrapper} >
          <div className={styles.ingredientContainer} >
          <Box >
            <h1 className={styles.header}>{currentCard.title || 'No Title'}</h1>
            <p>{currentCard.text}</p>
            <TableContainer component={Paper}>
              <Table sx={{ }} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Назва</TableCell>
                    <TableCell sx={{  }} align="right">Вага, г</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {currentCard.items.map((item) => {
                    return (
                      <Ingredient
                        key={item.name} 
                        name={item.name}
                        amount={item.quantity}
                        recalc='cellll'
                        
                      />
                    )
                    })}
                  <TableRow>
                    <TableCell align="right">Всього</TableCell>
                    <TableCell align="right">{totalValue}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            
            
            <div>
              <ButtonGroup variant="contained" aria-label="outlined primary button group">
                <Button> 
                  <Link 
                    to={`/addCard/${id}`}
                    className={styles.link}
                  >
                    Редагувати
                  </Link>
                </Button>          

                <Button onClick={deleteCard}> 
                    Видалити
                    <ClearIcon />
                </Button>
              </ButtonGroup>          
            
            </div>
          </Box>
          </div>  
          <div className={styles.sliderContainer} >
            <SliderCount />
          </div>
        </div>
      </>
    );
  }

  export default MyCard