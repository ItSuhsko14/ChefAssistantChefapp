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
import { Outlet, Link as RouterLink, NavLink } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
import MyBreadcrumbs from './MyBreadcrumbs.js';

export const mainMenu = [
							{
								text:'All cards',
								link:'/'
							},
							{
								text:'Create new card',
								link:'addCard'
							},
						];
export const burgerMenu = [...mainMenu];

export const Header = (props) => {

const isAuth = useSelector(selectIsAuth);

	const [state, setState] = React.useState(false);
	console.log("state");
	console.log(state);

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
			<AppBar position="sticky" >
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
						sx={{ flexGrow: 1 }}
					>
						Chef assistant
					</Typography>

					<Typography 
						variant="h6" 
						component="div"
						sx={{ flexGrow: 1 }}
					>
						<AddIcon />
					</Typography>

					<Box>
						{isAuth 
							? <LogOutButton />
							: <LogInButton />
						}
					</Box>
				</Toolbar>
			</AppBar>
			<MyBreadcrumbs />
		</Box>
	)
}