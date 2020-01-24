import React, {useEffect, useState} from 'react'
import {usePost} from '../utils/rest'
import { Redirect } from 'react-router-dom'

const url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyAHfrC6GOaOGoQ22GFHKMo8KrqS_0vXUDY'

const Login = () => {
    const [postData, signin] = usePost(url)
    const[logado, setLogado] = useState(false)
    const [email, setEmail] = useState('')
    const [senha, setSenha] = useState('')
    useEffect(() => {
        //console.log('posData mudou', postData.loading)
        if(Object.keys(postData.data).length > 0){
            localStorage.setItem('token', postData.data.idToken)
            //console.log('logou', postData.data.idToken)
            window.location.reload()
        }
    }, [postData])
    useEffect(()=> {
        const token = localStorage.getItem('token')
        if(token){
            setLogado(true)
        }
    })
    const login = async() => {
        const token = await signin(
            {
                email: email,
                password: senha, 
                returnSecureToken: true     
            })
            //imperativo
            //console.log('token >>>>', token)
            
    }
    const onChangeEmail = evt => {
        setEmail(evt.target.value)
    }
    const onChangeSenha = evt => {
        setSenha(evt.target.value)
    }
    if(logado){
        return <Redirect to='/' />
    }
    
    return(
        <div>
            <h1>Login</h1>
            {
                postData.error && postData.error.length >0 &&
                <p>E-mail ou senha invalido</p>
            }
            <input type="text" value={email} onChange={onChangeEmail} placeholder='Seu e-mail'/>
            <br/>
            <input type="password" name="password" value={senha} onChange={onChangeSenha} placeholder='Sua senha' />
            <button onClick={login}>Login</button>
        </div>
        
    )
}

export default Login