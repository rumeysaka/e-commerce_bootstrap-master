import React, { useContext } from 'react'
import { Button, Card } from 'react-bootstrap'
import CartItem from './CartItem'
import { LoginContext } from '../../LoginContext'

export default function Cart({
    cart,
    UpdateCartQty,
    RemoveFromCart,
    EmptyCart,
}) {
    
  const { user, setUser } = useContext(LoginContext)
    
    const handleEmptyCart = () => {
        EmptyCart()
    }

    function emptyCartMessage() {
        return (
            <>
                <div>No item in your cart</div>
                <a style={{ color: 'black' }} href="/">
                    Wanna add some?
                </a>
            </>
        )
    }
    function noUserMessage() {
        return (
            <>
                <div>Login to add to cart</div>
                <a style={{ color: 'black' }} href="/sign">
                    Login Here?
                </a>
            </>
        )
    }
    const returnCart = () => {
        return (
            <>
                {cart.line_items.map((item) => (
                    <div
                        key={item.id}
                        style={{ marginLeft: '20px', marginBottom: '10px' }}>
                        <div>
                            {item.quantity} {item.name}
                        </div>
                    </div>
                ))}
            </>
        )
    }

    if (!cart.line_items) {
        return 'loading'
    }

    return (
        <div className="container my-4">
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                <div className="container my-5">
                    <h2>
                        Your Cart
                        <Button
                            variant="light"
                            className="btn btn-lg "
                            style={{ float: 'right' }}
                            onClick={handleEmptyCart}>
                            Clear All
                        </Button>
                    </h2>

                                {!user && (noUserMessage())}
                    {cart.line_items.length && user &&(
                        <>
                            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                                {cart.line_items.map((product) => (
                                    <CartItem
                                        key={product.id}
                                        onUpdateCartQty={UpdateCartQty}
                                        onRemoveFromCart={RemoveFromCart}
                                        onEmptyCart={EmptyCart}
                                        product={product}
                                    />
                                ))}
                                {!cart.line_items.length && (emptyCartMessage())}
                            </div>
                            <Card style={{ width: '18rem', float: 'right' }}>
                                <Card.Body
                                    className="d-flex justify-content-center align-items-center"
                                    style={{ padding: '20px' }}>
                                    <Card.Text>
                                        <h5>Total Items: {cart.total_items} </h5>
                                            {returnCart()}
                                        <h5>Unique Items: {cart.total_unique_items} </h5>
                                                                                        
                                        <h5>Subtotal:</h5>
                                            {cart.subtotal.formatted_with_symbol}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Link href="/checkout" className='d-flex justify-content-center'>
                                    <Button variant="light">
                                        <h5>Checkout</h5>
                                    </Button>
                                </Card.Link>
                            </Card>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
}
