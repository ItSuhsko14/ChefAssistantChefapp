import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import { CardPreview } from './CardPreview.js';
import { fetchCards } from '../../redux/slices/cards.js';
import Loading from '../../Components/Loading/Loading.js';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DndProvider } from 'react-dnd'; // Замініть імпорт
import { TouchBackend } from 'react-dnd-touch-backend'; // Додайте імпорт для сенсорних екранів

import { cardsSlice } from '../../redux/slices/cards.js';

function GaetAll() {
  
  const dispatch = useDispatch();
  const { cards } = useSelector(state => state.cards);
  console.log(cards);
  const isCardsLoading = cards.status === 'loading';
  console.log(isCardsLoading);
  console.log(cards)

  useEffect(() => {
    dispatch(fetchCards())
  }, [])

  const {updateCards} = cardsSlice.actions

  const handleDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    // Отримайте індекси переміщення і оновіть порядок карток
    const startIndex = result.source.index;
    const endIndex = result.destination.index;
    const updatedCardsItems = [...cards.items];
    const [movedCard] = updatedCardsItems.splice(startIndex, 1);
    updatedCardsItems.splice(endIndex, 0, movedCard);
    
    // Оновіть стан з оновленим порядком карток
    dispatch(updateCards(updatedCardsItems));
  };

  if (isCardsLoading) return <Loading />

      return (
        <>
          <Container
            sx={{ marginTop: "20px"}}
          >
            <DndProvider backend={TouchBackend}>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="card-list">
                {(provided) => (
                  <Grid container ref={provided.innerRef}  spacing={2} {...provided.droppableProps}>
                    {cards.items.map( (item, index) => (
                      <Draggable key={item._id} draggableId={item._id} index={index}>
                        {(provided) => (
                            <Grid xs={6} sm={4} md={3} lg={2} xl={2}
                              ref={provided.innerRef} 
                              {...provided.draggableProps} 
                              {...provided.dragHandleProps}
                            >    
                              <CardPreview 
                                name={item.title} 
                                // text={item.text} 
                                link={item._id} 
                                cardId={item._id} 
                              />
                            </Grid>
                        )}
                      </Draggable> 
                    ))}
                    {provided.placeholder}
                  </Grid>
                )}
              </Droppable>
            </DragDropContext>
            </DndProvider>
          </Container>
        </>
      )
  }

export default GaetAll;