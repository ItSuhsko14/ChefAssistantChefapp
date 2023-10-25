import * as React from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { NavLink } from "react-router-dom";
import useBreadcrumbs from "use-react-router-breadcrumbs";
import {router} from "../../router/router.js";
import { DynamicCardBreadcrumb } from '../../router/DynamicCardBreadcrumb.js';
import { useSelector } from 'react-redux';
import { useMatches } from "react-router-dom";
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import styles from './Header.module.css'

export default function MyBreadcrumbs() {
  
  const CustomPropsBreadcrumb = ({ someProp }) => <span>{someProp}</span>;

  const { cards } = useSelector(state => state.cards);
  console.log(cards);
  const breadcrumbs = useBreadcrumbs(router.routes, { excludePaths: ["/Card/:id"] });
  let match = useMatches();
  console.log(match);
  console.log(breadcrumbs)

  const customBreadcrumb = {
    '/addCard/:id': 'Редагування картки',
    '/Card': 'Картка'
  }

  return (
   
  <>
    <Stack spacing={2}>
        <Breadcrumbs 
          separator={<NavigateNextIcon fontSize="small" />} 
          aria-label="breadcrumb"
          className={styles.breadcrumb}
        >  
          {breadcrumbs.map(({ match, breadcrumb }, index) => (

            <div key={match.pathname}>
              <NavLink key={match.pathname} to={match.pathname} >
                
                <Link
                  underline="hover"
                  sx={{ display: 'flex', alignItems: 'center' }}
                  color="inherit"
                >
                  {match.pathname === "/addCard/:id111" || match.pathname === "/Card" ? (
                    <>
                      <DynamicCardBreadcrumb match={match} />
                    </>
                  ) : (
                    breadcrumb
                  )}
                </Link>

              </NavLink>
              {index < breadcrumbs.length - 1 && <span></span>}
            </div>
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