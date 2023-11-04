import React from 'react';
import styles from './footer.module.css'
import { Link } from 'react-router-dom'

export const Footer = () => {
  return (
    <footer>
        <div className={styles.footerContainer}>
            Developed by &nbsp;<a href='http://mustdev.pp.ua' target="_blank">Mustache development </a>
        </div>
    </footer>
  );
};

