import { Header } from '../pages/Header/Header.js';
import { Outlet } from "react-router-dom";


export default function Root() {
  return(
    <>
      <Header />
      <Outlet />
      
    </>
  )
}