import React, { useEffect, useState } from 'react';
import { Ingredient } from './CardItems.js';
import styles from './card.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { fetchRemoveCard, fetchCards } from '../../redux/slices/cards.js';
import { Link, useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom';
import axios from '../../axios.js';
import Loading from '../../Components/Loading/Loading.js';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function MyCard(props) {
  const [currentCard, setCurrentCard] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  console.log(isLoading);
  const { id } = useParams();
  const param = useParams();
  console.log(param)
  console.log(id)
  const cardId = id;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  useEffect( () => {
    axios
      .get(`cards/${id}`)
      .then( (res) => {
        setCurrentCard(res.data);
        setIsLoading(false);
      })
      .catch( (err) => {
        console.warn(err);
        alert('Помилка при отриманні статті')
      });
  }, [id])

  if (isLoading) return <Loading />
  
  console.log(currentCard);
  const items = currentCard.items;
  
  console.log(items);
  console.log(id);
  
  const deleteCard = async () => {
      console.log(id);
      dispatch(fetchRemoveCard(id));
      navigate('/getAll')
    }

  const total = () => {
    const sum = items.reduce( (acc, item) => {
      return acc + item.quantity
    }, 0)
    console.log(sum)
    return sum;
  }

  total();

  return (
    <>
      <Box className={styles.ingredientContainer}>
        <h1 className={styles.header}>{currentCard.title || 'No Title'}</h1>
        <p>{currentCard.text}</p>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 300 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell sx={{ width: 50 }} align="right">Mass, g</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {items.map((item) => {
                return (
                  <Ingredient 
                    name={item.name}
                    amount={item.quantity}
                  />
                )
                })}
              <TableRow>
                <TableCell align="right">Total</TableCell>
                <TableCell align="right">{total()}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        
        
        <p>
          <Button variant="contained"> 
            <Link to={`/addCard/${id}`}>
              Edit card   
            </Link>
            
          </Button>          
          <Button variant="contained" onClick={deleteCard}> 
              Delete card
              <ClearIcon />
          </Button>          
        </p>
        <Box className={styles.ingredientContainer}>
          
          
        </ Box>
      </Box>
      
    </>
  );
}

export default MyCard