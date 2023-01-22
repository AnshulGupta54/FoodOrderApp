import React,{useState} from "react";
import Header from "./components/Layout/Header";
import Meals from "./components/Meals/Meals";
import Cart from "./components/Cart/Cart";
import CartProvider from "./store/CartProvider";
import Login from "./components/Authentication/Login";
function App() {
  const [cartShow,setCartShow]= useState(false);

  const showCartHandler=()=>{
    setCartShow(true);
  }

  const hideCartHandler=()=>{
    setCartShow(false);
  }

  return (
    <CartProvider>
     {cartShow && <Cart onHideCart={hideCartHandler}/>}
      <Header onShowCart={showCartHandler} />
      <main>
        <Meals />

      </main>
      <Login />
    </CartProvider>
  );
}

export default App;
