import * as React from 'react';
import { selectIsAuth } from '../../redux/slices/auth.js';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { LogInButton, LogOutButton } from '../../Components/LogInButton/Buttons.js'
import Drawer from '@mui/material/Drawer';
import { useSelector } from 'react-redux'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Link from '@mui/material/Link';
import { Link as RouterLink, NavLink } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import MyBreadcrumbs from './MyBreadcrumbs.js';
import styles from './Header.module.css'

export const mainMenu = [
							{
								text:'Всі картки',
								link:'/'
							},
							{
								text:'Створити нову картку',
								link:'addCard'
							},
							{
								text:'Інгерієнти',
								link:'components'
							},
							{
								text:'Про додаток',
								link:'AboutUs'
							},
						];
export const burgerMenu = [...mainMenu];

export const Header = (props) => {

const isAuth = useSelector(selectIsAuth);

	const [state, setState] = React.useState(false);

	const anchor = "left";

	const toggleDrawer = (open) => (event) => {
	if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
		return;
		}
		setState(open);

	};

	const list = (anchor) => {
		return (
	    <Box
	      role="presentation"
	      onClick={toggleDrawer(false)}
	      onKeyDown={toggleDrawer(false)}
	    >
	      <List>
	        {mainMenu.map((item, index) => (
	          <ListItem key={item.text} disablePadding>
	            <ListItemButton>
	            	<Link component={NavLink} to={item.link}>	            		
						<ListItemText primary={item.text} />
	              	</Link>
	            </ListItemButton>
	          </ListItem>
	        ))}
	      </List>
	    </Box>
	  )};

	return ( 
	    
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="fixed" >
				<Toolbar>
					<div>
						<Button onClick={toggleDrawer(true)}>
							<IconButton
								size="large"
								edge="start"
								color="inherit"
								arial-label="menu"
								sx={{ mr: 2 }}
							>
								<MenuIcon
									sx={{color: 'white'}}
								 />
							</IconButton>
						</Button>
						<Drawer
							anchor={anchor}
            				open={state}
            				onClose={toggleDrawer(false)}
						>
					    	{list(anchor)}
						</Drawer>
				    </div>
					
					<Typography 
						variant="h6" 
						component="div"
						sx={{ 
							fontSize: { xs: 14, sm: 20, md: 24, lg: 28 },
							marginRight: '16px'
						}}
					>
						<Link 
							component={NavLink}
							to="/"
							color="inherit"
							className={styles.container}
							sx={{ 	fontSize: { xs: 14, sm: 20, md: 24, lg: 28 },
									textDecoration: 'none', 
										'&:visited': { color: 'inherit' },
										'&:hover': { color: '#3c3c3c'}
								}}
						>			
							Chef assistant
						</Link>
					</Typography>

					<Typography 
						variant="h6" 
						component="div"
						sx={{ flexGrow: 1 }}
					>
						
						<Link 
							component={NavLink}
							to="addCard"
							color="inherit"
							className={styles.container}
							sx={{ 	fontSize: { xs: 14, sm: 20, md: 24, lg: 28 },
									textDecoration: 'none', 
										'&:visited': { color: 'inherit' },
										'&:hover': { color: '#3c3c3c'}
								}}
						>			
							Нова картка
						</Link>
						
					</Typography>

					<Box>
						{isAuth 
							? <LogOutButton />
							: <LogInButton />
						}
					</Box>
				</Toolbar>
			</AppBar>
			<MyBreadcrumbs 
				sx={{ marginTop: 10 }}
				className={styles.breadrumb}
			/>
			<div>
				{isAuth ? <p>Користувач авторизований</p> : <p>Користувач не авторизований</p>}
			</div>
		</Box>
	)
}