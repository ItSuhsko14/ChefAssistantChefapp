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
import styles from './allCards.css'

export const CardPreview = (props) => {
    
    const dispatch = useDispatch();
    const cardId = props.cardId;
    
    const deleteCard = async () => {
    dispatch(fetchRemoveCard(cardId));
    console.log(props.cardId)
    }

return (
    <>
        <Card
            sx={{ 
                padding: "3px",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
            }}
        >  
            <CardContent> 
                <Link 
                    component={RouterLink} 
                    to={`/Card/${props.link}`} 

                >
                    <Typography 
                        variant="h5"
                        sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem", md: "2rem" } }}
                    >
                        {props.name}
                    </Typography>
                </Link>
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