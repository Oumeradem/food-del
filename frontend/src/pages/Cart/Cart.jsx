import React, { useContext } from 'react';
import './Cart.css';
import { StoreContext } from '../../context/StoreContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, food_list, removeFromCart, getTotalCartAmount, url } = useContext(StoreContext);
  const navigate = useNavigate();

  const deliveryFee = 2;
  const subtotal = getTotalCartAmount();
  const total = subtotal === 0 ? 0 : subtotal + deliveryFee;

  return (
    <div className='cart'>

      {/* Cart item list */}
      <div className='cart-items'>
        <div className='cart-items-title'>
          <p>Items</p>
          <p>Name</p> {/* was "Title" — field is item.name */}
          <p>Price</p>
          <p>Quantity</p>
          <p>Total</p>
          <p>Remove</p>
        </div>
        <br />
        <hr />

        {food_list
          .filter(item => cartItems[item._id] > 0)
          .map((item, index) => (
            <div key={index}>
              <div className='cart-items-title cart-items-item'>
                <img src={`${url}/images/${item.image}`} alt={item.name} />
                <p>{item.name}</p>
                <p>${item.price}</p>
                <p>{cartItems[item._id]}</p>
                <p>${item.price * cartItems[item._id]}</p>
                <p onClick={() => removeFromCart(item._id)} className='cross'>x</p>
              </div>
              <hr />
            </div>
          ))}
      </div>

      <div className='cart-bottom'>

        {/* Order summary with subtotal, delivery fee, and total */}
        <div className='cart-total'>
          <h2>Cart Total</h2>
          <div>
            <div className='cart-total-details'>
              <p>Subtotal</p>
              <p>${subtotal}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <p>Delivery Fee</p>
              <p>${subtotal === 0 ? 0 : deliveryFee}</p>
            </div>
            <hr />
            <div className='cart-total-details'>
              <b>Total</b>
              <b>${total}</b>
            </div>
          </div>
          <button onClick={() => navigate('/order')}>PROCEED TO CHECKOUT</button>
        </div>

        {/* Optional promo code entry */}
        <div className='cart-promocode'>
          <div>
            <p>If you have a promo code, enter it here</p>
            <div className='cart-promocode-input'>
              <input type='text' placeholder='Promo code' />
              <button>Submit</button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Cart;