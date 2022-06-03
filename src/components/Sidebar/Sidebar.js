import React from 'react'
import { Card } from 'react-bootstrap'

export default function Sidebar({ user }) {
  return (
    <div
      style={{
        float: 'left',
        left: '0px',
        position: 'sticky',
        width: '8rem',
        border: 'none',
      }}>
      <Card style={{ height: '92vh', borderRadius: '0px', border: 'none' }} className='bg-light'>
        <Card.Body>
          <Card.Text>
            <Card.Link href='/' style={{ textDecoration: 'none', color: 'black' }}>
              Home
            </Card.Link>
          </Card.Text>
          <Card.Text>
            {user && (
              <Card.Link href='/favorites' style={{ textDecoration: 'none', color: 'black' }}>
                Favorites
              </Card.Link>
            )}
          </Card.Text>
          <Card.Text>
            <Card.Link href='/cart' style={{ textDecoration: 'none', color: 'black' }}>
              Cart
            </Card.Link>
          </Card.Text>
          <Card.Text>
            <Card.Link href='/order-history' style={{ textDecoration: 'none', color: 'black' }}>
              Order History
            </Card.Link>
          </Card.Text>
        </Card.Body>{' '}
        <div className='justify-content-flex-end'>
          <Card.Footer>
            <Card.Text>
              <Card.Link href="/sign" style={{ textDecoration: 'none', color: 'black' }}>Login</Card.Link>
            </Card.Text>
            <Card.Text>
              <Card.Link href="/sign" style={{ textDecoration: 'none', color: 'black' }}>Sign Up</Card.Link>
            </Card.Text>
          </Card.Footer>
        </div>
      </Card>
    </div>
  )
}
