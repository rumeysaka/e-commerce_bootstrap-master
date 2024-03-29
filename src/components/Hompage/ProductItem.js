import React, { useContext } from 'react'
import { Button, Card, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { LoginContext } from '../../LoginContext'
import Details from '../Details/Details'
import { Link } from 'react-router-dom'

export default function ProductItem({ product, onAddToCart, handleFav, products }) {
  const { user, setUser } = useContext(LoginContext)

  function onHandleFav(id) {
    handleFav(id)
  }
  const handleAddToCart = () => {
    onAddToCart(product.id, 1)
  }
  return (
    <>
      <Container className='my-3'>
        <Card
          className=''
          style={{
            width: '10rem',
            height: '20rem',
            margin: '2px',
            marginBottom: '0px',
          }}>
          <Card.Img
            variant='top'
            src={product.image.url}
            style={{
              objectFit: 'cover',
              height: '120px',
              width: '120px',
              alignSelf: 'center',
            }}
          />

          <Card.Body
            style={{
              alignItems: 'end',
              paddingTop: '30px',
              marginBottom: '0px',
            }}>
            <div>
              <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${product.id}`}>
                <Card.Title style={{ fontSize: '18px' }}>{product.name}</Card.Title>
                <Card.Text
                  dangerouslySetInnerHTML={{ __html: product.description }}
                  style={{ fontSize: '12px' }}></Card.Text>
              </Link>
            </div>
            <Card.Text style={{ fontSize: '15px', float: 'right', fontWeight: '500' }}>
              {product.price.formatted_with_symbol}
            </Card.Text>

            {!product.fav && user ? (
              <FontAwesomeIcon
                icon={faHeart}
                onClick={() => onHandleFav(product.id)}
                className='m-1'
              />
            ) : null}
          </Card.Body>
          <Button variant='light' size='sm' onClick={handleAddToCart}>
            Add to Cart
          </Button>
        </Card>
      </Container>
    </>
  )
}
