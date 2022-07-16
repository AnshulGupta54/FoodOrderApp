import { useRef,useState } from 'react';
import classes from './Checkout.module.css';

const isEmpty=value=>value.trim()==='';
const isSixChars=value=>value.length===6;

const Checkout = (props) => {
    const nameInputRef= useRef();
    const streetInputRef=useRef();
    const postalCodeInputRef=useRef();
    const cityInputRef=useRef();

    const [formInputValidity,setFormInputValidity]= useState({
        name:true,
        street:true,
        postalCode:true,
        city:true
    });

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName=nameInputRef.current.value;
    const enteredStreet=streetInputRef.current.value;
    const enteredPostalCode=postalCodeInputRef.current.value;
    const enteredCity=cityInputRef.current.value;

    const nameIsValid=!isEmpty(enteredName);
    const streetIsValid=!isEmpty(enteredStreet);
    const postalCodeIsValid=isSixChars(enteredPostalCode);
    const cityIsValid=!isEmpty(enteredCity);

    setFormInputValidity({
        name:nameIsValid,
        street:streetIsValid,
        postalCode:postalCodeIsValid,
        city:cityIsValid
    });

    const formIsValid= nameIsValid && streetIsValid && postalCodeIsValid && cityIsValid;

    if(!formIsValid){
        return;
    }

    props.onConfirm({
      name: enteredName,
      street: enteredStreet,
      postalCode: enteredPostalCode,
      city: enteredCity
    });
  };

  const nameControlClasses=`${classes.control} ${formInputValidity.name ? '': classes.invalid}`;
  const streetControlClasses=`${classes.control} ${formInputValidity.street ? '': classes.invalid}`;
  const postalcodeControlClasses=`${classes.control} ${formInputValidity.postalCode ? '': classes.invalid}`;
  const cityControlClasses=`${classes.control} ${formInputValidity.city ? '': classes.invalid}`;


  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={nameControlClasses}>
        <label htmlFor='name'>Your Name</label>
        <input type='text' id='name' ref={nameInputRef} />
        {!formInputValidity.name && <p>Enter correct Name</p>}
      </div>
      <div className={streetControlClasses}>
        <label htmlFor='street'>Street</label>
        <input type='text' id='street' ref={streetInputRef} />
        {!formInputValidity.street && <p>Enter correct street</p>}
      </div>
      <div className={postalcodeControlClasses}>
        <label htmlFor='postal'>Postal Code</label>
        <input type='text' id='postal' ref={postalCodeInputRef} />
        {!formInputValidity.postalCode && <p>Enter correct postalCode</p>}
      </div>
      <div className={cityControlClasses}>
        <label htmlFor='city'>City</label>
        <input type='text' id='city' ref={cityInputRef} />
        {!formInputValidity.city && <p>Enter correct city</p>}
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;