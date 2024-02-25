import React, { useContext } from 'react'
import { currencyFormatter } from '../utils/formatting'
import Button from './UI/Button'
import CartContext from '../store/CartContext'

const MealItem = ({ meal }) => {
  const cartCtx=useContext(CartContext);
  function handleMealToCart(){
    cartCtx.addItem(meal)
  }
  return (
    <li className='meal-item'>
      <article>
        <img src={`http://localhost:3000/${meal.image}`} alt={meal.name} />
        <div >
          <h3>{meal.name}</h3>
          <p className='meal-team-price'>{currencyFormatter.format(meal.price)}</p>
          <p className='meal-team-description'>{meal.description}</p>
        </div>
        <p className='meal-item-action'>
          <Button onClick={handleMealToCart}>Add to Cart</Button>
        </p>
      </article>
    </li>
  )
}

export default MealItem