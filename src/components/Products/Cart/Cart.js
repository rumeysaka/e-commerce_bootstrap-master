import React, { useState, useEffect } from 'react'
import { Button, Card } from 'react-bootstrap'
import CartItem from './CartItem'

export default function Cart({
  cart,
  onUpdateCartQty,
  onRemoveFromCart,
  onEmptyCart,
}) {
  const handleEmptyCart = () => {
    onEmptyCart()
  }

  function emptyCartMessage(){
    return(<>
      <div>No item in your cart</div>
      <a style={{color:"black"}} href="/">Wanna add some?</a>
</>
    )
  }
  const returnItemInCart = () => {
    return (
      <>
        {cart.line_items.map((item) => (
          <div
            key={item.id}
            style={{ marginLeft: '20px', marginBottom: '10px' }}
          >
            <div>
              {item.quantity} {item.name}
            </div>
          </div>
        ))}
      </>
    )
  }

  if (!cart.line_items) { return "loading" }
  
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
              onClick={handleEmptyCart}
            >
              Clear All
            </Button>
          </h2>
          {!cart.line_items.length ? (
          emptyCartMessage()
          ) : (
            <>
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {cart.line_items.map((product) => (
                  <CartItem
                    key={product.id}
                    onUpdateCartQty={onUpdateCartQty}
                    onRemoveFromCart={onRemoveFromCart}
                    onEmptyCart={onEmptyCart}
                    product={product}
                  />
                ))}
              </div>
              <Card
                style={{ width: '18rem', float: 'right' }}
                
              >
                <Card.Body className="d-flex justify-content-center align-items-center" style={{ padding: "20px"}}>
                  <Card.Text>
                    <h5>{cart.total_items} Items:</h5>
                    {returnItemInCart()}
                    <h5>Subtotal:</h5>
                    {cart.subtotal.formatted_with_symbol}
                  </Card.Text>
                  </Card.Body>
                  <Button variant="light"><h5>Checkout</h5></Button>
              </Card>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
