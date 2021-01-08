import React, { useState, useEffect } from 'react';
import {Container, Card, Form, Table, Button, InputGroup} from'react-bootstrap';
import "./index.css"

const Tarefa = () => {

    const[id, setId] = useState(0);
    const[titulo, setTitulo] = useState('');
    const[descricao, setDescricao] = useState('');
    const[status, setStatus] = useState('');
    const[dataentrega, setDataentrega] = useState('');
    const[categoria, setCategoria] = useState('');
    const[tarefas, setTarefas] = useState([]);

        useEffect(() => {
            listartarefas();

        },[])
    
    
    const listartarefas = () =>{

        fetch('http://localhost:5000/api/Tarefa',{
            method : "GET",
            headers : {
            'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
            }
        })
            .then(response => response.json())
            .then(data => {
                setTarefas(data.data)
                console.log(data.data)
            })

    }
    const salvar =(event) => {
        event.preventDefault();

        //Crio o objeto tarefa
        const tarefa = {
            titulo : titulo,
            descricao : descricao,
            categoria : categoria,
            dataentrega : dataentrega,
            status : status
        }

        const method = (id === 0 ? 'POST' : 'PUT');
        const urlRequest = (id === 0 ? 'http://localhost:5000/api/tarefa' : 'http://localhost:5000/api/tarefa/' + id);

        fetch(urlRequest, {
            method : method,
            body : JSON.stringify(tarefa),
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-gerir'),
                'content-type' : 'application/json'
            }
        })
        .then(response => response.json())
        .then(dados => {
            alert('Tarefa salva');

            listartarefas();

            limparCampos();
        })
    }

    const editar = (event) => {
        //event.preventDefault();

        fetch('http://localhost:5000/api/tarefa/' + event.target.value,{
            method:'GET',
            headers : {
                'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            setId(data.id);
            setTitulo(data.titulo);
            setDescricao(data.descricao);
            setCategoria(data.categoria);
            setDataentrega(data.dataentrega.substring(0,10));
            //console.log(anyString.substring(0,3));
            setStatus(data.status);
        })

    }
    
    const limparCampos = () =>{
        setId(0);
        setTitulo('');
        setDescricao ('');
        setCategoria('');
        setDataentrega('');
        setStatus(false);
    }


  
        const excluir = (event) =>{
            if(window.confirm("Deseja realmente excluir a tarefa")){
                fetch('http://localhost:5000/api/tarefa/' + event.target.value,{
                method:'DELETE',
                headers : {
                    'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
                }
            })
            .then(()=>{
                alert('Tarefa excluída meu bom')

                listartarefas();
            })
            }
            
            
        }

        const alterarStatus = (event) =>{
            if(window.confirm("Deseja realmente alterar o status da tarefa?")){
                fetch('http://localhost:5000/api/tarefa/alterarstatus/' + event.target.value,{
                method:'PUT',
                headers : {
                    'authorization' : 'Bearer ' + localStorage.getItem('token-gerir')
                }
            })
            .then(()=>{
                alert('Tarefa alterada meu bom')

                listartarefas();
            })
            }
            
            
        }

        

        

    
        
    return (
        <div>
            <Container>
      
                <Card>
                    <Card.Body>
                        <Form onSubmit={event => salvar(event)} >
                        <Form.Group controlId="formBasicEmail">
                            		<Form.Label>Título</Form.Label>
                            <Form.Control type="text" value={titulo} onChange={event => setTitulo(event.target.value)} placeholder="Informe sua tarefa" required />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                        	    	<Form.Label>Descrição</Form.Label>
                            <Form.Control type="text" value={descricao} onChange={event => setDescricao(event.target.value)} placeholder="Informe a descrição da tarefa" required />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                        		<Form.Label>Categoria</Form.Label>
                            <Form.Control type="text" value={categoria} onChange={event => setCategoria(event.target.value)} placeholder="Informe a categoria" required />
                        </Form.Group>

                        <Form.Group controlId="formBasicEmail">
                        		    <Form.Label>Data de Entrega</Form.Label>
                            <Form.Control type="date" value={dataentrega} onChange={event => setDataentrega(event.target.value)} placeholder="Informe a Data de Entrega" required />
                        </Form.Group>

                        <Form.Group controlId="formBasicStatus">
                      <Form.Label>Status</Form.Label>
                                <InputGroup.Prepend>
                                    <InputGroup.Checkbox value={status} onChange={event=> setStatus(event.target.value)} aria-label="Checkbox for allowing text input"></InputGroup.Checkbox>
                                </InputGroup.Prepend>
                        </Form.Group>
                    
                        <Button type="submit">Salvar</Button>
                        </Form>
                    </Card.Body>
                </Card>

                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Título</th>
                            <th>Descrição</th> 
                            <th>Categoria</th> 
                            <th>Data Entrega</th> 
                            <th>Status</th>  
                            <th>Ações</th>
                            
                        </tr>
                    </thead>
                    <tbody>
                    {   
                    tarefas.map((item, index) => {
                            return(
                            <tr>
                                <td>{item.titulo}</td>
                                <td>{item.descricao}</td>
                                <td>{item.categoria}</td>
                                <td>{item.dataentrega}</td>
                                <td>{item.status ? 'Feito' : 'Para fazer' }</td>
                                <td>
                                    <Button variant="warning" value={item.id} onClick={event => editar(event)}>Editar</Button>
                                    <Button variant="danger"  value={item.id} onClick={event => excluir(event)}>Excluir</Button>
                                    <Button variant="primary" value={item.id} onClick={event => alterarStatus(event)}>Alterar Status</Button>
                                </td>
                            </tr>
                            )
                        })
                    }
                        
                    
                    </tbody>
                </Table>
            </Container>
        </div>
    )
}

export default Tarefa;