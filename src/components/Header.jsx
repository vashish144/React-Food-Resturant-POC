import React, { useContext } from 'react'
import logoImg from '../assets/logo.jpg'
import Button from './UI/Button'
import CartContext from '../store/CartContext'
import userProgressContext from '../store/UserProgressContext'
const Header = () => {
    const cartCtx = useContext(CartContext)
    const userProgressCtx = useContext(userProgressContext)
    const totalCartItems = cartCtx.items.reduce((totalNoOfItem, item) => totalNoOfItem + item.quantity, 0)
    function handleShowCart() {
        userProgressCtx.showCart();
    }
    return (
        <header id="main-header">
            <div id="title">
                <img src={logoImg} alt='Restaurant Logo' />
                <h1>React Food Restaurant</h1>
            </div>
            <nav>
                <Button textOnly onClick={handleShowCart}>Cart ({totalCartItems})</Button>
            </nav>
        </header>
    )
}

export default Header