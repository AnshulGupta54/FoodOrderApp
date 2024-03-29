import React from "react";
import classes from './Header.module.css';
import HeaderCartButton from "./HeaderCartButton";

import mealsImage from '../../assests/meals.jpg';

const Header=props=>{
    const name=localStorage.getItem("Name");

    return <React.Fragment>
    <header className={classes.header}>
    <h1>Hello {name}</h1>
    <HeaderCartButton onClick={props.onShowCart} />
    </header>
    <div className={classes['main-image']}>
    <img src={mealsImage} alt='A table full of delicious food' />
    </div>
    </React.Fragment>
};

export default Header;