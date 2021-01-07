import React, { useState } from 'react';
import {Form, Container, Button} from "react-bootstrap"
import logo from "../../logo.svg"
import "./index.css"

const Login = () => {

    // looks like public string email {get, set};
    const [email, setemail] = useState('');
    const [senha, setsenha] = useState('');

const logar = (event) => {
    event.preventDefault();
    
    //representa o objeto que contém os dados do usuário
    const objLogin = {
        "email" : email,
        "senha" : senha
    }

    console.log(objLogin);

    fetch('http://localhost:5000/api/usuario/logar', {
        method : "POST",
        body : JSON.stringify(objLogin),
        headers : {
            'content-type' : 'application/json'
        }
    })
    .then(response => {
        if (response.ok){
            //Faça isso
        }
        alert("Dados Inválidos")
    })
    .then(data =>{
        console.log(data);
        localStorage.setItem('token-gerir', data.token);
    })
}


    return(
        <div>
            <Container className='form-height'>
            <Form className='form-signin' onSubmit={event => logar(event)}>
                <div className='text-center'>
                 <img src={logo} alt='  Gerir' style={{ width : '64px'}} />
                </div>
                <br/>
                <small>Informe seus dados Abaixo</small>
                <hr/>
                <Form.Group controlId="formBasicEmail">
                    <Form.Label>Email </Form.Label>
                    <Form.Control type="email" value={email} onChange={event => setemail(event.target.value)} placeholder="Informe o email" required />
                </Form.Group>

                <Form.Group controlId="formBasicPassword">
                    <Form.Label>Senha</Form.Label>
                    <Form.Control type="password" value={senha} onChange={event => setsenha(event.target.value)} placeholder="Informe a senha" required />
                </Form.Group>
                <Button variant="primary" type="submit" >
                    Enviar
                </Button>
                <br/><br/>
                <a href='/cadastrar' style={{ marginTop :'30px'}}>Não possui conta?</a>
            </Form>
        </Container>
        </div>     
    );

}

export default Login;