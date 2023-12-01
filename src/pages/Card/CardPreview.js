import React from 'react';
import { Ingredient } from './CardItems.js';
import { SliderCount } from './Slider.js';
import styles from './card.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import TextField from '@mui/material/TextField';

import ClearIcon from '@mui/icons-material/Clear';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRemoveCard, fetchCards } from '../../redux/slices/cards.js';
import { Link, useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const CardPreview = (
                      {
                        currentCard,
                        totalValue,  
                        openConfirmDialog,
                        id
                      }
                    ) => {

console.log(currentCard);

return (
    <>
      <div className={styles.wrapper} >
        <div className={styles.ingredientContainer} >
        <Box >
          <h1 className={styles.header}>{currentCard?.title}</h1>
          <p>{currentCard.text}</p>
          <TableContainer component={Paper}>
            <Table sx={{ }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Назва</TableCell>
                  <TableCell sx={{  }} align="right">Вага, г</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {currentCard.items.map((item) => {
                  return (
                    <Ingredient
                      key={item.name} 
                      name={item.name}
                      amount={item.quantity}
                    />
                  )
                  })}
                <TableRow>
                  <TableCell align="right">Всього</TableCell>
                  <TableCell align="right">{totalValue}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
          
          
          <div>
            <ButtonGroup variant="contained" aria-label="outlined primary button group">
              <Button> 
                <Link 
                  to={`/addCard/${id}`}
                  className={styles.link}
                >
                  Редагувати
                </Link> 
              </Button>          

              <Button onClick={openConfirmDialog}> 
                  Видалити
                  <ClearIcon />
              </Button>
            </ButtonGroup>          
          
          </div>
        </Box>
        </div>  
        <div className={styles.sliderContainer} >
          <SliderCount />
        </div>
      </div>
      
    </>
  );
}

export default CardPreview