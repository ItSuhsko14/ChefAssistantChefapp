  import React, { useEffect, useState, useMemo } from 'react';
  import { recalculation, makeNewCard } from './Recalculation.js';
  import styles from './card.module.css';

  import { useDispatch, useSelector } from 'react-redux';
  import { fetchRemoveCard } from '../../redux/slices/cards.js';
  import { useNavigate } from "react-router-dom";
  import {useParams} from 'react-router-dom';
  import axios from '../../axios.js';
  import Loading from '../../Components/Loading/Loading.js';
  import ConfirmDialog from '../../Components/ConfirmDialogs/ConfirmDialog.js';
  import { cardsSlice } from '../../redux/slices/cards';
  import requestWakeLock from '../../utils/wakeLock.js'
  import CardPreview from './CardPreview.js'
  import { loadDataFromPouchDB } from '../../redux/slices/cards.js';

  function MyCard(props) {
    console.log('COMPONENT CARD')
    const [currentCard, setCurrentCard] = useState({}); // data of current card
    const [isLoading, setIsLoading] = useState(true); // state for process of loading data from backend
    const [coefficient, setCoefficient] = useState({});
    const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [totalValue, setTotalValue] = useState(0);

    // load state from Redux state and other parameters
    // console.log('Load cards from Redux state')
    let state = useSelector(state => state.cards);
    const { id } = useParams();
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const { updateTotal, updateCard } = cardsSlice.actions
  //   console.log('State', state);
  //   console.log('id=' + id);
    
    
    // receiving currentCard and totalValue from state
    useEffect(() => {
      console.log('Receiving currentCard and totalValue from state')
      let currentItem = state.cards.items.find( item => item._id === id)
      console.log('CurrentItem', currentItem);
      setCurrentCard(currentItem)
      setIsLoading(false)
      setTotalValue(state.total)
      // console.log('total value=' + totalValue);
    }, [state])
    
  //   // // load data from pouchDB
  //   // useEffect(() => {
  //   //   console.log("Данні з PouchDB заванатажуємо до стейту")
  //   //   async function fetchData() {
  //   //     await dispatch(loadDataFromPouchDB());
  //   //   }
  //   //   fetchData();
  //   // }, [dispatch]);

    // receiving data from backend
    useEffect( () => {
      console.log('Завантажуємо данні картки з бекенда')
      axios
        .get(`cards/${id}`)
        .then( (res) => {
          console.log('Данні з бекенда завантажені')
          // console.log('Завантажені данні - ', res.data);
          let currentCardValue = res.data;
          // console.log('currentCardValue = ', currentCardValue)
          setCurrentCard(currentCardValue);            
          const valueTotal = total(res.data.items);
          setTotalValue(valueTotal);
          dispatch(updateTotal(valueTotal))
          setIsLoading(false);
          const recalculationValue = recalculation(currentCardValue.items, valueTotal);
          // console.log('recalculationValue =', recalculationValue);
          setCoefficient(recalculationValue);
        })
        .catch( (err) => {
          console.warn(err);
        })
    }, [id])

    const openConfirmDialog = () => {
      setConfirmDialogOpen(true);
    };

    // calculation of the amount of ingredients
    const total = (items) => {
      if (!items || !Array.isArray(items)) {
        return 0; // або інше значення за замовчуванням, якщо items відсутні
      }
      const sum = items.reduce( (acc, item) => {
        return acc + item.quantity
      }, 0)
      console.log('Calculation was ended. Total - ', sum);
      return sum;
    }

  //   // block sleeping on smartphone
  //   useEffect( () => {
  //      requestWakeLock()
  //     }, []
  //   )

    // recalculation card values from totalValue
    useEffect( () => {
      console.log('Recalculation card values')
      if (totalValue > 1 && currentCard && currentCard.items && Object.keys(coefficient).length > 0) {
        // console.log('coefficient =', coefficient);
        let card = makeNewCard(currentCard.items, totalValue, coefficient)
        // console.log(card);
        setCurrentCard({
          ...currentCard,
          items: card,
        });
      }      
    }, [totalValue, coefficient] )

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