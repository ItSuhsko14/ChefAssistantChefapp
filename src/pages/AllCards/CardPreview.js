import React, {useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import ConfirmDialog from './../../Components/ConfirmDialogs/ConfirmDialog'
import axios from '../../axios.js';
import { useDispatch } from 'react-redux';
import { fetchRemoveCard } from '../../redux/slices/cards.js';
import { Link as RouterLink } from "react-router-dom";
import styles from './allCards.css';    

import LaunchIcon from '@mui/icons-material/Launch';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export const CardPreview = (props) => {

    const [isConfirmDialogOpen, setConfirmDialogOpen] = useState(false);

    const dispatch = useDispatch();
    const cardId = props.cardId;
    
    const openConfirmDialog = () => {
        setConfirmDialogOpen(true);
    };

    const deleteCard = async () => {
        setConfirmDialogOpen(false);
        dispatch(fetchRemoveCard(cardId));
        
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
                    sx={{
                        
                        color: "inherit", // Звичайний колір
                        "&:hover": {
                          color: "red" // Колір при наведенні мишки
                        },
                        "&:active": {
                          color: "green" // Колір при натисканні
                        },
                        "&:visited": {
                          color: "inherit" // Колір відвіданого посилання
                        },
                        textDecoration: "none"
                      }}
                >
                    <Typography 
                        variant="h5"
                        sx={{ fontSize: { xs: "1.2rem", sm: "1.4rem", md: "2rem" } }}
                    >
                        {props.name}
                    </Typography>
                </Link>
            </CardContent>
            <CardActions
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    width: "80%",
                    
                }}
            > 
                <Link component={RouterLink} to={`/Card/${props.link}`} >
                    <LaunchIcon />
                </Link>
                <Link component={RouterLink} to={`/addCard/${props.cardId}`} >
                    <EditIcon />
                </Link>
                <Link onClick={openConfirmDialog}>
                    <DeleteIcon />
                </Link>
            </CardActions>
        </Card> 

        <ConfirmDialog
            open={isConfirmDialogOpen}
            onClose={() => setConfirmDialogOpen(false)}
            onConfirm={deleteCard}
        />
    </>    
    )}