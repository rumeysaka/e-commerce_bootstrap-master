import React, { useState, useEffect, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Button, Form, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'

import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

import Products from './../Hompage/Products'

export default function Details({ products, handleFav, onAddToCart }) {
  const [temp, setTemp] = useState([])
  const [comment, setComment] = useState('')
  const [comments, setComments] = useState([])
  const [last, setLast] = useState([])
  const [newObj, setNewObj] = useState([])
  const { id } = useParams()

  const handleComment = (event) => {
    event.preventDefault()
    const newObj = [
      {
        id: `${id}`,
        comm: comments,
      },
    ]
    {
      setLast(newObj.filter((item) => item.id == id))
    }
    setComments([...comments].concat(comment))
    setComment('')
    console.log('newObj', newObj)
  }
  function onHandleFav(id) {
    handleFav(id)
  }
  const handleAddToCart = (id) => {
    onAddToCart(id, 1)
  }

  async function deneme() {
    setTemp(
      await products.filter((item) => {
        return item.id == id
      })
    )
  }

  useEffect(() => {
    deneme()
    console.log('newObj', newObj)
  }, [])
  console.log(temp)
  console.log(comment)

  useEffect(() => {
    const temp = localStorage.getItem('comments')
    const commentsList = JSON.parse(temp)
    if (commentsList) {
      setComments(commentsList)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(comments)
    localStorage.setItem('comments', temp)
  }, [comments])
  useEffect(() => {
    const temp = localStorage.getItem('comment')
    const loadComment = JSON.parse(temp)
    if (loadComment) {
      setComments(loadComment)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(comment)
    localStorage.setItem('comment', temp)
  }, [comment])
  return (
    <div
      style={{
        marginTop: '3%',
        marginLeft: '16%',
      }}
      onClick={deneme}>
      
      {temp.length ? (
        Object.values(temp).map((temp) => (
          <div key={temp.id} style={{ marginBottom: '20px' }}>
            <Card className='row' style={{ width: '700px' }}>
              <Card.Body className='row d-flex'>
                <h3>{temp.name}</h3>

                <Card.Img
                  className='col-6'
                  style={{
                    objectFit: 'cover',
                    height: '380px',
                    width: '380px',
                  }}
                  src={temp.image.url}
                />
                <Card style={{ border: '0px', width: '250px', padding: '0px' }} className='col-6'>
                  <Card.Body>
                    <Card.Text dangerouslySetInnerHTML={{ __html: temp.description }}></Card.Text>
                    <Card.Text>{temp.price.formatted_with_symbol}</Card.Text>

                    <Button variant='light' size='sm' onClick={() => handleAddToCart(temp.id)}>
                      Add to Cart
                    </Button>
                    <FontAwesomeIcon
                      icon={faHeart}
                      onClick={() => onHandleFav(temp.id)}
                      className='mb-0 mx-3'
                    />
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>

            <Form onSubmit={handleComment}>
              <Form.Group className='mt-4' controlId='exampleForm.ControlTextarea1'>
                <Form.Label>Leave a comment</Form.Label>
                <Form.Control
                  style={{ width: '680px' }}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  as='textarea'
                  rows={3}
                />
              </Form.Group>
              <Button variant='outline-secondary' className='my-2' type='submit'>
                Submit
              </Button>
            </Form>
          </div>
        ))
      ) : (
        <div>Loading</div>
      )}{' '}
      <div>
        {comments && (
          <div>
            {last.map((item) => (
              <div>{item.comm}</div>
            ))}
          </div>
        )}
      </div>
      <div
        className='my-4'
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          position: 'absolute',
          left: '10%',
          marginRight: '10%',
        }}>
        {products.map((product) => (
          <div key={product.id} style={{ marginBottom: '20px' }}>
            <div className='my-3'>
              <Card
                className=''
                style={{
                  width: '6rem',
                  height: '12rem',
                  margin: '2px',
                  marginBottom: '0px',
                }}>
                {product.fav && (
                  <FontAwesomeIcon
                    icon={faXmark}
                    style={{ float: 'right', color: 'grey', cursor: 'pointer' }}
                    className='mx-1'
                  />
                )}
                <Card.Img variant='top' src={product.image.url} />{' '}
                <Card.Body
                  style={{
                    alignItems: 'end',
                    paddingTop: '30px',
                    marginBottom: '0px',
                  }}>
                  <div>
                    <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${product.id}`}>
                      <Card.Title style={{ fontSize: '8px' }}>{product.name}</Card.Title>
                    </Link>
                  </div>
                  <Card.Text style={{ fontSize: '7px', float: 'right', fontWeight: '500' }}>
                    {product.price.formatted_with_symbol}
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
          </div>
        ))}{' '}
      </div>
    </div>
  )
}
