import { useEffect, useState } from 'react';
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
import { loadDataFromPouchDB } from '../../redux/slices/cards.js';
import { pouchDB } from '../../pouchDB/pouch.js'

function GaetAll() {
  
  console.log('Всі картки почались')
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  console.log('Отримуємо значення карток зі стейта')
  const { cards } = useSelector(state => state.cards);
  console.log('Данні карток: ', cards)
  
  // download data from PouchDB
  useEffect(() => {
    dispatch(loadDataFromPouchDB());
  }, [dispatch]);

  // download from backend
  useEffect(() => {
    const fetchDataAndSaveToPouchDB = async () => {
      try {
        // Отримуємо дані з бекенда
        const data = await dispatch(fetchCards());
  
        // Створення унікального _id (можете використовувати, наприклад, timestamp)
        const uniqueId = new Date().toISOString();
  
        // Логіка для зберігання отриманих даних в PouchDB
        console.log('Put data in PouchDB');
        console.log(data.payload);
        await pouchDB.put({
          _id: uniqueId, // унікальний ідентифікатор
          data: data.payload,
        });
  
        console.log('Дані з бекенда завантажуються в стейт та зберігаються в PouchDB');
        console.log(data);
  
        setIsLoading(false);
      } catch (error) {
        console.error('Помилка завантаження даних та зберігання їх в PouchDB:', error);
        setIsLoading(false);
      }
    };
  
    fetchDataAndSaveToPouchDB();
    
  }, [dispatch, setIsLoading]);

  // Отримати всі документи з локальної бази даних PouchDB
  const getAllDocuments = async () => {
    try {
      const result = await pouchDB.allDocs({ include_docs: true });
      const documents = result.rows.map(row => row.doc);
      console.log('Дані з PouchDB:', documents);
      return documents;
    } catch (error) {
      console.error('Помилка при отриманні документів з PouchDB:', error);
      throw error; // Прокинути помилку, якщо вона є
    }
  };

// Викликати функцію для виводу даних в консоль
getAllDocuments();

  
  const {updateCards} = cardsSlice.actions

  // moving card positions
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

  if (isLoading) return <Loading />

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