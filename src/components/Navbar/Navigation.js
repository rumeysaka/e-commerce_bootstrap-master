import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCartShopping,
  faBagShopping,
} from '@fortawesome/free-solid-svg-icons'

export default function Navigation({ cart, user, handleLogout }) {
  return (
    <>
      <Navbar bg='light' variant='light' text='light'>
        <Container>
          <Navbar.Brand href='/'>
            ShopMe <FontAwesomeIcon icon={faBagShopping} />
          </Navbar.Brand>
          <Nav className='mx-auto'>
            {/* <Nav.Link href="/">Home</Nav.Link>
        <Nav.Link href="#pricing">Pricing</Nav.Link>
        <Nav.Link href="#features">Features</Nav.Link> */}
          </Nav>
          <Nav.Link href='/cart' className='d-flex'>
            {cart.total_items}
            <FontAwesomeIcon icon={faCartShopping} className='my-1 mx-1' />
          </Nav.Link>
          {user ?                 <Nav.Link className="nav-link" href="/"
                  onClick={handleLogout}
                >
                  Log out
                </Nav.Link>:
                <Nav.Link className="nav-link" href="/sign" >
                  Sign In
                </Nav.Link>}
              

        </Container>
      </Navbar>
    </>
  )
}
