import React from 'react'
import { Navbar, Nav, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCartShopping, faBagShopping, faDoorOpen } from '@fortawesome/free-solid-svg-icons'

export default function Navigation({ cart, user, handleLogout }) {
  return (
    <>
      <Navbar bg='light' variant='light' text='light'>
        <Container>
          <Navbar.Brand href='/'>
            ShopMe <FontAwesomeIcon icon={faBagShopping} />
          </Navbar.Brand>
          <Nav className='mx-auto'>
          </Nav>
          <Nav.Link href='/cart' className='d-flex text-dark'>
            {cart.total_items}
            <FontAwesomeIcon icon={faCartShopping} className='my-1 mx-1' />
          </Nav.Link>
          {user ? (
            <>
              <Nav.Link
                className='nav-link'
                style={{ marginLeft: '12px', paddingTop: '0px', color:"black" }}
                href='/'
                onClick={handleLogout}> Welcome <br/>
                Log out <tab />
                <FontAwesomeIcon icon={faDoorOpen} />
              </Nav.Link>
            </>
          ) : (
              <Nav.Link className='nav-link' href='/sign' style={{ marginLeft: '12px', paddingTop: '0px', color:"black" }}>
                Hi <br />
              Sign In
            </Nav.Link>
          )}
        </Container>
      </Navbar>
    </>
  )
}
