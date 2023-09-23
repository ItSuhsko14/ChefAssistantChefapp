import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import { logout } from '../../redux/slices/auth.js';
import { useDispatch, useSelector } from 'react-redux'
import { selectIsAuth } from '../../redux/slices/auth.js';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import { NavLink } from "react-router-dom";

export const LogInButton = () => {
		return (
		<>	
			<Link 
				component={NavLink}
				to="login"
				color="inherit"
			>
				<Button 
					color="inherit"
					variant="outlined"
					xs={{ mr: 1 }}
					sm={{ mr: 2 }}
					md={{ mr: 5 }}
				>
					<LoginIcon />
				</Button>
			</Link>
			
		</>
		)
	}





export const LogOutButton = () => {

	const isAuth = useSelector(selectIsAuth);
		const onClickLogOut = () => {
			console.log("isAuth");
			console.log(isAuth);
			console.log("click logout");
			dispatch(logout());	
			console.log("isAuth");
			console.log(isAuth);
			window.localStorage.removeItem('token')
			
		}

		const dispatch = useDispatch();
	
		return (
			<Button 
				color="inherit" 
				onClick={onClickLogOut}
				variant="outlined"
			>
				<LogoutIcon />
			</Button>
		)
	}