import { useContext,useEffect,useState } from "react";
import CartContext from "../../store/cart-context";
import CartIcon from "../Cart/CartIcon";
import classes from './HeaderCartButton.module.css';

const HeaderCartButton=props=>{
    const [btnHighlight,setBtnHighlight]=useState(false);

    const CartCtx= useContext(CartContext);

    const {items}=CartCtx;
    
    const numberOfCartItems= items.reduce((curNo,item)=>{
        return curNo +item.amount;
    },0 )

    const btnClasses=`${classes.button} ${btnHighlight? classes.bump :' '}`;

    useEffect(()=>{
        setBtnHighlight(true);

        const timer= setTimeout(()=>{
            setBtnHighlight(false);
        } ,300);

        return()=>{
            clearTimeout(timer);
        };
    },[items]);

    return <button className={btnClasses} onClick={props.onClick}>
    <span className={classes.icon}>
    <CartIcon /> 
    </span>
    <span>Your Cart</span>
    <span className={classes.badge}>{numberOfCartItems}</span>
    </button>
}

export default HeaderCartButton;