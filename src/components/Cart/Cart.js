import { Fragment, useContext,useState } from 'react';

import classes from './Cart.module.css';
import Modal from '../UI/Modal';
import CartContext from '../../store/cart-context';
import CartItem from './CartItem';
import Checkout from './Checkout';

const Cart=props=>{
    const cartCtx= useContext(CartContext);
    const[isCheckout,setIsCheckout]= useState(false);
    const [isSubmitting,setIsSubmitting]=useState(false);
    const [didSubmit,setDidSubmit]=useState(false);


    const totalAmount=`$${cartCtx.totalAmount.toFixed(2)}`;
    const hasItems=cartCtx.items.length >0;

    const cartItemRemoveHandler=id=>{
        cartCtx.removeItem(id);
    };
    const cartItemAddHandler=item=>{
        cartCtx.addItem(item);
    };

    const orderHandler=()=>{
        setIsCheckout(true);
    }

    const submitHandler=async (userData)=>{
        setIsSubmitting(true);
        await fetch('https://food-order-60d4e-default-rtdb.firebaseio.com/orders.json',{
            method: 'POST',
            body : JSON.stringify({
                user: userData,
                orderedItems: cartCtx.items
            })
        });
        setIsSubmitting(false);
        setDidSubmit(true);
        cartCtx.clearCart();
    };

    const cartItems=( <ul className={classes['cart-items']}>{cartCtx.items.map((item)=>(
    <CartItem 
    key={item.id} 
    name={item.name} 
    price={item.price} 
    amount={item.amount} 
    onRemove={cartItemRemoveHandler.bind(null,item.id)} 
    onAdd={cartItemAddHandler.bind(null,item)} />
     ))}
    </ul>
    );

    const modalActions=(
        <div className={classes.actions}>
        <button className={classes['button--alt']} onClick={props.onHideCart} >Close</button>
       {hasItems && <button className={classes.button} onClick={orderHandler} >Order</button>}
        </div>
    );

    const cartModalContent=(<Fragment>
        {cartItems}


        <div className={classes.total}>
            <span>Total Amount</span>
            <span>{totalAmount} </span>
        </div>
        { isCheckout && <Checkout onCancel={props.onHideCart} onConfirm={submitHandler} />}
        {!isCheckout && modalActions}
        </Fragment>
    );

    const didSubmitModalContent=<Fragment>
        <p>Successfully sent the order</p>
        <div className={classes.actions}>
        <button className={classes.button} onClick={props.onHideCart} >Close</button>
        </div>
    </Fragment>

    return <Modal onHideCart={props.onHideCart}>
        {!isSubmitting && !didSubmit && cartModalContent}
        {isSubmitting && <p>Sending order data</p>}
        {!isSubmitting && didSubmit && didSubmitModalContent }

    </Modal>
}

export default Cart;