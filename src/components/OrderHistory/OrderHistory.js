import React, { useEffect, useState, useContext } from 'react'
import { Card } from 'react-bootstrap'
import { OrderContext } from '../../OrderContext'

export default function OrderHistory() {
  const [line_Items, setLine_Items] = useState([])
  const { order, payment } = useContext(OrderContext)

  console.log('order', order)
  console.log('payment', payment)
  // setLine_Items(Object.values(order).line_items)
  // console.log("line", line_Items)

  return (
    <>
    <Card  style={{float:"right"}}>
        <Card.Body>
        {Object.values(order).map((item) => (
          <div key={item.id}>
            <Card.Body>
              {}
              <Card.Text>
                <div>
                  {' '}
                  <div>
                    Alıcı adı : {item.name} {item.surname}
                  </div>
                  <div>Adresi : {item.address}</div>
                  <div>
                    {/* {Object.entries(item)
                .map(([line_items]) => ({ products: line_items }))
                .map((item) => (
                  <div key={item.id} >
                    {item.products}
                  </div>
                ))}   */}
                  </div>
                </div>
              </Card.Text>
            </Card.Body>
          </div>
        ))}{' '}
        </Card.Body>
      </Card>
    <div style={{float:"left"}}>
      {' '}
      <Card style={{ width: '20rem'}} className='my-4'>
        <Card.Header>
          <Card.Title> Your Orders</Card.Title>
        </Card.Header>
        <div className='mx-4'>
          {Object.values(payment).map((item) => (
            <div>
              <div>
                {Object.values(item.line_items).map((items) => (
                  <div key={items.id}>
                    {/* <Card.Img src={items.image.url} alt="Girl in a jacket" width="500" height="600"> */}
                    <div>Ürün adı : {items.name}</div>
                    <div>Ürün adedi : {items.quantity}</div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        {/* 
          {Object.values(line_Items).map((items) => (
            <div>{items.name}</div>
          ))}
        */}
      </Card>
     
      </div>
      </>
  )
}
