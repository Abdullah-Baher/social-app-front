import React, { useContext, useEffect, useState } from 'react'
import { useHistory } from 'react-router'
import styled from 'styled-components'
import api from '../../api/api';
import UserContext from '../../Contexts/User/UserContext'


const Container = styled.div`
    background-color: rgb(55, 58, 64);
    height: 500px;
    width: 35%;
    border: none;
    border-radius: 25px;
    margin: 0 auto;

`
const InAndUpContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding: 5px;
`
const Btn = styled.button`
    height: 50px;
    width: 40%;
    border: none;
    border-radius: 15px;
    color: white;
    align-content: center;
    font-size: larger;
    font-weight: bold;
    padding: 15px;
    margin-top: 25px;
`
const InputFieldsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    align-content: center;
    flex-grow: 7;
`
const TextField = styled.input`
    height: 30px;
    width: 80%;
    border: none;
    text-align: center;
    border-radius: 15px;
    padding: 10px;
    margin-top: 20px;
    color: grey;
    font-size: x-large;
    outline: none;
    color: black;
`
const SubmitBtn = styled.input.attrs({
    type: 'submit'
})`
    background-color: #007bff;
    
    width: 80%;
    border: none;
    text-align: center;
    border-radius: 15px;
    padding: 10px;
    margin-top: 20px;
    color: white;
    font-size: xx-large;
`
const SignInOrUp = () => {
    
    const userContext = useContext(UserContext);
    
    useEffect(() => {
       
        userContext.saveUser({});
        localStorage.removeItem('accessToken');
    }, []);

    let history = useHistory();
    const [ currForm , setForm ] = useState(0);
    const signInClick = (event) => {
        event.preventDefault();
        if(currForm === 1){
            setForm(0)
        }
    }
    const signUpClick = (event) => {
        event.preventDefault();
        if(currForm === 0){
            setForm(1)
        }
    }
    
    const getMainData = () => {
        const email = document.getElementById('userEmail').value;
        const password = document.getElementById('userPassword').value;
        return { email, password };
    }
    
    const moveToHome = (data) => {
        if(data.token){
            userContext.saveUser(data.user);
            localStorage.setItem('accessToken',data.token);
            history.push('/home');
            
        } else {
            const element = document.getElementById('api-error');
            element.innerText = data.message;
        }
    }
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(currForm === 0){
            const data = getMainData();
            const response = await api.LoginUser(data);
            moveToHome(response)
        }
        else{
            let data = getMainData();
            data.name = document.getElementById('userName').value;
            const response = await api.RegisterUser(data);
            moveToHome(response);            
        }
    }
    
    return <Container>
        <form style={{height: '100%',width: '100%', display: 'flex', flexDirection:'column'}} onSubmit={handleSubmit}>
            <InAndUpContainer>
                <Btn onClick={signInClick} id='login' style={{backgroundColor: !currForm ? '#1D1E21' : '#373A40'}}>Sign In</Btn>
                <Btn onClick={signUpClick} id='register' style={{backgroundColor: currForm ? '#1D1E21' : '#373A40'}}>Sign Up</Btn>
            </InAndUpContainer>
            
            <InputFieldsContainer>
                <p id='api-error' style={{color: 'red', fontSize: 'x-large'}}></p>
                {
                    currForm === 0 ?
                    null :
                    <TextField placeholder='Username' id='userName' type='text' required></TextField>
                }
                <TextField placeholder='Email' id='userEmail' required></TextField>
                <TextField placeholder='Password' id='userPassword' type='password' required></TextField>
                <SubmitBtn value={currForm ? 'Register' : 'Login'}></SubmitBtn>
            </InputFieldsContainer>
        </form>
    </Container>
}

export default SignInOrUp;