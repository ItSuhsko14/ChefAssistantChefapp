import * as React from 'react';
import {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Loading from '../Components/Loading/Loading.js';
import { fetchCards } from '../redux/slices/cards.js';

export const DynamicCardBreadcrumb = ({ match }) => {

  console.log(match);
  const params = useParams();
  console.log(params.id);
  const { cards } = useSelector(state => state.cards);
  console.log(cards);
  const loadStatus = cards.status;

  if (loadStatus === 'loaded') {
    // Використовуємо find() для пошуку відповідного об'єкта
    console.log(cards.items);
    const foundItem = cards.items.find((item) => item._id === params.id);
  
    if (foundItem) {
      console.log(foundItem.title); // Виводимо title, якщо знайдено відповідний об'єкт
      return foundItem.title;
    } else {
      return 'No Title'; // Повертаємо рядок 'No Title', якщо об'єкт не знайдено
    }
  } else {
    return '...'; // Повертаємо рядок '...' як індікатор завантаження
  }
    // const dispatch = useDispatch();
    
    // const isCardsLoading = cards.status === 'loading';
    
    // React.useEffect(() => {
    //   if (!isCardsLoading) {
    //     // Викликати fetchCards() тільки якщо дані не завантажуються (тобто isCardsLoading дорівнює false)
    //     dispatch(fetchCards());
    //   }
    // }, [dispatch, isCardsLoading]);

    
    // console.log(cards)
    // if ( isCardsLoading === 'loading') {
    //   cards.items.map( item => {
    //     return {id:item._id, title: item.title} 
    //   })
    // } else {
    //   const cardTitleById = "no title";
    // }
    
    // console.log(cardTitlesById);

    // const currentTitle = cardTitlesById.find( (item) => item.id === params.id).title || 'no title'
    // console.log(currentTitle)
    
    // if (isCardsLoading === 'loading') return <Loading />
      
    // const currentTitle = 'currentTitle';
    // return (
    //   <span>
    //     {currentTitle ? currentTitle : 'No Title'}
    //   </span>
    // )
  };