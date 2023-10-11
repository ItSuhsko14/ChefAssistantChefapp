import React, { useEffect, useState } from 'react';
import { Ingredient } from './CardItems.js';
import { SliderCount } from './Slider.js';
import styles from './card.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';

import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch } from 'react-redux';
import { fetchRemoveCard, fetchCards } from '../../redux/slices/cards.js';
import { Link, useNavigate } from "react-router-dom";
import {useParams} from 'react-router-dom';
import axios from '../../axios.js';
import Loading from '../../Components/Loading/Loading.js';
// import {Recalculation} from './Recalculation.js'

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
      .get(`cars/${id}`)
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

  return (
    <>
      <div className={styles.wrapper} >
        <Box className={styles.ingredientContainer}>
          <h1 className={styles.header}>{currentCard.title || 'No Title'}</h1>
          <p>{currentCard.text}</p>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 300 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Назва</TableCell>
                  <TableCell sx={{ width: 50 }} align="right">Вага, г</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {items.map((item) => {
                  return (
                    <Ingredient
                      key={item.name} 
                      name={item.name}
                      amount={item.quantity}
                      recalc='cellll'
                      
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
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button> 
                <Link 
                  to={`/addCard/${id}`}
                  className={styles.link}
                >
                  Редагувати
                </Link>
              </Button>          

              <Button onClick={deleteCard}> 
                  Видалити
                  <ClearIcon />
              </Button>
            </ButtonGroup>          
          </p>
          
        </Box>
        <SliderCount />
      </div>
    </>
  );
}

export default MyCard