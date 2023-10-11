
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

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
    
  };