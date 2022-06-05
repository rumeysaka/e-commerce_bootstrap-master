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
      <Card style={{ width: '35rem', marginLeft:"20%"}} className='my-4'>
        <Card.Header>
          <h3> Your Orders</h3>
        </Card.Header>
        <Card.Body className='p-4'>
          {Object.values(order).map((item) => (
            <div key={item.id}>
              <Card></Card>
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
                      <div className='m-4'>
                        {Object.values(item.line_items).map((items) => (
                          <div key={items.id}>
                            {/* <Card.Img src={items.image.url} alt="Girl in a jacket" width="500" height="600"> */}
                            <div>Ürün adıss : {items.name}</div>
                            <div>Ürün adedi : {items.quantity}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card.Text>
              </Card.Body>
            </div>
          ))}{' '}
        </Card.Body>
      </Card>
       
    </>
  )
}
