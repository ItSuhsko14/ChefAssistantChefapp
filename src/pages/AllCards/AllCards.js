import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { CardPreview } from './CardPreview.js';
import { fetchCards } from '../../redux/slices/cards.js';
import Loading from '../../Components/Loading/Loading.js';

function GaetAll() {
  
  const dispatch = useDispatch();
  const { cards } = useSelector(state => state.cards);
  console.log(cards);
  const isCardsLoading = cards.status === 'loading';
  console.log(isCardsLoading);
  console.log(cards)

  React.useEffect(() => {
    dispatch(fetchCards())
  }, [])

    if (isCardsLoading) return <Loading />

      return (
        <>
          <Container>
            <Grid container spacing={2}>
              
              {cards.items.map( item => (
                  <Grid xs={4}>    
                    <CardPreview 
                      name={item.title} 
                      text={item.text} 
                      link={item._id} 
                      cardId={item._id} 
                    />
                  </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )
  }

export default GaetAll;