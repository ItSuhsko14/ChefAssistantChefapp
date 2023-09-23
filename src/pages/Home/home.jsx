import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchCards } from '../../redux/slices/cards.js';
import { Outlet, Link } from "react-router-dom";

import Button from '@mui/material/Button';


export const Home = () => {
	const dispatch = useDispatch();
	const { cards } = useSelector( state => state.cards );

	
	React.useEffect( () => {
		dispatch(fetchCards())
	}, []);

	console.log(cards);

	  return (
 		<>
	 		<h1>Welcome in Cheff assistant.</h1>
	 		<p>See all cards 
	 			<Button variant="contained">
	 				<Link to="/getAll">
	 					all cards
	 				</Link>
	 			</Button>
	 		</p>
	 		<p>Create new card 
	 			<Button variant="contained">
	 				<Link to="/addCard">
	 					new card
	 				</Link>
	 			</Button>
	 		</p>
	 		ul>li*3>span
		</>    	
  		);
}