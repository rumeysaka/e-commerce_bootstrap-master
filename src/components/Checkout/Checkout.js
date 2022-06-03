import React, { useState, useEffect } from 'react'
import { Card, Button } from 'react-bootstrap'
import { commerce } from '../../lib/commerce'
import InitialForm from './InitialForm'
import Payment from './Payment'

const steps = ['Shipping address', 'Payment details']

export default function Checkout({ cart, onCaptureCheckout, error }) {
  const [activeStep, setActiveStep] = useState(0)
  const [checkoutToken, setCheckoutToken] = useState(null)
  const [shippingData, setShippingData] = useState({})

  const Confirmation = () => <div>confirmation</div>

  const generateCheckoutToken = async () => {
    commerce.checkout.generateToken(cart.id, { type: 'cart' }).then((checkout) => {
      setCheckoutToken(checkout)
    })
  }
  useEffect(() => {
    generateCheckoutToken()
    console.log(checkoutToken)
  }, [cart])


  const test = (data) => {
    setShippingData(data);
    console.log(data)
  };
  
  return (
    <>
      <div className='d-flex col-2 my-4'></div>
      <div className='d-flex my-4'>
        <Card
          style={{ width: '40rem' }}
          className='d-flex align-items-center justify-content-center bg-light'>
          <Card.Title className='py-4'>Checkout</Card.Title>
          <Card.Text>
            <h6>
              Step {activeStep + 1}: {steps[activeStep]}
            </h6>
          </Card.Text>
          <Card.Body>
            {activeStep === 0 && checkoutToken ? (
              <InitialForm token={checkoutToken} setShippingData={setShippingData} test={test} />
            ) : (
              <span></span>
            )}
            {activeStep === 1 && checkoutToken ? (
              <Payment token={checkoutToken} cart={cart} shippingData={shippingData} onCaptureCheckout={onCaptureCheckout} />
            ) : (
              <span></span>
            )}
        {activeStep === steps.length && <Confirmation />}
          </Card.Body>
          <div style={{ paddingBottom: '15px' }}>
            {activeStep !== 0 ? (
              <Button
                variant='outline-secondary'
                className='btn-sm'
                onClick={() => setActiveStep(activeStep - 1)}>
                Prev
              </Button>
            ) : (
              <span></span>
            )}
            <Button
              variant='outline-secondary'
              className='btn-sm'
              onClick={() => {
                activeStep !== steps.length && setActiveStep(activeStep + 1)
              }}>
              Next
            </Button>
          </div>

        </Card>
      </div>
    </>
  )
}
