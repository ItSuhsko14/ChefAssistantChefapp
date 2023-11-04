import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { loadDataFromPouchDB } from './../redux/slices/cards.js';

function DataLoader({ children }) {
  const dispatch = useDispatch();
  const data = useSelector((state) => state.data); // Отримання даних з Redux-зберігання

  // useEffect(() => {
  //   // Перевірка, чи дані вже завантажені в Redux-зберігання
  //   if (!data) {
  //     // Якщо дані ще не завантажені, то запустити завантаження
  //     dispatch(loadDataFromPouchDB());
  //   }
  // }, [data, dispatch]);

  // useEffect(() => {
  //   console.log("Данні з PouchDB заванатажуємо до стейту")
  //   dispatch(loadDataFromPouchDB());
    
  // }, [dispatch]);

  return <>{children}</>;
}

export default DataLoader;
