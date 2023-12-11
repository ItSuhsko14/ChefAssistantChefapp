  import React, { useEffect, useState, useMemo } from 'react';
  import styles from './components.module.css';

  import { useDispatch, useSelector } from 'react-redux';
  import { fetchRemoveCard } from '../../redux/slices/cards.js';
  import { useNavigate } from "react-router-dom";
  import {useParams} from 'react-router-dom';
  import axios from '../../axios.js';
  import Loading from '../../Components/Loading/Loading.js';
  import { cardsSlice } from '../../redux/slices/cards';
  import { fetchCards } from '../../redux/slices/cards.js';
  import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
    Paper,
  } from '@mui/material';

  function Components(props) {
    console.log('COMPONENTs')
    const [isLoading, setIsLoading] = useState(true);
    const dispatch = useDispatch();
    const { cards } = useSelector(state => state.cards);
    console.log(cards.items)
    

    useEffect(() => {
        const fetchData = async () => {
        console.log('Завантажуємо данні з бекенда');
        await dispatch(fetchCards());
        setIsLoading(false);
        };
    
        fetchData();
    }, [])

    const {updateCards} = cardsSlice.actions
    
    const allIngredients = cards.items.reduce((acc, card) => {
        // console.log(card)
        const names = card.items.map( (item) => {
            console.log(item.name)
            return item.name
        })
        return acc.concat(names);
    }, [])

    const ingredientsList = [...new Set(allIngredients)]
    console.log(allIngredients)
    console.log(ingredientsList)
    

    if (isLoading) return <Loading />
    
    return (
      <>
        <Typography variant="h4">Інгідієнти</Typography>
            <TableContainer component={Paper}>
                <Table>
                <TableHead>
                    <TableRow>
                    <TableCell>Інгредієнт</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {ingredientsList.map((item, index) => (
                    <TableRow key={index}>
                        <TableCell>{item}</TableCell>
                    </TableRow>
                    ))}
                </TableBody>
                </Table>
            </TableContainer>
      </>
    );
}
  

  export default Components