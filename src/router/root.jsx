import { Header } from '../pages/Header/Header.js';
import { Outlet } from 'react-router-dom';
import { Footer } from '../pages/Footer/Footer.js'


export default function Root() {
  return(
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  )
}