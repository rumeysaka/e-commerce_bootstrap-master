import React from 'react'
import { Card, Button, Form } from 'react-bootstrap'

export default function Login(props) {
  const {
    email,
    password,
    setEmail,
    setPassword,
    handleLogin,
    handleSignUp,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
    authListener,
  } = props

  // function handleLoginUser() {
  //     handleLogin()
  //     authListener()
  // }
  // function handleSignupUser() {
  //     handleSignUp()
  //     authListener()
  // }
  return (
    <>
      <Card
        style={{ width: '18rem', backgroundColor: 'whitesmoke', border:"0px", marginTop: '30%', marginLeft:"155%" }}
        className='d-flex justify-content-center align-items-center'>
        <Card.Body className='mt-4 mb-2'>
          <Card.Text>
            <label>Email</label>
          </Card.Text>

          <Form.Control
            type='text'
            autoFocus
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value)
            }}
          />
          <p className='errorMsg'>{emailError}</p>
          <Card.Text>
            <label>Password</label>
          </Card.Text>
          <Form.Control
            type='password'
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value)
            }}
          />
          <p className='errorMsg'>{passwordError}</p>
          <div>
            {hasAccount ? (
              <>
                <Button className='btn btn-sm opacity-75' variant='secondary' onClick={handleLogin}>
                  Sign In
                </Button>
                <p className='mt-2'>
                  Don't have an account?
                  <div>
                    <span
                      onClick={() => {
                        setHasAccount(!hasAccount)
                      }}>
                      Sign Up
                    </span>
                  </div>
                </p>
              </>
            ) : (
              <>
                <Button className='btn btn-sm primary' variant='secondary' onClick={handleSignUp}>
                  Sign Up
                </Button>
                <p className='mt-2'>
                  You have an account?
                  <div>
                    <span
                      onClick={() => {
                        setHasAccount(!hasAccount)
                      }}>
                      Sign In
                    </span>
                  </div>
                </p>
              </>
            )}
          </div>
        </Card.Body>
      </Card>
    </>
  )
}
