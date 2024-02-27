import React, { useContext } from 'react'
import Modal from './UI/Modal'
import CartContext from '../store/CartContext';
import userProgressContext from '../store/UserProgressContext';
import { currencyFormatter } from '../utils/formatting';
import Input from './UI/Input';
import Button from './UI/Button';
import useHttp from '../hooks/useHttp';
import Error from './Error';
const requestedConfig = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
}
const Checkout = () => {
    const userProgressCtx = useContext(userProgressContext)
    const cartCtx = useContext(CartContext);
    const cartTotal = cartCtx.items.reduce((total, item) => total + item.quantity * item.price, 0)
    const { data, error, sendRequest, isLoading: isSending, clearData } = useHttp('http://localhost:3000/orders', requestedConfig, '')
    function handleCloseCheckout() {
        userProgressCtx.hideCheckOut()
    }
    function handleFinishOrder() {
        userProgressCtx.hideCheckOut()
        cartCtx.clearCart();
        clearData();
    }
    function handleSubmit(event) {
        event.preventDefault();
        const fd = new FormData(event.target);
        const customerData = Object.fromEntries(fd.entries());
        sendRequest(JSON.stringify({
            order: {
                items: cartCtx.items,
                customer: customerData
            }
        }))
    }
    let action = <>
        <Button type='button' textOnly onClick={handleCloseCheckout}>Close</Button>
        <Button>Submit Order</Button>
    </>
    if (isSending) {
        action = <span>Sending order data...</span>
    }
    if (data && !error) {
        return <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleFinishOrder}>
            <h2>Success!</h2>
            <p>Your order has been successfully submitted!</p>
            <p>We will get back to you with more details via email within next few minutes.</p>
            <p className='modal-actions'>
                <Button onClick={handleFinishOrder}>Okay</Button>
            </p>
        </Modal>
    }
    return (
        <Modal open={userProgressCtx.progress === 'checkout'} onClose={handleCloseCheckout}>
            <form onSubmit={handleSubmit}>
                <h2>Checkout</h2>
                <p>Total Amount: {currencyFormatter.format(cartTotal)}</p>
                <Input label='Full Name' type='text' id='name' />
                <Input label='E-Mail Address' type='email' id='email' />
                <Input label='Street' type='text' id='street' />
                <div className='control-row'>
                    <Input label='Postal Code' type='text' id='postal-code' />
                    <Input label='City' type='text' id='city' />
                </div>
                {
                    error && <Error title={'Failed to submit order'} message={error} />
                }
                <p className='modal-actions'>
                    {
                        action
                    }
                </p>
            </form>

        </Modal>
    )
}

export default Checkout