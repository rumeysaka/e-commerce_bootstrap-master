import React from 'react'
import {
  Elements,
  CardElement,
  ElementsConsumer,
  ShippingAddressElement,
} from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import { Button } from 'react-bootstrap'

const stripePromise = loadStripe(
  'pk_test_51L5YqPH597LM8jeH8tKOBZVwVKagUAUXbnv9JuFUV1iLpJ0pb6qGXnjY4Zasq9UmNmsH0CWHNACQtOuDSRKi4edk00JH2jzvwc'
)

export default function Payment({ cart, token, onCaptureCheckout, shippingData }) {

  const handleSubmit = async (e, elements, stripe) => {
    e.preventDefault()
    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)

    const { error, paymentMethod } = await stripe.createPaymentMethod({ type: "card", card: cardElement })

    console.log(shippingData)
    
  
      const orderData = [{
        line_items: token.live.line_items,
        customer: {
          firstname: shippingData.name,
          lastname: shippingData.surname,
          email: shippingData.email,
        },
        shipping: {
          name: 'Primary',
          street: shippingData.address,
          town_city: shippingData.city,
          county_state: shippingData.shippingSubdivision,
          postal_zip_code: shippingData.zipcode,
          country: shippingData.shippingCountry,
        },
        fulfillment: { shipping_method: shippingData.shippingOption },
        payment: {
          gateway: "stripe",
          stripe: {
            payment_method_id: paymentMethod.id
          }
         }
      }]
    console.log(orderData)
      onCaptureCheckout(token.id, orderData)
   
    console.log(shippingData)
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
