import PouchDB from 'pouchdb';

export const pouchDB = new PouchDB('pouchlocaldb');

export const saveStateToPouchDB = (store) => (next) => (action) => {
  
  const result = next(action); // Пропустити дію далі по ланцюгу

  // Зберегти оновлений стан в PouchDB
  const pouchState = store.getState();
  console.log(pouchState);
  console.log(pouchState.cards.cards.items);
  pouchDB.get('pouchstate').then(function (doc) {
    // Отримати поточну ревізію документа
    var currentRev = doc._rev;
  
    // Перевірте, чи поточна ревізія співпадає з поточною ревізією в стані
  if (currentRev === pouchState._rev) {
    // Оновити дані
    doc.data = pouchState.cards.cards.items;
    
    // Встановіть нову ревізію
    doc._rev = currentRev;
    
    // Збережіть оновлений документ з вказаною ревізією
      return pouchDB.put(doc);
    } else {
      // Якщо поточна ревізія не співпадає, оновлення конфліктуюче
      console.log('Конфлікт оновлення документа. Ревізія не співпадає.');
    }
  
  }).then(function (response) {
    console.log('Стан збережено в PouchDB:', response);
  }).catch(function (error) {
    // Якщо документ не існує, створіть його
    if (error.status === 404) {
      return pouchDB.put({
        _id: 'pouchstate',
        data: store.getState().cards.cards.items
      });
    } else {
      console.error('Помилка при збереженні стану в PouchDB:', error);
    }
  });

  return result;
};

export default saveStateToPouchDB;
