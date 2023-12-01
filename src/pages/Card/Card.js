  import React, { useEffect, useState } from 'react';
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
    const [currentCard, setCurrentCard] = useState({}); // data of current card
    const [isLoading, setIsLoading] = useState(true); // state for process of loading data from backend
    const [coefficient, setCoefficient] = useState({});
    const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);
    const [totalValue, setTotalValue] = useState(1000);

    // load cards from Redux state
    let state = useSelector(state => state.cards);
    const { id } = useParams();
    const navigate = useNavigate(); 
    const dispatch = useDispatch();
    const { updateTotal, updateCard } = cardsSlice.actions
    
    // receiving currentCard and totalValue from state
    useEffect(() => {
      let currentItem = state.cards.items.find( item => item._id === id)
      console.log("CurrentItem")
      console.log(state.cards.items)
      console.log(id)
      console.log(currentItem)
      setCurrentCard(currentItem)
      console.log("CurrentCard")
      console.log(currentCard);
      setTotalValue(state.total)
      console.log('total value')
      console.log(totalValue)
    }, [state.cards])
    
    // load data from pouchDB
    useEffect(() => {
      console.log("Данні з PouchDB заванатажуємо до стейту")
      async function fetchData() {
        await dispatch(loadDataFromPouchDB());
      }
      fetchData();
    }, [dispatch]);

    // receiving data from backend
    useEffect( () => {
      console.log('Завантажуємо данні картки з бекенда')
      axios
        .get(`cards/${id}`)
        .then( (res) => {
          console.log('Данні з бекенда завантажені')
          console.log(res.data);
          setCurrentCard(res.data);
          console.log(currentCard)
          setIsLoading(false);
          const totalValue = total(res.data.items);
          const calculatedCoefficient = recalculation(currentCard.items, totalValue);
          setCoefficient(calculatedCoefficient);
          dispatch(updateTotal(totalValue));
        })
        .catch( (err) => {
          console.warn(err);
          alert('Помилка при отриманні статті')
        });
    }, [id])

// calculation coefficient
useEffect(() => {
  if (!currentCard || !currentCard.items) {
    return; // Вихід, якщо currentCard або його властивість items є null або undefined
  }

  const calculatedCoefficient = recalculation(currentCard.items, totalValue);
  setCoefficient(calculatedCoefficient);
  dispatch(updateTotal(totalValue));
}, [currentCard]);

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
      console.log(sum)
      return sum;
    }

    // block sleeping on smartphone
    useEffect( () => {
       requestWakeLock()
      }, []
    )

    // recalculation card values from totalValue
    useEffect( () => {
      if (totalValue > 0 && currentCard && currentCard.items && Object.keys(coefficient).length > 0) {
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