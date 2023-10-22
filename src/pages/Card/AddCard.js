import React, { useState, useEffect } from 'react';
import { IngredientInput, AddIngredient, SaveButton } from './CardItems.js';
import styles from './card.module.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useForm, useFieldArray, Controller } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import axios from '../../axios.js';
import { useParams, useNavigate } from 'react-router-dom';
import { fetchCards } from '../../redux/slices/cards.js';
import Loading from '../../Components/Loading/Loading.js';

function AddCard(props) {
  const { id } = useParams();
  const isEditing = Boolean(id);
  const { cards } = useSelector(state => state.cards);
  console.log(cards)
  const isCardsLoaded = cards.status === 'loaded';
  
  // задаю змінну для контролю стану зберігання
  const [isSaving, setIsSaving] = useState(false); 

  const dispatch = useDispatch(); 
  const navigate = useNavigate();
  
  // Register react-hook-form
  const { register, control, handleSubmit, setValue, getValues,
          formState: { errors, isValid }
  } = useForm({
    defaultValues: {
    cardName: 'card name',
    cardText: 'card text',
    items: []
  },
    mode: 'onChange'
  })

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  })
  
    let currentCard = {};

    useEffect( () => {
      if (isEditing) {
      console.log(cards);
      currentCard = cards.items.filter( (item) => item._id == id)[0];
      setValue('cardName', currentCard.title);
      setValue('cardText', currentCard.text);
      setValue('items', currentCard.items)
      console.log(currentCard)
    }
  }, [])
    
  const onChange = (e) => {
      console.log(currentCard)
      setValue('cardName', currentCard.title);
      let titleValue = getValues('cardName')
      console.log(titleValue)
      console.log('titleValue')
    }

  // handle Submit and send data to server
  const onSubmit = async (values) => {
    console.log(values);
    setIsSaving(true);
    const params = {
      title: values.cardName,
      text: values.cardText,
      items: values.items,
        }
    console.log(params);
    console.log(id)
    console.log(isEditing)

    try {
      const { data } = isEditing 
        ? await axios.patch(`/cards/${id}`, params)
        : await axios.post('/cards', params);

      if (!isEditing) {
          dispatch(fetchCards());
        }

      console.log(data);
      
      const navigatePath = isEditing 
        ? `/card/${id}`
        : `/card/${data._id}`;
      console.log(navigatePath);
      navigate(navigatePath);
    } catch (err) {
      console.log("Add card: card dont create");
      console.warn(err)
    }
  }

  if (isSaving) return <Loading />

  return (
    <>
      <Box className={styles.container}>
        <form onSubmit={handleSubmit(onSubmit)}>  
          <Box className={styles.ingredientContainer}>
            <div className={styles.header}>
              <TextField 
                onClick={onChange}
                className={styles.cardNameInput} 
                label="Card name" 
                variant="outlined" 
                error={Boolean(errors.cardName?.message)}
                helperText={errors.cardName?.message}
                {...register("cardName", { required: ""})}
              />
            </div>
            <div className={styles.header}>
              <TextField 
                className={styles.cardNameInput} 
                label="Card text" 
                variant="outlined" 
                error={Boolean(errors.cardText?.message)}
                helperText={errors.cardText?.message}
                {...register("cardText", { required: ""})}
                sx={{
                  margin: 0, // Позбавити від відступів
                }}
              />
            </div>
            <div>
                {fields.map((item, index) => (
                  <div key={item.id}>
                    <IngredientInput 
                      register={register}
                      removeItem={ () => {remove(index)}}
                      index={index}
                    />
                  </div>
                ))}
              <AddIngredient 
                click={() => append({ name: "", quantity: "" })}
              />
              <SaveButton variant="contained" type="submit" onClick={onSubmit}/> 
            </div>
          </ Box>
        </form>
      </Box>
    </>
  );
}

export default AddCard