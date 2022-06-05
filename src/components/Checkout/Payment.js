import React, { useContext } from 'react'
import {
  Elements,
  CardElement,
  ElementsConsumer,
  ShippingAddressElement,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from 'react-bootstrap'
import { OrderContext } from '../../OrderContext'

export default function Payment({ cart, token, onCaptureCheckout, shippingData }) {
  const { payment, setPayment, refreshCart } = useContext(OrderContext)
  const { order } = useContext(OrderContext)

  const stripePromise = loadStripe(
    'pk_test_51L5YqPH597LM8jeH8tKOBZVwVKagUAUXbnv9JuFUV1iLpJ0pb6qGXnjY4Zasq9UmNmsH0CWHNACQtOuDSRKi4edk00JH2jzvwc'
  )

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault()
    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement,
    })

    console.log('order', order)

    const orderData = [
      {
        line_items: token.live.line_items,
        customer: {
          firstname: order.name,
          lastname: order.surname,
          email: order.email,
        },
        shipping: {
          name: 'Primary',
          street: order[0].address,
          town_city: order[0].city,
          county_state: order[0].shippingSubdivision,
          postal_zip_code: order[0].zipcode,
          country: order[0].shippingCountry,
        },
        fulfillment: { shipping_method: order[0].shippingOption },
        payment: {
          gateway: 'stripe',
          stripe: {
            payment_method_id: paymentMethod.id,
          },
        },
      },
    ]
    setPayment([...payment].concat(orderData))

    console.log(payment)
    onCaptureCheckout(token.id, orderData)
    refreshCart()
  }
  return (
    <div>
      <h5>Summary</h5>
      <div className='py-3'>
        {cart.line_items.map((product) => (
          <div style={{ width: '18rem' }}>
            <div style={{ float: 'right' }}>{product.price.formatted_with_symbol} </div>
            <div style={{ fontWeight: '600' }}>{product.product_name} </div>
            <div style={{ fontSize: '12px' }}>Quantity: {product.quantity} </div>
          </div>
        ))}
        <br />
        <div>
          <h6 style={{ float: 'right' }}>{cart.subtotal.formatted_with_symbol}</h6>
          <h6>Subtotal:</h6>
        </div>
      </div>
      <br />
      <div>Payment Method</div>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={(e) => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div>
                <Button>Back</Button>
                <Button disabled={!stripe} type='submit' variant='danger'>
                  Pay {token.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </div>
  )
}
