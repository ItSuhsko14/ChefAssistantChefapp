import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {router} from "../../router/router.js";
import { DynamicCardBreadcrumb } from '../../router/DynamicCardBreadcrumb.js';
import { useSelector } from 'react-redux';
import { useMatches } from "react-router-dom";
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

export default function MyBreadcrumbs() {
  
  const CustomPropsBreadcrumb = ({ someProp }) => <span>{someProp}</span>;

  const { cards } = useSelector(state => state.cards);
  console.log(cards);
  const breadcrumbs = useBreadcrumbs(router.routes, { excludePaths: ["/Card/:id"] });
  let match = useMatches();
  console.log(match);
  console.log(breadcrumbs)

  return (
   
    <>

    
  <Stack spacing={2}>
      <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">  
        {breadcrumbs.map(({ match, breadcrumb }, index) => (
          <>
            <NavLink key={match.pathname} to={match.pathname} >
              
              { breadcrumb.key === '/Card' ? (
                <Link
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="inherit"
                >
                  <DynamicCardBreadcrumb match={match}/> 
                </Link>
              ) : (
                <Link
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="inherit"
                >
                  {breadcrumb}
                </Link>
              )}
              
            </NavLink>
            {index < breadcrumbs.length - 1 && <span></span>}
          </>
        ))}
      </Breadcrumbs>
  </Stack>
    </>

    // <div role="presentation" onClick={handleClick}>
    //   <Breadcrumbs aria-label="breadcrumb">
    //     <Link underline="hover" color="inherit" href="/">
    //       Головна
    //     </Link>
        
    //     <Typography color="text.primary">Хліб</Typography>
    //   </Breadcrumbs>
    // </div>
  );
}

