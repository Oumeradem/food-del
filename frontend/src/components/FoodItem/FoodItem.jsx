import React, { useContext } from 'react';
import './FoodItem.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const FoodItem = ({ id, name, price, description, image }) => {
  // Access cart state and actions from global store
  const { cartItems, addToCart, removeFromCart, url } = useContext(StoreContext);

  return (
    <div className='food-item'>

      {/* Image with add/remove cart controls overlaid */}
      <div className='food-item-img-container'>
        <img
          className='food-item-image'
          src={`${url}/images/${image}`}
          alt={name}
        />

        {!cartItems[id] ? (
          // Not in cart: show single add button
          <img
            className='add'
            onClick={() => addToCart(id)}
            src={assets.add_icon_white}
            alt='Add to cart'
          />
        ) : (
          // In cart: show quantity counter with increment/decrement
          <div className='food-item-counter'>
            <img
              onClick={() => removeFromCart(id)}
              src={assets.remove_icon_red}
              alt='Remove one'
            />
            <p>{cartItems[id]}</p>
            <img
              onClick={() => addToCart(id)}
              src={assets.add_icon_green}
              alt='Add one'
            />
          </div>
        )}
      </div>

      {/* Food details */}
      <div className='food-item-info'>
        <div className='food-item-name-rating'>
          <p>{name}</p>
          <img src={assets.rating_starts} alt='Rating' />
        </div>
        <p className='food-item-desc'>{description}</p>
        <p className='food-item-price'>${price}</p>
      </div>

    </div>
  );
};

export default FoodItem;