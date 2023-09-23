import React, { useState } from 'react';
import { IngredientInput, AddIngredient } from './CardItems.js';
import styles from './card.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import SaveIcon from '@mui/icons-material/Save';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useSelector, useDispatch } from 'react-redux';
import axios from '../../axios.js';
import {useParams} from 'react-router-dom';

function EditCard(props) {
    const { id } = useParams();
    const { cards } = useSelector(state => state.cards);
    
    const myCard = cards.items.find( item => item._id === id );
    const cardTitle = myCard.title;
    const [listItems, setListItems] = useState(myCard.items);
  
  function addNewField() {
    setListItems([...listItems, ''])
    console.log('function addNewField run');
    console.log(listItems);
  }

  function removeItem(id) {
    setListItems(listItems.filter( (index) => {
      return index._id !== id
    }))
    console.log('function removeItem');
    console.log(listItems);
  }

  const dispatch = useDispatch(); 
  
  // react-hook-form
  const { register, 
          handleSubmit,
          setError, 
          formState: { errors, isValid }
  } = useForm({
    defaultValues: {
      cardName: 'input name',
      cardText: 'input description',
      items: []
    },
    mode: 'onChange'
  })

  
  const onSubmit = async (values) => {
    console.log(values);
    const params = {
      title: values.cardName,
      text: values.cardText,
      items: [],
      }
      let itemKeys = Object.keys(values).slice(2);
      for (let i=0; i<itemKeys.length; i=i+2) {
        console.log(values[itemKeys[i]]);
        params.items.push({name: values[itemKeys[i]], quantity: values[itemKeys[i+1]]});
      }
    
    try {
      const data = await axios.post('/cards', params)
      console.log(data);
    } catch (err) {
      console.log("card dont create");
      console.warn(err)
    } 
  }

  return (
    <>
      <Box className={styles.container}>
        
      <form onSubmit={handleSubmit(onSubmit)}>  
        <Box className={styles.ingredientContainer}>
          <h1 className={styles.header}>
            <TextField 
              value={myCard.title}
              className={styles.cardNameInput} 
              label="card name" 
              variant="outlined" 
              error={Boolean(errors.cardName?.message)}
              helperText={errors.cardName?.message}
              {...register("cardName", { required: ""})}
            />
          </h1>
          <p>
            <TextField 
              className={styles.cardNameInput} 
              value={myCard.text}
              label={"Card text"} 
              variant="outlined" 
              error={Boolean(errors.cardText?.message)}
              helperText={errors.cardText?.message}
              {...register("cardText", { required: "sdfgseg"})}
            />
          </p>
          <>          
            {listItems.map((item, index) => {
              return(
                <IngredientInput index={index} item={item} register={register} removeItem={removeItem}/>
              )
            })}
          </>

          <AddIngredient click={addNewField} />
            
        </ Box>

          <Button variant="contained" type="submit"> 
            Save
            <SaveIcon />
          </Button>          
        
      </form>

      </Box>
      
    </>
  );
}

export default EditCard