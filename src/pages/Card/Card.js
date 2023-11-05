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
  import ConfirmDialog from '../../Components/ConfirmDialogs/ConfirmDialog.js';
  import { cardsSlice } from '../../redux/slices/cards';
  import requestWakeLock from '../../utils/wakeLock.js'
  import CardPreview from './CardPreview.js'
  import { loadDataFromPouchDB } from '../../redux/slices/cards.js';

  function MyCard(props) {
    const [currentCard, setCurrentCard] = useState({}); // data of current card
    const [isLoading, setIsLoading] = useState(true); // state for process of loading data from backend
    const [coefficient, setCoefficient] = useState({});
    const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [totalValue, setTotalValue] = useState(0);

    // load cards from Redux state
    let state = useSelector(state => state.cards);
    console.log(state)
    
    
    const { id } = useParams();
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const { updateTotal, updateCard } = cardsSlice.actions
    
    // receiving currentCard and totalValue from state
    useEffect(() => {
      let currentItem = state.cards.items.find( item => item._id == id)
      setCurrentCard(currentItem)
      console.log("CurrentCard")
      console.log(currentCard);
      setTotalValue(state.total)
      console.log('total value')
      console.log(totalValue)
    }, [state])
    
    // load data from pouchDB
    useEffect(() => {
      console.log("Данні з PouchDB заванатажуємо до стейту")
      dispatch(loadDataFromPouchDB());
      setIsLoading(false);
    }, [dispatch]);

    useEffect(() => {
      const totalValue = total(currentCard.items);
      setCoefficient(recalculation(currentCard.items, totalValue));
      dispatch(updateTotal(totalValue));
    }, [currentCard])

    const openConfirmDialog = () => {
      setConfirmDialogOpen(true);
    };

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

    // block sleeping on smartphone
    useEffect( () => {
       requestWakeLock()
      }, []
    )

    // receiving data from backend
    useEffect( () => {
      axios
        .get(`cards/${id}`)
        .then( (res) => {
          setCurrentCard(res.data);
          setIsLoading(false);
          // const totalValue = total(res.data.items);
          // setCoefficient(recalculation(res.data.items, totalValue));
          // dispatch(updateTotal(totalValue));
        })
        .catch( (err) => {
          console.warn(err);
          alert('Помилка при отриманні статті')
        });
    }, [])

    // recalculation card values from totalValue
    useEffect( () => {
      if (totalValue > 0 && currentCard && currentCard.items && coefficient) {
        console.log('coefficient')
        console.log(coefficient)
        let card = makeNewCard(currentCard.items, totalValue, coefficient)
        console.log(card);
        setCurrentCard({
          ...currentCard,
          items: card,
        });
      }
      
    }, [totalValue] )

    // handle deleting card
    const deleteCard = async () => {
        setConfirmDialogOpen(false);
        dispatch(fetchRemoveCard(id));
        navigate('/getAll')
      }

    return (
      <>
        {isLoading ? (
          <Loading />
        ) : (
          <CardPreview
            currentCard={currentCard}
            totalValue={totalValue}
            openConfirmDialog={openConfirmDialog}
            id={id}
          />
        )}

        <ConfirmDialog
            open={isConfirmDialogOpen}
            onClose={() => setConfirmDialogOpen(false)}
            onConfirm={deleteCard}
        />
      </>
    );
  }

  export default MyCard