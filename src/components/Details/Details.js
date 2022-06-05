import React, { useState, useEffect, useContext } from 'react'
import { useParams } from 'react-router-dom'
import { Card, Button, Form, Container } from 'react-bootstrap'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-regular-svg-icons'
import { faXmark } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { LoginContext } from '../../LoginContext'

import Products from './../Hompage/Products'
import { CardActionArea } from '@material-ui/core'

export default function Details({ products, handleFav, onAddToCart }) {
  const [temp, setTemp] = useState([])
  const [comment, setComment] = useState('')
  const [person, setPerson] = useState('')
  const [comments, setComments] = useState([])
  const [last, setLast] = useState([])
  const [newObj, setNewObj] = useState([])
  const { id } = useParams()
  const { user, setUser } = useContext(LoginContext)

  const handleComment = (event) => {
    event.preventDefault()
    setComments([...comments].concat(comment))

    setNewObj(
      [...newObj].concat({
        id: `${id}`,
        name: person,
        comm: comment,
      })
    )
    setComment('')
    setPerson('')
    bilmemne()
  }
  function bilmemne() {
    {
      setLast(newObj.filter((item) => item.id == id))
    }
    console.log('last', last)
  }

  function onHandleFav(id) {
    handleFav(id)
  }
  const handleAddToCart = (id) => {
    onAddToCart(id, 1)
  }

  async function deneme() {
    setTemp(
      products.filter((item) => {
        return item.id == id
      })
    )
  }

  const noUserMessage = () => {
    return <div>You cant add to favorites</div>
  }

  useEffect(() => {
    bilmemne()
  }, [id, newObj])

  useEffect(() => {
    deneme()
  }, [id])
  console.log('newObj', newObj)

  useEffect(() => {
    const temp = localStorage.getItem('newObj')
    const commentsList = JSON.parse(temp)
    if (commentsList) {
      setNewObj(commentsList)
    }
  }, [])

  useEffect(() => {
    const temp = JSON.stringify(newObj)
    localStorage.setItem('newObj', temp)
  }, [newObj])

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
      // onClick={deneme}
    >
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

                    <Button
                      variant='light'
                      size='sm'
                      onClick={() => {
                        user && handleAddToCart(temp.id)
                      }}>
                      Add to Cart
                    </Button>
                    <FontAwesomeIcon
                      icon={faHeart}
                      onClick={() => {
                        user ? onHandleFav(temp.id) : noUserMessage()
                      }}
                      className='mb-0 mx-3'
                    />
                  </Card.Body>
                </Card>
              </Card.Body>
            </Card>

            <Form onSubmit={handleComment}>
              <Form.Group className='mt-4' controlId='exampleForm.ControlTextarea1'>
                <Form.Label style={{fontSize:"13px"}}>Name Surname</Form.Label>
                <Form.Control style={{height:"22px" }} value={person} onChange={(e)=> setPerson(e.target.value) } />
                <Form.Label style={{fontSize:"13px"}} className='mt-1'>Leave a comment</Form.Label>
                {/* (style={{pointerEvents: "none" }}) */}
                
                {!user ?(<Form.Control
                  disabled
                  style={{ width: '680px'}}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  as='textarea'
                  rows={3}
                />):
                <Form.Control
                style={{ width: '680px'}}
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                as='textarea'
                rows={3}
                />
              }
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
        {newObj && (
          <div>
            {last.map((item) => (
              <Card
                className='mt-1'
                style={{ backgroundColor: 'rgb(247, 247, 247,.65)', border: '0px' }}>
                  
                <Card.Body><Card.Title className='opacity-100' style={{fontSize:"13px"}}>{item.name}</Card.Title>
                  <Card.Text className='opacity-100 mx-3'>{item.comm}</Card.Text>
                </Card.Body>
              </Card>
            ))}
          </div>
        )}
      </div>
      <div className='mt-3 d-flex justify-content-center'>
        <h3>Related items</h3>
      </div>
      <br />
      <div
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
            <div>
              <Card
                className=''
                style={{
                  width: '6rem',
                  height: '12rem',
                  margin: '2px',
                  marginBottom: '0px',
                }}>
                <Link style={{ textDecoration: 'none', color: 'black' }} to={`/${product.id}`}>
                  <Card.Img variant='top' src={product.image.url} />{' '}
                  <Card.Body
                    style={{
                      alignItems: 'end',
                      paddingTop: '30px',
                      marginBottom: '0px',
                    }}>
                    <div>
                      <Card.Title style={{ fontSize: '8px' }}>{product.name}</Card.Title>
                    </div>
                    <Card.Text style={{ fontSize: '7px', float: 'right', fontWeight: '500' }}>
                      {product.price.formatted_with_symbol}
                    </Card.Text>
                  </Card.Body>
                </Link>
              </Card>
            </div>
          </div>
        ))}{' '}
      </div>
    </div>
  )
}
