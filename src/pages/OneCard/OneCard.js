import React, {useState, useEffect} from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import {useParams} from 'react-router-dom';
import Card from '../Card/Card.js';

function OneCard() {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [card, setCard] = useState([]);
  const { id } = useParams();

  const baseUrl = `http://localhost:5000/cards/${id}`;
  
  useEffect( () => {
    fetch(baseUrl)
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoading(true);
          setCard(result);
        },

        (error) => {
          setIsLoading(false);
          setError(error);
        }
      )
  }, [])

  if (error) {
    return <div>Error: {error.message}</div>
  } else if (!isLoading) {
    return (
        <Box component="span" sx={{ 
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: 1,
          height: 400,
         }}>
            <CircularProgress />
        </Box>
      )
  } else {
      console.log(card.items);
      return (
        <>
          <Card name={card.title} text={card.text} items={card.items} cardId={card._id} />
        </>
      )
  }
}

export default OneCard;