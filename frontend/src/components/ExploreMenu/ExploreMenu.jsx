import React from 'react';
import './ExploreMenu.css';
import { menu_list } from '../../assets/assets';

const ExploreMenu = ({ category, setCategory }) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore our menu</h1>
      <p className='explore-menu-text'>
        Choose from a diverse menu featuring a delectable array of dishes crafted
        with the finest ingredients and culinary expertise. Our mission is to
        satisfy your cravings and elevate your dining experience, one delicious
        meal at a time.
      </p>

      {/* Category filter list */}
      <div className='explore-menu-list'>
        {menu_list.map((item, index) => {
          // Toggle category: clicking the active item resets filter to "All"
          const isActive = category === item.menu_name;

          return (
            <div
              key={index}
              onClick={() => setCategory(isActive ? 'All' : item.menu_name)}
              className='explore-menu-list-item'
            >
              <img
                className={isActive ? 'active' : ''}
                src={item.menu_image}
                alt={item.menu_name}
              />
              <p>{item.menu_name}</p>
            </div>
          );
        })}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;