import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import ClearIcon from '@mui/icons-material/Clear';
import SaveIcon from '@mui/icons-material/Save';
import styles from './card.module.css';
import Grid from '@mui/material/Unstable_Grid2';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';

export const Ingredient = (props) => {
	return (
		<>
			
			<TableRow
				key={props.name}
				sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
				<TableCell component="th" scope="row">
					{props.name}
				</TableCell>
				<TableCell align="right">
					{props.amount}
				</TableCell>
            </TableRow>
		</>
		)
}


export const IngredientInput = (props) => {
	const register = props.register;
	const removeItem = props.removeItem;
	return (
		<>
			<Grid container key={props.index} spacing={1} className={styles.ingredient} >
                <Grid xs={6}>
            		<TextField {...register(`items.${props.index}.name`)}  variant="outlined" type="text" />
                </Grid>
                <Grid xs={3}>
                	<TextField {...register(`items.${props.index}.quantity`)} variant="outlined" type="number" />
                </Grid>
                <Grid item xs={3}> 
                    <div className={styles.buttonContainer}>
                    	<Button onClick={props.removeItem} variant="contained">
                        	<ClearIcon />
                    	</Button>
                    </div>
                </Grid>
            </Grid>
		</>
		)
}

export const AddIngredient = (props) => {
	return (
		<>
			<Container className={styles.addIngredient}>
			    
					<Button 
			          variant="contained"
			          sx={{mr:0}}
			          className={styles.fullWidth}
			          onClick={props.click}
					  type="button"
			        >
			          <AddIcon />
			        </Button>
			    
		    </Container>
		</>
	)
}

export const SaveButton = (props) => {
	return (
		<>
			<Container className={styles.addIngredient}>
			    
					<Button 
			          variant="contained"
			          sx={{mr:0}}
			          className={styles.fullWidth}
			          onClick={props.click}
					  type="submit"
			        >
			          Save <SaveIcon />
			        </Button>
			    
		    </Container>
		</>
	)
}


export const Amount = (props) => {
	return (
		<>
			<div
				style={{margin:'10px'}}
			>
				{props.amount}
			</div>			
		</>
		)
}