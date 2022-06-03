import React from 'react'
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Card, Container } from 'react-bootstrap'


export default function Favorties({favList, onHandleDelete, onDeleteAll, onHandleFav}) {
  return (
    <>
   
    <div className="my-4 container" style={{ display: "flex", flexWrap: "wrap", justifyContent:"center"}}>
      {favList.map((product) => (
        <div key={product.id}
          style={{ marginBottom: "20px" }}>
          
          <Container className="my-3">
        <Card
          className=""
          style={{
            width: '10rem',
            height: '20rem',
            margin: '2px',
            marginBottom: '0px',
              }}>
              {product.fav && (
            <FontAwesomeIcon
              icon={faXmark}
              style={{ float: "right" }}
              className="mx-1"
              onClick={() => onHandleDelete(product.id)}
            />
          )}
          <Card.Img
            variant='top'
            src={product.image.url}
            style={{
              objectFit: 'cover',
              height: '120px',
              width: '120px',
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
              <Card.Title style={{ fontSize: '18px' }}>
                {product.name}
              </Card.Title>
              <Card.Text
                dangerouslySetInnerHTML={{ __html: product.description }}
                style={{ fontSize: '12px' }}></Card.Text>
            </div>
            <Card.Text
              style={{ fontSize: '15px', float: 'right', fontWeight: '500' }}>
              {product.price.formatted_with_symbol}
            </Card.Text>
           
            
          </Card.Body>
          <Button variant='light' size='sm'>
            Add to Cart
          </Button>
        </Card>
      </Container>



        </div>
      ))} {favList.length && (
        <Button style={{height:"28px", border:"0px"}} className="btn-sm bg-secondary" onClick={onDeleteAll}>
          Delete all
        </Button>
      )}
      
      </div>
    
      </>
  )
}
