import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faSquarePlus,
  faSquareMinus,
  faTrash,
} from '@fortawesome/free-solid-svg-icons'
import { Button, Card } from 'react-bootstrap'

export default function CartItem({
  product,
  onUpdateCartQty,
  onRemoveFromCart,
}) {
  const handleUpdateCartQty = (lineItemId, quantity) => {
    onUpdateCartQty(lineItemId, quantity)
  }

  const handleRemoveFromCart = () => {
    onRemoveFromCart(product.id)
  }

  return (
    <Card
      key={product.id}
      className
      style={{
        width: '12rem',
        height: '100%',
        margin: '10px',
        marginBottom: '0px',
      }}>
      <Card.Img
        variant='top'
        src={product.image.url}
        style={{
          objectFit: 'cover',
          height: '150px',
          width: '150px',
          alignSelf: 'center',
        }}
      />{' '}
      <Card.Body
        style={{
          alignItems: 'end',
          paddingTop: '30px',
          marginBottom: '0px',
        }}>
        <div>
          <Card.Title style={{ fontSize: '18px' }}>{product.name}</Card.Title>
          <Card.Text
            dangerouslySetInnerHTML={{ __html: product.description }}
            style={{ fontSize: '12px' }}></Card.Text>
        </div>
        <Card.Text
          style={{ fontSize: '15px', float: 'right', fontWeight: '500' }}>
          {product.price.formatted_with_symbol}
        </Card.Text>
      </Card.Body>
      <div
        className='d-flex justify-content-center'
        style={{ marginBottom: '15px', marginTop: '15px' }}>
        <FontAwesomeIcon
          style={{ margin: '5px' }}
          icon={faSquareMinus}
          onClick={() => handleUpdateCartQty(product.id, product.quantity - 1)}
        />
        <div> {product.quantity} </div>
        <FontAwesomeIcon
          style={{ margin: '5px' }}
          icon={faSquarePlus}
          onClick={() => handleUpdateCartQty(product.id, product.quantity + 1)}
        />
      </div>
      <Button
        className='btn btn-sm'
        variant='light'
        onClick={() => handleRemoveFromCart(product.id)}>
        Remove
      </Button>
    </Card>
  )
}
