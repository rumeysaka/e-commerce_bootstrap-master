import React from 'react';
import { Card, Button, Form } from 'react-bootstrap';

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
        authListener
    } = props;

    // function handleLoginUser() {
    //     handleLogin()
    //     authListener()
    // }
    // function handleSignupUser() {
    //     handleSignUp()
    //     authListener()
    // }
    return <div className="d-flex justify-content-center">
        <Card style={{width:"18rem",backgroundColor:"whitesmoke", marginTop:"10%"}} className="" >
            <Card.Body className=''>
                <Card.Text><label>Username</label></Card.Text>
            
            <input type="text" autoFocus required value={email} onChange={ e=>{ setEmail(e.target.value)}} />
            <p className='errorMsg'>{emailError}</p>
            <Card.Text><label>Password</label></Card.Text>
            <input type="password" required value={password} onChange={(e) =>{ setPassword(e.target.value)}} />
            <p className="errorMsg">{passwordError}</p>
            <div className="btnContainer">
                {hasAccount ? (
                    <> 
                    <button onClick={handleLogin}>Sign In</button>    
                    <p>Don't have an account?
                    <span onClick={() =>{ setHasAccount(!hasAccount)}}>Sign Up</span></p>
                    </>
                ) : (
                    <> 
                    <button onClick={handleSignUp}>Sign Up</button>
                    <p>Have an account? 
                        <span onClick={()=>{ setHasAccount(!hasAccount )}}>Sign In</span></p>
                    </>
                )}
            </div>
            </Card.Body>
        </Card>
</div>}