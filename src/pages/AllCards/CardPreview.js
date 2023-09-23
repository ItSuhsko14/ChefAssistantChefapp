import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import axios from '../../axios.js';
import { useDispatch } from 'react-redux';
import { fetchRemoveCard } from '../../redux/slices/cards.js';
import { Link as RouterLink } from "react-router-dom";

export const CardPreview = (props) => {
    
    const dispatch = useDispatch();
    const cardId = props.cardId;
    
    const deleteCard = async () => {
    dispatch(fetchRemoveCard(cardId));
    console.log(props.cardId)
    }

return (
    <>
        <Card>  
            <CardContent> 
                <Typography variant="h5">
                    {props.name}
                </Typography>
                <Typography variant="h6">
                    {props.text}
                </Typography>
            </CardContent>
            <CardActions> 
                <Link component={RouterLink} to={`/Card/${props.link}`} >
                    Відкрити картку
                </Link>
                <Button onClick={deleteCard}>
                    <DeleteIcon />
                </Button>
            </CardActions>
        </Card> 
    </>    
    )}