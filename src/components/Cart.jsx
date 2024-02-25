import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext'
import { currencyFormatter } from '../utils/formatting'
import Button from './UI/Button'
import userProgressContext from '../store/UserProgressContext'

const Cart = () => {
  const cartCtx = useContext(CartContext)
  const userProgressCtx = useContext(userProgressContext)
  const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0)
  function handleCloseCart() {
    userProgressCtx.hideCart()
  }
  return (
    <Modal className='cart' open={userProgressCtx.progress === 'cart'}>
      <h2>Your Cart</h2>
      <ul>
        {
          cartCtx.items.map(item => {
            return <li key={item.id}>{item.name} - {item.quantity}</li>

          })
        }
      </ul>
      <p className='cart-total'>{currencyFormatter.format(cartTotal)}</p>
      <p className='modal-actions'>
        <Button onClick={handleCloseCart} textOnly>Close</Button>
        <Button onClick={handleCloseCart} >Go to CheckOut</Button>
      </p>
    </Modal>
  )
}

export default Cart