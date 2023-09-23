import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useSelector } from 'react-redux';
import { Routes, Route, useParams } from 'react-router-dom';



export const DynamicCardBreadcrumb = ({ match }) => {
    console.log(match)
    
    const { cards } = useSelector(state => state.cards);
    const cardTitlesById = cards.items.map( item => {
      return {id:item._id, title: item.title} 
    });
    
    console.log(cards)
    console.log(cardTitlesById);
    console.log(match)
    const params = useParams();
    console.log(params);
    const currentTitle = cardTitlesById.find( (item) => item.id === params.id).title
    console.log(currentTitle)
      
    return (
      <span>
        {currentTitle}
      </span>
    )
  };