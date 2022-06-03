
import React from 'react'
import { Card } from 'react-bootstrap'

export default function Footer() {
  return (
    <div style={{marginTop:"80px", }}>
      <>
        <Card className='bg-light'>
          <Card.Body>
                      <Card.Text style={{color:"#6c757d", float:"left"}} >Rümeysa Karagöz</Card.Text>
                      {/* <Card.Text style={{color:"#6c757d", float:"left"}} >180315047</Card.Text> */}
                      <Card.Text className='d-flex justify-content-center' style={{color:"#6c757d", fontSize:"12px"}} >GP-II Project 2022</Card.Text>
                      <Card.Text className='d-flex justify-content-center' style={{color:"#6c757d", fontSize:"12px"}} >All Rights Reserved @</Card.Text>
          </Card.Body>
        </Card>
      </>
    </div>
  )
}
